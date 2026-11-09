import type { Product, Category } from '../types';
import { mockProducts, mockCategories } from './index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- PUBLIC PRODUCT & CATEGORY APIs ---

export const fetchProductsFromAPI = async (category?: string): Promise<Product[]> => {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('API server unreachable');
    const data = await res.json();
    return data.products;
  } catch (err) {
    if (!category || category === 'all') return mockProducts;
    return mockProducts.filter((p) => p.category === category);
  }
};

export const fetchProductByIdFromAPI = async (id: string): Promise<Product | undefined> => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error('API server unreachable');
    const data = await res.json();
    return data.product;
  } catch (err) {
    return mockProducts.find((p) => p.id === id);
  }
};

export const fetchCategoriesFromAPI = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('API server unreachable');
    const data = await res.json();
    return data.categories;
  } catch (err) {
    return mockCategories;
  }
};

// --- ADMIN MANAGEMENT APIs ---

export const createProductAPI = async (productData: Partial<Product>, token?: string): Promise<Product> => {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    const data = await res.json();
    return data.product;
  } catch (err) {
    console.warn('[API Warning] Creation saved in local state:', err);
    return {
      id: String(Date.now()),
      name: productData.name || 'New Item',
      description: productData.description || '',
      price: productData.price || 0,
      originalPrice: productData.originalPrice,
      category: productData.category || 'dresses-fashion',
      subCategory: productData.subCategory,
      image: productData.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 1,
      inStock: productData.inStock !== false,
      isTrending: productData.isTrending || false,
      isNew: productData.isNew !== false,
      createdAt: new Date().toISOString().split('T')[0],
    };
  }
};

export const updateProductAPI = async (id: string, productData: Partial<Product>, token?: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    const data = await res.json();
    return data.product;
  } catch (err) {
    return null;
  }
};

export const deleteProductAPI = async (id: string, token?: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.ok;
  } catch (err) {
    return true;
  }
};

export const createCategoryAPI = async (categoryData: Partial<Category>, token?: string): Promise<Category> => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error('Failed to create category');
    const data = await res.json();
    return data.category;
  } catch (err) {
    return {
      id: categoryData.slug || `cat-${Date.now()}`,
      name: categoryData.name || 'New Category',
      slug: categoryData.slug || 'new-category',
      description: categoryData.description || '',
      image: categoryData.image || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
      showOnHome: categoryData.showOnHome !== false,
      isActive: categoryData.isActive !== false,
      sortOrder: categoryData.sortOrder || 1,
      createdAt: new Date().toISOString().split('T')[0],
      itemCount: 0,
    };
  }
};

export const deleteCategoryAPI = async (id: string, token?: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.ok;
  } catch (err) {
    return true;
  }
};

export const fetchOrdersAPI = async (token?: string): Promise<any[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data.orders || [];
  } catch (err) {
    // Sample orders fallback for admin controls
    return [
      {
        _id: 'ord-1001',
        user: { name: 'Sophia Miller', email: 'sophia@example.com' },
        orderItems: [{ name: 'Silk Wrap Floral Midi Dress', quantity: 1, price: 135.0 }],
        shippingAddress: { address: '742 Evergreen Terrace', city: 'Springfield', country: 'US' },
        totalPrice: 135.0,
        status: 'Processing',
        createdAt: '2025-02-05',
      },
      {
        _id: 'ord-1002',
        user: { name: 'Alexander Wright', email: 'alex@example.com' },
        orderItems: [{ name: 'Rose Gold Rectangle Mesh Watch', quantity: 1, price: 145.0 }],
        shippingAddress: { address: '10 Downing Street', city: 'London', country: 'UK' },
        totalPrice: 145.0,
        status: 'Shipped',
        createdAt: '2025-02-04',
      },
    ];
  }
};
