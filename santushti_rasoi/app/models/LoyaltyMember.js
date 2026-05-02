/**
 * models/LoyaltyMember.js
 * Represents a loyalty club member.
 */

import mongoose from 'mongoose';

const LoyaltyMemberSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
      match: [/^$|^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    birthday: {
      type: Date,
    },

    tier: {
      type: String,
      enum: ['silver', 'gold', 'platinum'],
      default: 'silver',
    },

    points: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSpend: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Track birthday gift sent for this year
    birthdayGiftSentYear: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: compute tier from totalSpend
LoyaltyMemberSchema.virtual('computedTier').get(function () {
  if (this.totalSpend >= 15000) return 'platinum';
  if (this.totalSpend >= 5000) return 'gold';
  return 'silver';
});

// Virtual: discount percentage
LoyaltyMemberSchema.virtual('discountPct').get(function () {
  const map = { silver: 5, gold: 10, platinum: 15 };
  return map[this.tier] || 5;
});

// Before save: auto-update tier based on totalSpend
LoyaltyMemberSchema.pre('save', function (next) {
  if (this.totalSpend >= 15000) this.tier = 'platinum';
  else if (this.totalSpend >= 5000) this.tier = 'gold';
  else this.tier = 'silver';
  next();
});

LoyaltyMemberSchema.index({ phone: 1 });
LoyaltyMemberSchema.index({ tier: 1 });

export default mongoose.models.LoyaltyMember ||
  mongoose.model('LoyaltyMember', LoyaltyMemberSchema);