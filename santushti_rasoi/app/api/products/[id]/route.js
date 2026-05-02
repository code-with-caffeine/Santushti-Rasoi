/**
 * app/api/products/[id]/route.js
 * GET    /api/products/:id   — get single product
 * PATCH  /api/products/:id   — update product (admin only)
 * DELETE /api/products/:id   — delete product (admin only)
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import { verifyToken, toSlug } from '../../../../lib/apiHelpers';

function authGuard(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  try {
    verifyToken(authHeader.split(' ')[1]);
    return true;
  } catch {
    return false;
  }
}

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Support lookup by id OR slug
    const filter = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const product = await Product.findOne(filter).lean();

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error('[GET /api/products/:id]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── PATCH ─────────────────────────────────────────────────────────────────────
export async function PATCH(request, { params }) {
  if (!authGuard(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // If name changed, regenerate slug
    if (body.name) body.slug = toSlug(body.name);

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (err) {
    console.error('[PATCH /api/products/:id]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(request, { params }) {
  if (!authGuard(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error('[DELETE /api/products/:id]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}