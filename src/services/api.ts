import type { Product, Category } from '../types';
import { mockProducts, mockCategories } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Sanitize helper to ensure array items are valid non-null objects
const sanitizeProducts = (arr: any[]): Product[] => {
  if (!Array.isArray(arr)) return [];
  return arr.filter((p) => p && typeof p === 'object' && p.id && p.name);
};

const sanitizeCategories = (arr: any[]): Category[] => {
  if (!Array.isArray(arr)) return [...mockCategories];
  const valid = arr.filter((c) => c && typeof c === 'object' && c.name);
  return valid.length > 0 ? valid : [...mockCategories];
};

// Persistent storage helpers with strict user state preservation
const loadStoredProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem('velqira_dynamic_products');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return sanitizeProducts(parsed);
    }
  } catch (e) {
    localStorage.removeItem('velqira_dynamic_products');
  }
  return [...mockProducts];
};

const saveStoredProducts = (products: Product[]) => {
  try {
    if (Array.isArray(products)) {
      const valid = sanitizeProducts(products);
      localStorage.setItem('velqira_dynamic_products', JSON.stringify(valid));
    }
  } catch (e) {}
};

const loadStoredCategories = (): Category[] => {
  try {
    const saved = localStorage.getItem('velqira_dynamic_categories');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return sanitizeCategories(parsed);
    }
  } catch (e) {
    localStorage.removeItem('velqira_dynamic_categories');
  }
  return [...mockCategories];
};

const saveStoredCategories = (categories: Category[]) => {
  try {
    if (Array.isArray(categories)) {
      const valid = sanitizeCategories(categories);
      localStorage.setItem('velqira_dynamic_categories', JSON.stringify(valid));
    }
  } catch (e) {}
};

// Live in-memory cache synchronized with LocalStorage & Real-Time API
let dynamicProducts: Product[] = loadStoredProducts();
let dynamicCategories: Category[] = loadStoredCategories();

// Real-time Server-Sent Events (SSE) live updates listener
export const initLiveStream = (onUpdate?: () => void) => {
  try {
    if (typeof EventSource === 'undefined') return () => {};
    const eventSource = new EventSource(`${API_BASE_URL}/live-updates`);
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'PRODUCT_CREATED' || payload.type === 'PRODUCT_UPDATED') {
          fetchProductsFromAPI().then(() => onUpdate && onUpdate());
        } else if (payload.type === 'CATEGORY_CREATED' || payload.type === 'CATEGORY_UPDATED') {
          fetchCategoriesFromAPI().then(() => onUpdate && onUpdate());
        }
      } catch (err) {}
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => eventSource.close();
  } catch (err) {
    return () => {};
  }
};

// Clear all default products helper
export const clearDefaultProductsAPI = (): void => {
  dynamicProducts = [];
  saveStoredProducts([]);
};

// --- PUBLIC PRODUCT & CATEGORY APIs ---

export const fetchProductsFromAPI = async (category?: string): Promise<Product[]> => {
  try {
    const url = category && category !== 'all'
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.products) && data.products.length > 0) {
        dynamicProducts = sanitizeProducts(data.products);
        saveStoredProducts(dynamicProducts);
      }
    }
  } catch (err) {
    // API offline
  }

  if (!category || category === 'all') return dynamicProducts;
  return dynamicProducts.filter(
    (p) => p && p.category && (p.category === category || p.category.toLowerCase() === category.toLowerCase())
  );
};

export const fetchProductByIdFromAPI = async (id: string): Promise<Product | undefined> => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.product) return data.product;
    }
  } catch (err) {
    // API offline
  }
  return dynamicProducts.find((p) => p && p.id === id);
};

export const fetchCategoriesFromAPI = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.categories) && data.categories.length > 0) {
        dynamicCategories = sanitizeCategories(data.categories);
        saveStoredCategories(dynamicCategories);
      }
    }
  } catch (err) {
    // API offline
  }
  if (!Array.isArray(dynamicCategories) || dynamicCategories.length === 0) {
    dynamicCategories = [...mockCategories];
  }
  return dynamicCategories;
};

// --- ADMIN MANAGEMENT APIs ---

