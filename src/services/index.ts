import type { Product, Category } from '../types';
import { fetchProductsFromAPI, fetchCategoriesFromAPI, fetchProductByIdFromAPI } from './api';

export const accessorySubCategories = [
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

export const mockCategories: Category[] = [
  {
    id: 'dresses-fashion',
    name: 'Dresses & Fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    description: 'Dresses, tops, outfits, and fashion accessories',
    itemCount: 42
  },
  {
    id: 'jewellery-accessories',
    name: 'Jewellery & Accessories',
    slug: 'jewellery-accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    description: 'Earrings, necklaces, bracelets, rings, watches, bags, and hair accessories',
    itemCount: 85,
    subCategories: accessorySubCategories,
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    description: 'Decorative items, candles, vases, and room accessories',
    itemCount: 28
  },
  {
    id: 'art-crafts',
    name: 'Art & Crafts',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    description: 'Handmade products, craft supplies, and creative gifts',
    itemCount: 19
  },
  {
    id: 'korean-goodies',
    name: 'Korean Goodies',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Stationery, plush toys, keychains, and cute accessories',
    itemCount: 31
  }
];

export const mockProducts: Product[] = [
  {
    id: 'kg-1',
    name: 'Kawaii Soft Boba Plush & Keychain Set',
    description: 'Adorable ultra-soft velvet Korean boba plush toy with matching enamel keychain.',
    price: 28.50,
    originalPrice: 35.00,
    category: 'korean-goodies',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 165,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-02'
  },
  {
    id: 'acc-1',
    name: 'Retro Oval Tortoise Sunglasses',
    description: 'Vintage-inspired UV400 oval sunglasses with lightweight tortoise acetate frame.',
    price: 38.00,
    originalPrice: 45.00,
    category: 'jewellery-accessories',
    subCategory: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 76,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'acc-2',
    name: 'Rose Gold Rectangle Mesh Watch',
    description: 'Minimalist rectangular rose gold watch with adjustable stainless steel mesh strap.',
    price: 145.00,
    originalPrice: 175.00,
    category: 'jewellery-accessories',
    subCategory: 'Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 112,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'acc-5',
    name: '18k Gold Plated Chunky Hoop Earrings',
    description: 'Polished hollow gold hoop earrings offering lightweight comfort and timeless shimmer.',
    price: 48.00,
    originalPrice: 60.00,
    category: 'jewellery-accessories',
    subCategory: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 185,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-20'
  },
  {
    id: 'dr-1',
    name: 'Silk Wrap Floral Midi Dress',
    description: 'Elegant silk wrap midi dress featuring delicate floral motifs and a flattering waist tie.',
    price: 135.00,
    originalPrice: 160.00,
    category: 'dresses-fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 88,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'hd-1',
    name: 'Artisan Ceramic Sculptural Vase',
    description: 'Minimalist matte ceramic vase with warm cream tones perfect for dried florals.',
    price: 54.00,
    category: 'home-decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 52,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'ac-1',
    name: 'Handmade Botanical Painting Journal',
    description: 'Linen-bound handmade paper journal ideal for watercolor sketches and creative thoughts.',
    price: 34.00,
    category: 'art-crafts',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 39,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-03'
  }
];

export const getProducts = async (): Promise<Product[]> => {
  return fetchProductsFromAPI();
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return fetchProductByIdFromAPI(id);
};

export const getCategories = async (): Promise<Category[]> => {
  return fetchCategoriesFromAPI();
};
