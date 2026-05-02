/**
 * scripts/seed.js
 * Populates the database with initial products and an admin user.
 *
 * Usage:
 *   node scripts/seed.js
 *   node scripts/seed.js --reset   ← clears existing products first
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@santushtirasoi.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe@2024';

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Create a .env.local file.');
  process.exit(1);
}

// ── Inline schema definitions (avoid import resolution issues in plain node) ──

const ProductSchema = new mongoose.Schema({
  name: String, slug: String, description: String, category: String,
  price: Number, unit: String, icon: String, imageUrl: String,
  bgClass: String, badge: String, badgeCls: String, ingredients: String,
  shelfLife: String, isFeatured: Boolean, isAvailable: Boolean,
  isSeasonal: Boolean, season: String, ratingAverage: Number,
  ratingCount: Number, sortOrder: Number,
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  email: String, password: String, name: String, role: String, isActive: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Admin   = mongoose.models.Admin   || mongoose.model('Admin', AdminSchema);

// ── Seed data ────────────────────────────────────────────────────────────────

const PRODUCTS = [
  // Traditional
  {
    name: 'Kesar Kaju Katli', slug: 'kesar-kaju-katli',
    description: 'Pure cashew paste with Kashmiri saffron, silver varq, and a whisper of cardamom. Our most beloved creation for over six decades.',
    category: 'traditional', price: 850, unit: '250g', icon: '🥮',
    bgClass: 'prod-bg-1', badge: 'Bestseller', badgeCls: '',
    ingredients: 'Cashew, Sugar, Saffron, Silver Varq, Cardamom',
    shelfLife: '15 days', isFeatured: true, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 248, sortOrder: 1,
  },
  {
    name: 'Motichoor Ladoo', slug: 'motichoor-ladoo',
    description: 'Tiny gram flour pearls in pure ghee, shaped into perfect spheres. A festive classic.',
    category: 'traditional', price: 480, unit: '500g', icon: '🟠',
    bgClass: 'prod-bg-2', badge: '', badgeCls: '',
    ingredients: 'Gram Flour, Ghee, Sugar, Cardamom, Saffron',
    shelfLife: '10 days', isFeatured: true, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 182, sortOrder: 2,
  },
  {
    name: 'Besan Ladoo', slug: 'besan-ladoo',
    description: 'Roasted gram flour bound with clarified butter and powdered sugar, rolled in silver leaf.',
    category: 'traditional', price: 380, unit: '500g', icon: '🟡',
    bgClass: 'prod-bg-5', badge: '', badgeCls: '',
    ingredients: 'Gram Flour, Ghee, Powdered Sugar, Silver Leaf, Cardamom',
    shelfLife: '12 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 204, sortOrder: 3,
  },
  {
    name: 'Coconut Barfi', slug: 'coconut-barfi',
    description: 'Fresh-grated coconut slow-cooked with khoya and cardamom. Simple, aromatic, timeless.',
    category: 'traditional', price: 320, unit: '500g', icon: '🤍',
    bgClass: 'prod-bg-2', badge: '', badgeCls: '',
    ingredients: 'Coconut, Khoya, Sugar, Cardamom, Ghee',
    shelfLife: '7 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.5, ratingCount: 98, sortOrder: 4,
  },
  // Halwa
  {
    name: 'Gajar Ka Halwa', slug: 'gajar-ka-halwa',
    description: 'Winter carrots slow-cooked in desi ghee with full-cream milk and crowned with dry fruits.',
    category: 'halwa', price: 350, unit: '500g', icon: '🟧',
    bgClass: 'prod-bg-4', badge: '', badgeCls: '',
    ingredients: 'Carrots, Ghee, Full Cream Milk, Sugar, Dry Fruits, Cardamom',
    shelfLife: '5 days', isFeatured: true, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 310, sortOrder: 5,
  },
  {
    name: 'Moong Dal Halwa', slug: 'moong-dal-halwa',
    description: 'Stone-ground moong dal roasted in ghee for hours until golden, sweetened with sugar and saffron.',
    category: 'halwa', price: 420, unit: '500g', icon: '🟨',
    bgClass: 'prod-bg-4', badge: '', badgeCls: '',
    ingredients: 'Moong Dal, Ghee, Sugar, Saffron, Cardamom, Almonds',
    shelfLife: '5 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.8, ratingCount: 145, sortOrder: 6,
  },
  // Dry
  {
    name: 'Pistachio Barfi', slug: 'pistachio-barfi',
    description: 'Iranian pistachios ground with condensed milk and rose water, topped with edible rose petals.',
    category: 'dry', price: 720, unit: '250g', icon: '🟩',
    bgClass: 'prod-bg-3', badge: 'New', badgeCls: 'ruby',
    ingredients: 'Iranian Pistachio, Condensed Milk, Rose Water, Edible Rose Petals',
    shelfLife: '15 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4, ratingCount: 67, sortOrder: 7,
  },
  {
    name: 'Anjeer Barfi', slug: 'anjeer-barfi',
    description: 'Premium Turkish figs slow-cooked with A2 ghee, almonds and cardamom. Dense, nutty, not overly sweet.',
    category: 'dry', price: 980, unit: '250g', icon: '🫐',
    bgClass: 'prod-bg-3', badge: '', badgeCls: '',
    ingredients: 'Turkish Figs, Almonds, Cardamom, Ghee',
    shelfLife: '20 days', isFeatured: true, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.5, ratingCount: 134, sortOrder: 8,
  },
  {
    name: 'Pista Roll', slug: 'pista-roll',
    description: 'Iranian pistachios rolled into elegant cylinders with khoya, saffron and rose water.',
    category: 'dry', price: 1200, unit: '250g', icon: '🟢',
    bgClass: 'prod-bg-3', badge: '', badgeCls: '',
    ingredients: 'Pistachio, Khoya, Rose Water, Saffron, Gold Leaf',
    shelfLife: '12 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.8, ratingCount: 89, sortOrder: 9,
  },
  {
    name: 'Badam Pak', slug: 'badam-pak',
    description: 'Stone-ground almonds cooked in pure ghee with saffron milk. Dense, aromatic, deeply satisfying.',
    category: 'dry', price: 760, unit: '250g', icon: '🌰',
    bgClass: 'prod-bg-4', badge: '', badgeCls: '',
    ingredients: 'Almonds, Ghee, Saffron Milk, Cardamom',
    shelfLife: '25 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.7, ratingCount: 112, sortOrder: 10,
  },
  {
    name: 'Khajur Mithai', slug: 'khajur-mithai',
    description: 'Medjool dates stuffed with walnuts and coated in dark jaggery. No added sugar.',
    category: 'dry', price: 650, unit: '250g', icon: '🌴',
    bgClass: 'prod-bg-6', badge: '', badgeCls: '',
    ingredients: 'Medjool Dates, Walnuts, Jaggery',
    shelfLife: '30 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.3, ratingCount: 78, sortOrder: 11,
  },
  {
    name: 'Kaaju Peda', slug: 'kaaju-peda',
    description: 'Classic peda reimagined with pure cashew base. Hand-shaped, cardamom-spiced, saffron-finished.',
    category: 'dry', price: 720, unit: '250g', icon: '🟡',
    bgClass: 'prod-bg-1', badge: '', badgeCls: '',
    ingredients: 'Cashew, Milk Solids, Cardamom, Saffron',
    shelfLife: '10 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.6, ratingCount: 93, sortOrder: 12,
  },
  // Sugar Free
  {
    name: 'Sugar Free Khajur Roll', slug: 'sugar-free-khajur-roll',
    description: 'Medjool dates and figs stuffed with almonds and walnuts. Naturally sweetened, no added sugar.',
    category: 'sugar-free', price: 520, unit: '250g', icon: '🌴',
    bgClass: 'prod-bg-6', badge: 'Sugar Free', badgeCls: '',
    ingredients: 'Medjool Dates, Figs, Almonds, Walnuts',
    shelfLife: '20 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4, ratingCount: 89, sortOrder: 13,
  },
  {
    name: 'Stevia Kaju Katli', slug: 'stevia-kaju-katli',
    description: 'All the richness of our signature Kaju Katli, sweetened with pure stevia instead of sugar.',
    category: 'sugar-free', price: 920, unit: '250g', icon: '🥮',
    bgClass: 'prod-bg-1', badge: 'Sugar Free', badgeCls: '',
    ingredients: 'Cashew, Stevia, Saffron, Silver Varq',
    shelfLife: '12 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.3, ratingCount: 54, sortOrder: 14,
  },
  // Seasonal
  {
    name: 'Diwali Diyas Box', slug: 'diwali-diyas-box',
    description: '8 premium mithais crafted exclusively for Diwali — saffron kaju barfi, rose petal ladoo, chocolate-coated dry fruits in a hand-painted box.',
    category: 'seasonal', price: 1850, unit: '1 box', icon: '🪔',
    bgClass: 'prod-bg-1', badge: 'Diwali 2024', badgeCls: '',
    ingredients: 'Assorted premium ingredients',
    shelfLife: '10 days', isFeatured: true, isAvailable: true,
    isSeasonal: true, season: 'diwali', ratingAverage: 5, ratingCount: 201, sortOrder: 15,
  },
  {
    name: 'Gulal Mithai Collection', slug: 'gulal-mithai-collection',
    description: 'Rose barfi, thandai ladoo, and gulkand pinni in a vibrant hand-block-printed box for Holi.',
    category: 'seasonal', price: 1450, unit: '1 box', icon: '🌈',
    bgClass: 'prod-bg-2', badge: 'Holi Special', badgeCls: '',
    ingredients: 'Assorted premium ingredients',
    shelfLife: '10 days', isFeatured: false, isAvailable: true,
    isSeasonal: true, season: 'holi', ratingAverage: 4.7, ratingCount: 88, sortOrder: 16,
  },
  {
    name: 'Winter Warmers Box', slug: 'winter-warmers-box',
    description: "Gajar halwa, til ladoo, gajak, and peanut chikki — North India's most beloved winter sweets.",
    category: 'seasonal', price: 1100, unit: '1 box', icon: '❄️',
    bgClass: 'prod-bg-4', badge: 'Winter 2024', badgeCls: '',
    ingredients: 'Assorted premium ingredients',
    shelfLife: '15 days', isFeatured: false, isAvailable: true,
    isSeasonal: true, season: 'winter', ratingAverage: 4.6, ratingCount: 67, sortOrder: 17,
  },
  // Gifting
  {
    name: 'Classic Gift Box', slug: 'classic-gift-box',
    description: '8 hand-picked varieties in an elegant gift box. Perfect for any occasion.',
    category: 'gifting', price: 1200, unit: '500g', icon: '🎁',
    bgClass: 'prod-bg-1', badge: '', badgeCls: '',
    ingredients: 'Assorted', shelfLife: '10 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 4.8, ratingCount: 156, sortOrder: 18,
  },
  {
    name: 'Royal Hamper', slug: 'royal-hamper',
    description: '16 varieties in 1.5kg — our grandest gift statement. Hand-packed in a lacquered wood box.',
    category: 'gifting', price: 3500, unit: '1.5kg', icon: '👑',
    bgClass: 'prod-bg-1', badge: 'Most Popular', badgeCls: '',
    ingredients: 'Assorted premium', shelfLife: '10 days', isFeatured: true, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 284, sortOrder: 19,
  },
  {
    name: 'Heritage Trunk', slug: 'heritage-trunk',
    description: 'Custom 3kg+ selection in a hand-painted heritage trunk. The ultimate luxury gift.',
    category: 'gifting', price: 7000, unit: '3kg+', icon: '🏺',
    bgClass: 'prod-bg-1', badge: '', badgeCls: '',
    ingredients: 'Fully customised', shelfLife: '10 days', isFeatured: false, isAvailable: true,
    isSeasonal: false, season: '', ratingAverage: 5, ratingCount: 42, sortOrder: 20,
  },
];

// ── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  const isReset = process.argv.includes('--reset');
  console.log('🌱  Connecting to MongoDB…');

  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.\n');

  // ── Products ──
  if (isReset) {
    await Product.deleteMany({});
    console.log('🗑   Cleared existing products.');
  }

  const existingCount = await Product.countDocuments();
  if (existingCount > 0 && !isReset) {
    console.log(`⚠️   ${existingCount} products already exist. Use --reset to clear first.\n`);
  } else {
    await Product.insertMany(PRODUCTS);
    console.log(`🍬  Inserted ${PRODUCTS.length} products.\n`);
  }

  // ── Admin user ──
  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`👤  Admin already exists: ${ADMIN_EMAIL}`);
  } else {
    const hashedPw = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await Admin.create({
      email: ADMIN_EMAIL,
      password: hashedPw,
      name: 'Super Admin',
      role: 'super-admin',
      isActive: true,
    });
    console.log(`👤  Admin created: ${ADMIN_EMAIL}`);
    console.log(`🔑  Temporary password: ${ADMIN_PASSWORD}`);
    console.log('⚠️   Change this password immediately after first login!\n');
  }

  console.log('🎉  Seed complete!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});