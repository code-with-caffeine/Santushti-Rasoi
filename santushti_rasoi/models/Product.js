/**
 * models/Product.js
 * Represents a sweet / product in the catalogue.
 */

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: true,
      enum: ['traditional', 'halwa', 'dry', 'sugar-free', 'gifting', 'seasonal'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be positive'],
    },
    unit: {
      type: String,
      required: true,
      default: '250g',
    },
    icon: {
      type: String,
      default: '🍬',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    bgClass: {
      type: String,
      default: 'prod-bg-2',
    },
    badge: {
      type: String,
      default: '',
    },
    badgeCls: {
      type: String,
      default: '',
    },
    ingredients: {
      type: String,
      default: '',
    },
    shelfLife: {
      type: String,
      default: '10 days',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isSeasonal: {
      type: Boolean,
      default: false,
    },
    season: {
      type: String,
      enum: ['diwali', 'holi', 'eid', 'winter', ''],
      default: '',
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: formatted rating string like "★★★★★ (248)"
ProductSchema.virtual('ratingDisplay').get(function () {
  const stars = Math.round(this.ratingAverage);
  const filled = '★'.repeat(stars);
  const empty = '☆'.repeat(5 - stars);
  return `${filled}${empty} (${this.ratingCount})`;
});

// Index for fast category + availability queries
ProductSchema.index({ category: 1, isAvailable: 1 });
ProductSchema.index({ slug: 1 });
ProductSchema.index({ isFeatured: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);