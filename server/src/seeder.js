import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Category } from './models/Category.js';
import { Product } from './models/Product.js';

dotenv.config();

const accessorySubCategories = [
  'Sunglasses',
  'Watches',
  'Hair Clips',
  'Necklaces',
  'Earrings',
  'Hair Accessories',
  'Bracelets',
  'Rings',
  'Belts',
  'Brooches & Pins',
  'Bags',
  'Scarves',
  'Anklets',
  'Watch Strap',
  'Phone Accessories',
];

const initialCategories = [
  {
    name: 'Dresses & Fashion',
    slug: 'dresses-fashion',
    description: 'Dresses, tops, outfits, and fashion accessories',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    showOnHome: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'Jewellery & Accessories',
    slug: 'jewellery-accessories',
    description: 'Earrings, necklaces, bracelets, rings, watches, bags, and hair accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    showOnHome: true,
    isActive: true,
    sortOrder: 2,
    subCategories: accessorySubCategories,
  },
  {
    name: 'Home Decor',
    slug: 'home-decor',
    description: 'Decorative items, candles, vases, and room accessories',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    showOnHome: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: 'Art & Crafts',
    slug: 'art-crafts',
    description: 'Handmade products, craft supplies, and creative gifts',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    showOnHome: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: 'Korean Goodies',
    slug: 'korean-goodies',
    description: 'Stationery, plush toys, keychains, and cute accessories',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    showOnHome: true,
    isActive: true,
    sortOrder: 5,
  },
];

const initialProducts = [
  {
    name: 'Retro Oval Tortoise Sunglasses',
    description: 'Vintage-inspired UV400 oval sunglasses with lightweight tortoise acetate frame.',
    price: 38.0,
    originalPrice: 45.0,
    category: 'jewellery-accessories',
    subCategory: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 76,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    stock: 25,
  },
  {
    name: 'Rose Gold Rectangle Mesh Watch',
    description: 'Minimalist rectangular rose gold watch with adjustable stainless steel mesh strap.',
    price: 145.0,
    originalPrice: 175.0,
    category: 'jewellery-accessories',
    subCategory: 'Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 112,
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    stock: 18,
  },
  {
    name: 'Silk Wrap Floral Midi Dress',
    description: 'Elegant silk wrap midi dress featuring delicate floral motifs and a flattering waist tie.',
    price: 135.0,
    originalPrice: 160.0,
    category: 'dresses-fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 88,
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    stock: 15,
  },
  {
    name: 'Artisan Ceramic Sculptural Vase',
    description: 'Minimalist matte ceramic vase with warm cream tones perfect for dried florals.',
    price: 54.0,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    stock: 8,
  },
  {
    name: 'Kawaii Soft Boba Plush & Keychain Set',
    description: 'Adorable ultra-soft velvet Korean boba plush toy with matching enamel keychain.',
    price: 28.5,
    originalPrice: 35.0,
    category: 'korean-goodies',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 165,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    stock: 30,
  },
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri || mongoUri.includes('<db_password>')) {
      console.error('[Error] Please replace <db_password> with your password in server/.env before seeding MongoDB Atlas!');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`[MongoDB Atlas] Connected to Cluster: ${conn.connection.host}`);
    console.log(`[MongoDB Atlas] Database Target: ${conn.connection.name}`);

    await Category.deleteMany();
    await Product.deleteMany();

    const insertedCategories = await Category.insertMany(initialCategories);
    const insertedProducts = await Product.insertMany(initialProducts);

    console.log(`[MongoDB Atlas Success] Created collection 'categories' (${insertedCategories.length} categories)`);
    console.log(`[MongoDB Atlas Success] Created collection 'products' (${insertedProducts.length} products)`);
    console.log(`[MongoDB Atlas] Database 'velqira-store' is now live!`);
    process.exit(0);
  } catch (error) {
    console.error('[Seeding Error]:', error.message);
    process.exit(1);
  }
};

seedData();
