/**
 * app/api/newsletter/route.js
 * POST   /api/newsletter          — subscribe
 * DELETE /api/newsletter?email=x  — unsubscribe
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Subscriber from '../../../models/Subscriber';

// ── POST: Subscribe ───────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, name } = body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed!', alreadySubscribed: true }
        );
      }
      // Reactivate
      existing.isActive = true;
      if (name) existing.name = name.trim();
      await existing.save();
      return NextResponse.json({
        success: true,
        message: `Welcome back${name ? ', ' + name.split(' ')[0] : ''}! You have been re-subscribed.`,
      });
    }

    await Subscriber.create({
      email: email.toLowerCase().trim(),
      name: name?.trim() || '',
      source: 'website',
    });

    return NextResponse.json(
      {
        success: true,
        message: `${name ? 'Welcome, ' + name.split(' ')[0] + '!' : 'Thank you!'} Check your inbox for 10% off your first order. 🎉`,
        discount: 'SWEET10',
      },
      { status: 201 }
    );
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed!', alreadySubscribed: true }
      );
    }
    console.error('[POST /api/newsletter]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// ── DELETE: Unsubscribe ───────────────────────────────────────────────────────
export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: 'Email not found in our list' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'You have been unsubscribed.' });
  } catch (err) {
    console.error('[DELETE /api/newsletter]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}