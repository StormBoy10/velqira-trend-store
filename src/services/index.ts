import type { Product, Category } from '../types';

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
  // 1. Sunglasses
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
  // 2. Watches
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
  // 3. Hair Clips
  {
    id: 'acc-3',
    name: 'Matte Pastel Claw Hair Clip Set',
    description: 'Set of 4 durable non-slip acrylic claw clips in warm blush and cream shades.',
    price: 18.00,
    category: 'jewellery-accessories',
    subCategory: 'Hair Clips',
    image: 'https://images.unsplash.com/photo-1608248597263-000799965d83?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: false,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-05'
  },
  // 4. Necklaces
  {
    id: 'acc-4',
    name: 'Freshwater Pearl Pendant Gold Necklace',
    description: '18k gold-plated dainty chain with a natural baroque freshwater pearl pendant.',
    price: 72.00,
    originalPrice: 90.00,
    category: 'jewellery-accessories',
    subCategory: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 140,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-15'
  },
  // 5. Earrings
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
  // 6. Hair Accessories
  {
    id: 'acc-6',
    name: 'Silk Bow Scrunchie & Headband Trio',
    description: 'Luxurious Mulberry silk bow headband and matching scrunchies for hair protection.',
    price: 26.00,
    category: 'jewellery-accessories',
    subCategory: 'Hair Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 52,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-02'
  },
  // 7. Bracelets
  {
    id: 'acc-7',
    name: 'Four-Leaf Clover Gold Chain Bracelet',
    description: 'Delicate gold bracelet featuring mother of pearl clover charms and adjustable clasp.',
    price: 58.00,
    category: 'jewellery-accessories',
    subCategory: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591475285-a36ad5e1a596?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 88,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-01-28'
  },
  // 8. Rings
  {
    id: 'acc-8',
    name: 'Minimalist Stacking Gold Band Rings Set',
    description: 'Set of 5 18k gold-filled thin band rings designed for effortless stacking.',
    price: 42.00,
    category: 'jewellery-accessories',
    subCategory: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 64,
    isFeatured: false,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-01-22'
  },
  // 9. Belts
  {
    id: 'acc-9',
    name: 'Classic Leather Gold Buckle Belt',
    description: 'Smooth full-grain genuine leather waist belt with polished gold hardware buckle.',
    price: 45.00,
    category: 'jewellery-accessories',
    subCategory: 'Belts',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 38,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-12'
  },
  // 10. Brooches & Pins
  {
    id: 'acc-10',
    name: 'Pearl & Crystal Leaf Brooch Pin',
    description: 'Elegant crystal leaf brooch with pearl drop accent for coats, lapels, and scarves.',
    price: 32.00,
    category: 'jewellery-accessories',
    subCategory: 'Brooches & Pins',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 29,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-04'
  },
  // 11. Bags
  {
    id: 'acc-11',
    name: 'Structured Mini Leather Shoulder Bag',
    description: 'Sophisticated cream leather crossbody shoulder bag with golden magnetic lock.',
    price: 185.00,
    originalPrice: 220.00,
    category: 'jewellery-accessories',
    subCategory: 'Bags',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 104,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-01-18'
  },
  // 12. Scarves
  {
    id: 'acc-12',
    name: 'Silk Floral Neck Scarf',
    description: 'Hand-printed Mulberry silk square neck scarf featuring soft botanical prints.',
    price: 35.00,
    category: 'jewellery-accessories',
    subCategory: 'Scarves',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 41,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-01'
  },
  // 13. Anklets
  {
    id: 'acc-13',
    name: 'Dainty Gold Bell Charm Anklet',
    description: 'Water-resistant 18k gold-filled layered anklet with tiny bell charms.',
    price: 28.00,
    category: 'jewellery-accessories',
    subCategory: 'Anklets',
    image: 'https://images.unsplash.com/photo-1611591475285-a36ad5e1a596?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 33,
    isFeatured: false,
    isTrending: false,
    isNew: true,
    inStock: true,
    createdAt: '2025-01-30'
  },
  // 14. Watch Strap
  {
    id: 'acc-14',
    name: 'Genuine Leather Quick Release Watch Strap',
    description: 'Hand-stitched tan Italian leather replacement watch strap with stainless steel buckle.',
    price: 29.00,
    category: 'jewellery-accessories',
    subCategory: 'Watch Strap',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 22,
    isFeatured: false,
    isTrending: false,
    isNew: false,
    inStock: true,
    createdAt: '2025-01-05'
  },
  // 15. Phone Accessories
  {
    id: 'acc-15',
    name: 'Freshwater Pearl Phone Wrist Charm & Case',
    description: 'Handmade beaded freshwater pearl phone strap with puffer iPhone protective case.',
    price: 24.50,
    category: 'jewellery-accessories',
    subCategory: 'Phone Accessories',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 156,
    isFeatured: true,
    isTrending: true,
    isNew: true,
    inStock: true,
    createdAt: '2025-02-03'
  },

  // Other Categories Products
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
  },
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
  }
];

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(mockProducts);
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return Promise.resolve(mockProducts.find((p) => p.id === id));
};

export const getCategories = async (): Promise<Category[]> => {
  return Promise.resolve(mockCategories);
};
