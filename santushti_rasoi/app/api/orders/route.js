/**
 * app/api/orders/route.js
 * GET  /api/orders   — list orders (admin only)
 * POST /api/orders   — submit a new order (public)
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongodb';
import Order from '../../models/Order';
import LoyaltyMember from '../../models/LoyaltyMember';
import { verifyToken } from '../../lib/apiHelpers';
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET(request) {
  // Admin only
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try { verifyToken(authHeader.split(' ')[1]); } catch {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page   = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const limit  = Math.min(100, parseInt(searchParams.get('limit')) || 20);
    const skip   = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[GET /api/orders]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── POST ─────────────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { customer, items, orderDetails, occasion, delivery, source } = body;

    // Validate required customer fields
    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { success: false, message: 'Customer name and phone are required' },
        { status: 400 }
      );
    }

    // Validate phone format (basic)
    const cleanPhone = customer.phone.replace(/\s/g, '');
    if (!/^(\+91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid Indian mobile number' },
        { status: 400 }
      );
    }

    // Must have either items or orderDetails
    if ((!items || items.length === 0) && !orderDetails?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please provide order items or order details' },
        { status: 400 }
      );
    }

    // Check if phone belongs to a loyalty member
    let loyaltyMemberId = null;
    const member = await LoyaltyMember.findOne({ phone: cleanPhone });
    if (member) {
      loyaltyMemberId = member._id;
    }

    const order = await Order.create({
      customer: {
        name: customer.name.trim(),
        phone: cleanPhone,
        email: customer.email?.trim() || '',
      },
      items: items || [],
      orderDetails: orderDetails || '',
      occasion: occasion || '',
      delivery: {
        city: delivery?.city || '',
        date: delivery?.date ? new Date(delivery.date) : undefined,
        address: delivery?.address || '',
        pincode: delivery?.pincode || '',
      },
      source: source || 'website-form',
      loyaltyMemberId,
    });

    // Update loyalty member spend if applicable
    if (member && order.total > 0) {
      member.totalSpend += order.total;
      member.points += Math.floor(order.total / 10);
      await member.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully! Our team will contact you within 2 hours.',
        data: {
          orderNumber: order.orderNumber,
          orderId: order._id,
          status: order.status,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/orders]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}