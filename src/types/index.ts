export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subCategory?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  inStock?: boolean;
  stockCount?: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  image: string;
  description?: string;
  itemCount?: number;
  isActive?: boolean;
  showOnHome?: boolean;
  sortOrder?: number;
  subCategories?: string[];
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
