/**
 * app/api/admin/stats/route.js
 * GET /api/admin/stats  — dashboard summary (admin only)
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Order from '../../../../models/Order';
import Product from '../../../../models/Product';
import LoyaltyMember from '../../../../models/LoyaltyMember';
import Subscriber from '../../../../models/Subscriber';
import { verifyToken } from '../../../../lib/apiHelpers';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try { verifyToken(authHeader.split(' ')[1]); } catch {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }

  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalOrders,
      pendingOrders,
      thisMonthOrders,
      lastMonthOrders,
      totalProducts,
      totalMembers,
      totalSubscribers,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['pending', 'confirmed'] } }),
      Order.find({ createdAt: { $gte: startOfMonth } }).lean(),
      Order.find({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }).lean(),
      Product.countDocuments({ isAvailable: true }),
      LoyaltyMember.countDocuments({ isActive: true }),
      Subscriber.countDocuments({ isActive: true }),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce((s, o) => s + (o.total || 0), 0);
    const lastMonthRevenue = lastMonthOrders.reduce((s, o) => s + (o.total || 0), 0);
    const revenueGrowth = lastMonthRevenue > 0
      ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
      : null;

    const statusMap = {};
    for (const s of ordersByStatus) statusMap[s._id] = s.count;

    return NextResponse.json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          thisMonth: thisMonthOrders.length,
          byStatus: statusMap,
        },
        revenue: {
          thisMonth: thisMonthRevenue,
          lastMonth: lastMonthRevenue,
          growthPct: revenueGrowth,
        },
        products: { total: totalProducts },
        loyalty: { totalMembers },
        newsletter: { totalSubscribers },
        recentOrders,
      },
    });
  } catch (err) {
    console.error('[GET /api/admin/stats]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}