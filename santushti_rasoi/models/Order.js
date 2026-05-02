/**
 * models/Order.js
 * Represents a customer order request submitted via the website form.
 */

import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    icon: { type: String, default: '🍬' },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    // Auto-generated human-readable order number, e.g. SR-20240101-0042
    orderNumber: {
      type: String,
      unique: true,
    },

    // Customer details
    customer: {
      name: { type: String, required: [true, 'Customer name is required'], trim: true },
      phone: { type: String, required: [true, 'Phone is required'], trim: true },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
    },

    // What they ordered (cart items if placed via cart, or free-text if via form)
    items: {
      type: [OrderItemSchema],
      default: [],
    },

    // Free-text order description from the form textarea
    orderDetails: {
      type: String,
      default: '',
      maxlength: [2000, 'Order details cannot exceed 2000 characters'],
    },

    occasion: {
      type: String,
      enum: [
        'Wedding & Shaadi',
        'Diwali Gifting',
        'Corporate Order',
        'Birthday Celebration',
        'Puja & Religious',
        'Personal / Regular Order',
        'Bulk / Wholesale',
        'Other',
        '',
      ],
      default: '',
    },

    delivery: {
      city: { type: String, trim: true, default: '' },
      date: { type: Date },
      address: { type: String, default: '' },
      pincode: { type: String, default: '' },
    },

    // Calculated totals
    subtotal: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'dispatched', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // Internal notes by admin
    adminNotes: {
      type: String,
      default: '',
    },

    // Whether a confirmation has been sent
    confirmationSent: {
      type: Boolean,
      default: false,
    },

    // Source — where did this order come from
    source: {
      type: String,
      enum: ['website-form', 'cart', 'whatsapp', 'phone', 'walk-in'],
      default: 'website-form',
    },

    // Loyalty member reference (optional)
    loyaltyMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LoyaltyMember',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate order number before saving
OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `SR-${dateStr}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Calculate total from items
OrderSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    this.total = this.subtotal + this.deliveryCharge - this.discount;
  }
  next();
});

OrderSchema.index({ 'customer.phone': 1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);