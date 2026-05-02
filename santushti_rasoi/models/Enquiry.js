/**
 * models/Enquiry.js
 * General contact / wedding / corporate enquiry.
 */

import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    message: { type: String, required: true, maxlength: 3000 },
    type: {
      type: String,
      enum: ['general', 'wedding', 'corporate', 'bulk', 'custom-packaging'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'spam'],
      default: 'new',
    },
    adminReply: { type: String, default: '' },
  },
  { timestamps: true }
);

EnquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Enquiry ||
  mongoose.model('Enquiry', EnquirySchema);