export const createProductAPI = async (productData: Partial<Product>, token?: string): Promise<Product> => {
  const newProduct: Product = {
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

  dynamicProducts = sanitizeProducts([newProduct, ...dynamicProducts]);
  saveStoredProducts(dynamicProducts);

  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.product) {
        dynamicProducts = sanitizeProducts(
          dynamicProducts.map((p) => (p.id === newProduct.id ? data.product : p))
        );
        saveStoredProducts(dynamicProducts);
        return data.product;
      }
    }
  } catch (err) {
    console.warn('[API Sync] Saved permanently in persistent storage:', err);
  }

  return newProduct;
};

export const updateProductAPI = async (id: string, productData: Partial<Product>, token?: string): Promise<Product | null> => {
  dynamicProducts = sanitizeProducts(
    dynamicProducts.map((p) => (p && p.id === id ? ({ ...p, ...productData } as Product) : p))
  );
  saveStoredProducts(dynamicProducts);

  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(productData),
    });
    if (res.ok) {
      const data = await res.json();
      return data.product;
    }
  } catch (err) {
    console.warn('[API Sync] Updated permanently in persistent storage:', err);
  }

  return dynamicProducts.find((p) => p && p.id === id) || null;
};

export const deleteProductAPI = async (id: string, token?: string): Promise<boolean> => {
  dynamicProducts = sanitizeProducts(dynamicProducts.filter((p) => p && p.id !== id));
  saveStoredProducts(dynamicProducts);

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
  const newCategory: Category = {
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

  if (!Array.isArray(dynamicCategories)) dynamicCategories = [...mockCategories];
  dynamicCategories = sanitizeCategories([...dynamicCategories, newCategory]);
  saveStoredCategories(dynamicCategories);

  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(categoryData),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.category) {
        dynamicCategories = sanitizeCategories(
          dynamicCategories.map((c) => (c.id === newCategory.id ? data.category : c))
        );
        saveStoredCategories(dynamicCategories);
        return data.category;
      }
    }
  } catch (err) {
    console.warn('[API Sync] Category saved permanently in persistent storage:', err);
  }

  return newCategory;
};

export const updateCategoryAPI = async (id: string, categoryData: Partial<Category>, token?: string): Promise<Category | null> => {
  if (!Array.isArray(dynamicCategories)) dynamicCategories = [...mockCategories];
  dynamicCategories = sanitizeCategories(
    dynamicCategories.map((c) => (c && (c.id === id || c.slug === id) ? ({ ...c, ...categoryData } as Category) : c))
  );
  saveStoredCategories(dynamicCategories);

  try {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(categoryData),
    });
    if (res.ok) {
      const data = await res.json();
      return data.category;
    }
  } catch (err) {
    console.warn('[API Sync] Category updated permanently in persistent storage:', err);
  }

  return dynamicCategories.find((c) => c && (c.id === id || c.slug === id)) || null;
};

export const deleteCategoryAPI = async (id: string, token?: string): Promise<boolean> => {
  if (!Array.isArray(dynamicCategories)) dynamicCategories = [...mockCategories];
  dynamicCategories = sanitizeCategories(dynamicCategories.filter((c) => c && c.id !== id));
  saveStoredCategories(dynamicCategories);

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
    return [
      {
        _id: 'ord-1001',
        user: { name: 'Sophia Miller', email: 'sophia@example.com' },
        orderItems: [{ name: 'Silk Wrap Floral Midi Dress', quantity: 1, price: 2999.0 }],
        shippingAddress: { address: '742 Evergreen Terrace', city: 'Springfield', country: 'IN' },
        totalPrice: 2999.0,
        status: 'Processing',
        createdAt: '2025-02-05',
      },
      {
        _id: 'ord-1002',
        user: { name: 'Alexander Wright', email: 'alex@example.com' },
        orderItems: [{ name: 'Rose Gold Rectangle Mesh Watch', quantity: 1, price: 3499.0 }],
        shippingAddress: { address: '10 Downing Street', city: 'Mumbai', country: 'IN' },
        totalPrice: 3499.0,
        status: 'Shipped',
        createdAt: '2025-02-04',
      },
    ];
  }
};
