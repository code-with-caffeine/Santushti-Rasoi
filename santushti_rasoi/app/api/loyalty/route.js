/**
 * app/api/loyalty/route.js
 * POST /api/loyalty          — join loyalty club (by phone)
 * GET  /api/loyalty?phone=x  — look up membership status
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import LoyaltyMember from '../../../models/LoyaltyMember';

// ── GET: Look up member ───────────────────────────────────────────────────────
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone')?.replace(/\s/g, '');

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    const member = await LoyaltyMember.findOne({ phone }).lean();

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'No loyalty account found for this number', isMember: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      isMember: true,
      data: {
        name: member.name,
        tier: member.tier,
        points: member.points,
        totalSpend: member.totalSpend,
        discountPct: member.tier === 'platinum' ? 15 : member.tier === 'gold' ? 10 : 5,
        memberSince: member.createdAt,
      },
    });
  } catch (err) {
    console.error('[GET /api/loyalty]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── POST: Join club ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { phone, name, email, birthday } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\s/g, '');
    if (!/^(\+91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid Indian mobile number' },
        { status: 400 }
      );
    }

    const existing = await LoyaltyMember.findOne({ phone: cleanPhone });

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyMember: true,
        message: `Welcome back${existing.name ? ', ' + existing.name.split(' ')[0] : ''}! You are already a ${existing.tier} member.`,
        data: {
          tier: existing.tier,
          points: existing.points,
          totalSpend: existing.totalSpend,
        },
      });
    }

    const member = await LoyaltyMember.create({
      phone: cleanPhone,
      name: name?.trim() || '',
      email: email?.trim().toLowerCase() || '',
      birthday: birthday ? new Date(birthday) : undefined,
      tier: 'silver',
      points: 0,
      totalSpend: 0,
    });

    return NextResponse.json(
      {
        success: true,
        alreadyMember: false,
        message: `Welcome to the Sweet Privileges Club! 🎉 You are now a Silver Mithai member.`,
        data: {
          tier: member.tier,
          points: member.points,
          memberId: member._id,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({
        success: true,
        alreadyMember: true,
        message: 'You are already a loyalty club member!',
      });
    }
    console.error('[POST /api/loyalty]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}