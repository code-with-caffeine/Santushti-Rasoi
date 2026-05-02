/**
 * lib/apiHelpers.js
 * Reusable utilities for Next.js API route handlers.
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_in_production';

// ── Response helpers ────────────────────────────────────────────────────────

export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, ...data });
}

export function error(res, message, statusCode = 400, details = null) {
  const body = { success: false, message };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
}

// ── JWT helpers ─────────────────────────────────────────────────────────────

export function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

// ── Auth middleware ──────────────────────────────────────────────────────────

/**
 * requireAdmin — wraps a handler and rejects requests without a valid JWT.
 * Usage: export default requireAdmin(async (req, res) => { ... })
 */
export function requireAdmin(handler) {
  return async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return error(res, 'Authentication required', 401);
      }
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      req.admin = decoded; // attach decoded payload to request
      return handler(req, res);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return error(res, 'Session expired, please log in again', 401);
      }
      return error(res, 'Invalid token', 401);
    }
  };
}

// ── Method guard ─────────────────────────────────────────────────────────────

/**
 * allowMethods — rejects requests with disallowed HTTP methods.
 * Usage: if (!allowMethods(req, res, ['GET', 'POST'])) return;
 */
export function allowMethods(req, res, methods) {
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    error(res, `Method ${req.method} not allowed`, 405);
    return false;
  }
  return true;
}

// ── Validation helpers ────────────────────────────────────────────────────────

export function validateRequired(body, fields) {
  const missing = fields.filter((f) => !body[f] && body[f] !== 0);
  return missing.length ? missing : null;
}

export function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function isValidPhone(phone) {
  // Accepts formats: +91XXXXXXXXXX, 9XXXXXXXXX, 0XXXXXXXXXX
  return /^(\+91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

// ── Slug generator ────────────────────────────────────────────────────────────

export function toSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Pagination ────────────────────────────────────────────────────────────────

export function getPagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function paginatedResponse(res, data, total, page, limit) {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
}