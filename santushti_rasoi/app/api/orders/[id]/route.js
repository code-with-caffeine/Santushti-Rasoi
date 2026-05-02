/**
 * app/api/orders/[id]/route.js
 * GET   /api/orders/:id   — get single order (admin or customer via orderNumber)
 * PATCH /api/orders/:id   — update order status (admin only)
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Order from '../../../../models/Order';
import { verifyToken } from '../../../../lib/apiHelpers';

function authGuard(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;
  try { verifyToken(authHeader.split(' ')[1]); return true; } catch { return false; }
}

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    // Support lookup by MongoDB id or orderNumber (e.g. SR-20240101-0042)
    const filter = id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: id }
      : { orderNumber: id.toUpperCase() };

    const order = await Order.findOne(filter)
      .populate('loyaltyMemberId', 'name tier points')
      .lean();

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (err) {
    console.error('[GET /api/orders/:id]', err);
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

    const allowedUpdates = ['status', 'adminNotes', 'confirmationSent',
      'delivery.address', 'delivery.city', 'delivery.pincode', 'discount'];

    // Only permit whitelisted fields
    const update = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: order });
  } catch (err) {
    console.error('[PATCH /api/orders/:id]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}