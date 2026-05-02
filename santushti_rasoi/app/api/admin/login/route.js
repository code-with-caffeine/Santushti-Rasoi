/**
 * app/api/admin/login/route.js
 * POST /api/admin/login  — authenticate admin, return JWT
 */

import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Admin from '../../../../models/Admin';
import { signToken } from '../../../../lib/apiHelpers';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Explicitly select password (it has select: false on schema)
    const admin = await Admin.findOne({ email: email.toLowerCase(), isActive: true })
      .select('+password');

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('[POST /api/admin/login]', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}