/**
 * models/Subscriber.js
 * Newsletter subscriber.
 */

import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Discount code sent on signup
    welcomeCodeSent: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      enum: ['website', 'manual', 'import'],
      default: 'website',
    },
  },
  { timestamps: true }
);

SubscriberSchema.index({ email: 1 });
SubscriberSchema.index({ isActive: 1 });

export default mongoose.models.Subscriber ||
  mongoose.model('Subscriber', SubscriberSchema);