/**
 * app/api/products/route.js
 * GET  /api/products          — list products (with category filter, pagination)
 * POST /api/products          — create a product (admin only)
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { verifyToken, toSlug } from '../../../lib/apiHelpers';

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category  = searchParams.get('category');
    const season    = searchParams.get('season');
    const featured  = searchParams.get('featured');
    const available = searchParams.get('available');
    const page      = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit     = Math.min(100, parseInt(searchParams.get('limit')) || 50);
    const skip      = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (season)    filter.season    = season;
    if (featured === 'true')  filter.isFeatured  = true;
    if (available !== 'false') filter.isAvailable = true; // default: only available

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── POST ─────────────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    // Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    verifyToken(authHeader.split(' ')[1]);

    await connectDB();

    const body = await request.json();
    const { name, description, category, price, unit, icon, imageUrl,
            bgClass, badge, badgeCls, ingredients, shelfLife,
            isFeatured, isAvailable, isSeasonal, season, sortOrder } = body;

    // Validation
    if (!name || !description || !category || !price) {
      return NextResponse.json(
        { success: false, message: 'name, description, category and price are required' },
        { status: 400 }
      );
    }

    const slug = toSlug(name);

    const product = await Product.create({
      name, slug, description, category, price,
      unit: unit || '250g',
      icon: icon || '🍬',
      imageUrl: imageUrl || '',
      bgClass: bgClass || 'prod-bg-2',
      badge: badge || '',
      badgeCls: badgeCls || '',
      ingredients: ingredients || '',
      shelfLife: shelfLife || '10 days',
      isFeatured: isFeatured || false,
      isAvailable: isAvailable !== false,
      isSeasonal: isSeasonal || false,
      season: season || '',
      sortOrder: sortOrder || 0,
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'A product with this name already exists' },
        { status: 409 }
      );
    }
    console.error('[POST /api/products]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}