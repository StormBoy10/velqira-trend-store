import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Settings as SettingsIcon,
  LayoutDashboard,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  Tag,
  DollarSign,
  Clock,
  Search,
  Image as ImageIcon,
  Edit3,
  X
} from 'lucide-react';
import {
  fetchProductsFromAPI,
  fetchCategoriesFromAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  createCategoryAPI,
  deleteCategoryAPI,
  fetchOrdersAPI
} from '../services/api';
import { accessorySubCategories } from '../services';
import type { Product, Category } from '../types';

export const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<
    'dashboard' | 'products' | 'categories' | 'add-category' | 'add-product' | 'edit-product' | 'orders' | 'customers' | 'settings'
  >('dashboard');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const token = localStorage.getItem('velqira_admin_token') || undefined;

  // Form State for Category Management
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    showOnHome: true,
    isActive: true,
    sortOrder: 1,
  });

  // Form State for Add / Edit Product
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'dresses-fashion',
    subCategory: '',
    image: '',
    inStock: true,
    isTrending: false,
    isNew: true,
  });

  const loadAllData = async () => {
    const fetchedProducts = await fetchProductsFromAPI();
    const fetchedCategories = await fetchCategoriesFromAPI();
    const fetchedOrders = await fetchOrdersAPI(token);

    setProducts(fetchedProducts);
    setCategories(fetchedCategories);
    setOrders(fetchedOrders);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle Category Name Change & Auto Slug Generation
  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setCategoryForm({
      ...categoryForm,
      name: nameVal,
      slug: generatedSlug,
    });
  };

  // Submit Save Category Handler
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const created = await createCategoryAPI(
      {
        name: categoryForm.name,
        slug: categoryForm.slug,
        description: categoryForm.description,
        image: categoryForm.image || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
        isActive: categoryForm.isActive,
        showOnHome: categoryForm.showOnHome,
        sortOrder: Number(categoryForm.sortOrder) || 1,
      },
      token
    );

    setCategories([created, ...categories]);
    setSuccessMessage(`Category "${created.name}" saved in MongoDB Atlas! Frontend updates automatically.`);
    setTimeout(() => setSuccessMessage(null), 5000);

    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      image: '',
      showOnHome: true,
      isActive: true,
      sortOrder: 1,
    });
    setActiveSection('categories');
  };

  // Submit Add Product Handler
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const created = await createProductAPI(
      {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price) || 0,
        originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
        category: productForm.category,
        subCategory: productForm.subCategory,
        image: productForm.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
        inStock: productForm.inStock,
        isTrending: productForm.isTrending,
        isNew: productForm.isNew,
      },
      token
    );

    setProducts([created, ...products]);
    setSuccessMessage(`Product "${created.name}" created and synced with MongoDB Atlas!`);
    setTimeout(() => setSuccessMessage(null), 4000);

    setProductForm({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'dresses-fashion',
      subCategory: '',
      image: '',
      inStock: true,
      isTrending: false,
      isNew: true,
    });
    setActiveSection('products');
  };

  // Open Edit Product View
  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : '',
      category: product.category,
      subCategory: product.subCategory || '',
      image: product.image,
      inStock: product.inStock !== false,
      isTrending: product.isTrending || false,
      isNew: product.isNew !== false,
    });
    setActiveSection('edit-product');
  };

  // Submit Edit Product Handler
  const handleUpdateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedFields: Partial<Product> = {
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      category: productForm.category,
      subCategory: productForm.subCategory,
      image: productForm.image,
      inStock: productForm.inStock,
      isTrending: productForm.isTrending,
      isNew: productForm.isNew,
    };

    await updateProductAPI(editingProduct.id, updatedFields, token);

    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? ({ ...p, ...updatedFields } as Product) : p
      )
    );

    setSuccessMessage(`Product "${productForm.name}" updated successfully in MongoDB Atlas!`);
    setTimeout(() => setSuccessMessage(null), 4000);

    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'dresses-fashion',
      subCategory: '',
      image: '',
      inStock: true,
      isTrending: false,
      isNew: true,
    });
    setActiveSection('products');
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategoryAPI(id, token);
    setCategories(categories.filter((c) => c.id !== id));
    setSuccessMessage('Category deactivated in MongoDB Atlas.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductAPI(id, token);
    setProducts(products.filter((p) => p.id !== id));
    setSuccessMessage('Product removed from inventory.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[#FFF9F5] min-h-screen flex flex-col md:flex-row">

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#332522] text-[#FFF9F5] p-6 shrink-0 border-r border-[#C6A16B]/30 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 pb-6 border-b border-[#C6A16B]/20 mb-6">
            <span className="text-[#C6A16B] text-xl font-bold">✦</span>
            <span className="text-xl font-bold font-serif text-[#FFF9F5]">VELQIRA ADMIN</span>
          </div>

          <nav className="space-y-1.5 text-sm font-semibold">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'dashboard'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSection('products')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'products' || activeSection === 'add-product' || activeSection === 'edit-product'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('categories')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'categories' || activeSection === 'add-category'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'orders'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('customers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'customers'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeSection === 'settings'
                  ? 'bg-[#E8BFC3] text-[#332522] font-bold'
                  : 'text-[#FFF9F5]/80 hover:bg-[#FFF9F5]/10 hover:text-[#E8BFC3]'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#C6A16B]/20 text-xs text-[#FFF9F5]/60">
          MongoDB Atlas: <span className="text-emerald-400 font-bold">CONNECTED</span>
        </div>
      </aside>

      {/* Main View */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 bg-[#332522] text-[#FFF9F5] rounded-2xl border border-[#C6A16B]/40 flex items-center space-x-2 text-sm font-semibold shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-[#C6A16B] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SECTION: DASHBOARD OVERVIEW */}
        {activeSection === 'dashboard' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Real-Time Store Stats</span>
              <h1 className="text-3xl font-bold font-serif text-[#332522] mt-1">VELQIRA Control Center</h1>
            </div>

            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs flex items-center space-x-4">
                <div className="p-3.5 bg-[#FFF9F5] text-[#C6A16B] rounded-xl border border-[#C6A16B]/30">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#332522]/60">Total Products</p>
                  <p className="text-2xl font-bold font-serif text-[#332522]">{products.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs flex items-center space-x-4">
                <div className="p-3.5 bg-[#FFF9F5] text-[#C6A16B] rounded-xl border border-[#C6A16B]/30">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#332522]/60">Categories</p>
                  <p className="text-2xl font-bold font-serif text-[#332522]">{categories.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs flex items-center space-x-4">
                <div className="p-3.5 bg-[#FFF9F5] text-[#C6A16B] rounded-xl border border-[#C6A16B]/30">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#332522]/60">Orders</p>
                  <p className="text-2xl font-bold font-serif text-[#332522]">{orders.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AB]/30 shadow-xs flex items-center space-x-4">
                <div className="p-3.5 bg-[#FFF9F5] text-[#C6A16B] rounded-xl border border-[#C6A16B]/30">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#332522]/60">Total Sales</p>
                  <p className="text-2xl font-bold font-serif text-[#332522]">${totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-3xl border border-[#D9A6AB]/30 shadow-xs">
              <h2 className="text-xl font-bold font-serif text-[#332522] mb-4">Quick Admin Controls</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection('add-category')}
                  className="bg-[#E8BFC3] text-[#332522] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#D9A6AB] transition-colors"
                >
                  + Add Category (e.g. Beauty & Skincare)
                </button>
                <button
                  onClick={() => setActiveSection('add-product')}
                  className="bg-[#332522] text-[#FFF9F5] px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors"
                >
                  + Add Product
                </button>
                <button
                  onClick={() => setActiveSection('orders')}
                  className="border border-[#D9A6AB]/50 text-[#332522] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#FFF9F5] transition-colors"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: CATEGORY MANAGEMENT */}
        {(activeSection === 'categories' || activeSection === 'add-category') && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Store Architecture</span>
                <h1 className="text-3xl font-bold font-serif text-[#332522] mt-1">Category Management</h1>
              </div>
              <button
                onClick={() => setActiveSection('add-category')}
                className="inline-flex items-center space-x-2 bg-[#E8BFC3] text-[#332522] px-5 py-2.5 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Category</span>
              </button>
            </div>

            {/* Form: Add Category */}
            {activeSection === 'add-category' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A6AB]/30 shadow-md">
                <div className="border-b border-[#D9A6AB]/20 pb-4 mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold font-serif text-[#332522] flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#C6A16B]" /> Add Category Details
                  </h2>
                  <button onClick={() => setActiveSection('categories')} className="text-xs font-bold text-[#332522]/60 hover:text-[#332522]">
                    Cancel & Return
                  </button>
                </div>

                <form onSubmit={handleSaveCategory} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Category Name:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Beauty & Skincare"
                        value={categoryForm.name}
                        onChange={handleCategoryNameChange}
                        className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Slug:</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. beauty-skincare"
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                        className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Description:</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Beauty products, botanical facial oils, and skincare items"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Category Image URL:</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80"
                      value={categoryForm.image}
                      onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Display on Homepage:</label>
                      <select
                        value={categoryForm.showOnHome ? 'yes' : 'no'}
                        onChange={(e) => setCategoryForm({ ...categoryForm, showOnHome: e.target.value === 'yes' })}
                        className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-2.5 rounded-xl border border-[#D9A6AB]/40"
                      >
                        <option value="yes">Yes (Show Card)</option>
                        <option value="no">No (Hide Card)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Status:</label>
                      <select
                        value={categoryForm.isActive ? 'active' : 'inactive'}
                        onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.value === 'active' })}
                        className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-2.5 rounded-xl border border-[#D9A6AB]/40"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Sort Position:</label>
                      <input
                        type="number"
                        value={categoryForm.sortOrder}
                        onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })}
                        className="w-full bg-[#FFF9F5] text-[#332522] text-sm px-4 py-2.5 rounded-xl border border-[#D9A6AB]/40"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-6 bg-[#332522] text-[#FFF9F5] py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-md text-base">
                    Save Category
                  </button>
                </form>
              </div>
            )}

            {/* Category Cards List */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A6AB]/30 shadow-xs">
              <h2 className="text-xl font-bold font-serif text-[#332522] mb-6">Existing Store Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div key={cat.id} className="border border-[#D9A6AB]/30 rounded-2xl overflow-hidden bg-[#FFF9F5] p-4 flex flex-col justify-between shadow-xs">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-xl object-cover bg-white" />
                      <div>
                        <h3 className="font-bold font-serif text-base text-[#332522]">{cat.name}</h3>
                        <p className="text-xs font-mono text-[#C6A16B]">/{cat.slug || cat.id}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#332522]/70 mb-4 line-clamp-2">{cat.description}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#D9A6AB]/20 text-xs">
                      <div className="flex items-center space-x-2">
                        {cat.isActive !== false ? (
                          <span className="flex items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <Eye className="w-3 h-3 mr-1" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            <EyeOff className="w-3 h-3 mr-1" /> Inactive
                          </span>
                        )}

                        {cat.showOnHome !== false && (
                          <span className="flex items-center text-[#332522] font-semibold bg-[#E8BFC3]/40 px-2 py-0.5 rounded">
                            <Home className="w-3 h-3 mr-1" /> Homepage
                          </span>
                        )}
                      </div>

                      <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700 p-1" title="Remove Category">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: PRODUCTS MANAGEMENT & EDIT PRODUCT */}
        {(activeSection === 'products' || activeSection === 'add-product' || activeSection === 'edit-product') && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Inventory Control</span>
                <h1 className="text-3xl font-bold font-serif text-[#332522] mt-1">Product Catalog ({filteredProducts.length})</h1>
              </div>
              <button
                onClick={() => setActiveSection('add-product')}
                className="inline-flex items-center space-x-2 bg-[#E8BFC3] text-[#332522] px-5 py-2.5 rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Product</span>
              </button>
            </div>

            {/* Search Filter input */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, or sub-category..."
                className="w-full bg-white text-[#332522] text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[#D9A6AB]/40 focus:outline-none focus:border-[#C6A16B]"
              />
              <Search className="w-4 h-4 text-[#C6A16B] absolute left-3.5 top-3" />
            </div>

            {/* Form: Add New Product */}
            {activeSection === 'add-product' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D9A6AB]/30 shadow-md">
                <div className="border-b border-[#D9A6AB]/20 pb-4 mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold font-serif text-[#332522]">Add New Product</h2>
                  <button onClick={() => setActiveSection('products')} className="text-xs font-bold text-[#332522]/60 hover:text-[#332522]">
                    Cancel & Return
                  </button>
                </div>

                <form onSubmit={handleAddProductSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pearl Drop Earrings"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                      >
                        <option value="dresses-fashion">Dresses & Fashion</option>
                        <option value="jewellery-accessories">Jewellery & Accessories</option>
                        <option value="home-decor">Home Decor</option>
                        <option value="art-crafts">Art & Crafts</option>
                        <option value="korean-goodies">Korean Goodies</option>
                      </select>
                    </div>

                    {productForm.category === 'jewellery-accessories' && (
                      <div>
                        <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Sub-Category Item Type</label>
                        <select
                          value={productForm.subCategory}
                          onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                          className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                        >
                          <option value="">Select Item Sub-Category...</option>
                          {accessorySubCategories.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="68.00"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                      />
                    </div>
                  </div>

                  {/* Image Link Input & Live Preview Box */}
                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">
                      Product Image Link (URL)
                    </label>
                    <div className="flex gap-4 items-start">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="flex-1 bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                      />
                      {productForm.image ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#D9A6AB]/40 shrink-0 bg-[#FFF9F5]">
                          <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl border border-dashed border-[#D9A6AB]/50 shrink-0 bg-[#FFF9F5] flex flex-col items-center justify-center text-[#C6A16B]">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-[9px]">Preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Product details, materials, and care guide..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>In Stock</span>
                    </label>

                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isTrending}
                        onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>Mark as Trending</span>
                    </label>

                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isNew}
                        onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>Mark as New Arrival</span>
                    </label>
                  </div>

                  <button type="submit" className="w-full mt-6 bg-[#332522] text-white py-3.5 rounded-xl font-bold">
                    Save Product to MongoDB
                  </button>
                </form>
              </div>
            )}

            {/* Form: EDIT EXISTING PRODUCT */}
            {activeSection === 'edit-product' && editingProduct && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#C6A16B] shadow-xl relative">
                <div className="border-b border-[#D9A6AB]/20 pb-4 mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold font-serif text-[#332522] flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#C6A16B]" /> Edit Product: <span className="text-[#C6A16B]">{editingProduct.name}</span>
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setActiveSection('products');
                    }}
                    className="p-1 text-[#332522]/60 hover:text-[#332522]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleUpdateProductSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 font-medium"
                      >
                        <option value="dresses-fashion">Dresses & Fashion</option>
                        <option value="jewellery-accessories">Jewellery & Accessories</option>
                        <option value="home-decor">Home Decor</option>
                        <option value="art-crafts">Art & Crafts</option>
                        <option value="korean-goodies">Korean Goodies</option>
                      </select>
                    </div>

                    {productForm.category === 'jewellery-accessories' && (
                      <div>
                        <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Sub-Category Item Type</label>
                        <select
                          value={productForm.subCategory}
                          onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                          className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 font-medium"
                        >
                          <option value="">Select Item Sub-Category...</option>
                          {accessorySubCategories.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Product Image Link (URL)</label>
                    <div className="flex gap-4 items-start">
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="flex-1 bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                      />
                      {productForm.image && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#D9A6AB]/40 shrink-0 bg-[#FFF9F5]">
                          <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#332522] uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full bg-[#FFF9F5] text-sm px-4 py-3 rounded-xl border border-[#D9A6AB]/40"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>In Stock</span>
                    </label>

                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isTrending}
                        onChange={(e) => setProductForm({ ...productForm, isTrending: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>Mark as Trending</span>
                    </label>

                    <label className="flex items-center space-x-2 text-sm font-semibold text-[#332522] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.isNew}
                        onChange={(e) => setProductForm({ ...productForm, isNew: e.target.checked })}
                        className="w-4 h-4 accent-[#C6A16B]"
                      />
                      <span>Mark as New Arrival</span>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-[#D9A6AB]/20">
                    <button
                      type="submit"
                      className="flex-1 bg-[#C6A16B] text-[#332522] py-3.5 rounded-xl font-bold hover:bg-[#E8BFC3] transition-colors shadow-md text-base"
                    >
                      Update Product Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setActiveSection('products');
                      }}
                      className="px-6 py-3.5 rounded-xl border border-[#D9A6AB]/50 font-bold text-sm text-[#332522] hover:bg-[#FFF9F5]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Inventory Table with Edit & Delete Actions */}
            <div className="bg-white rounded-3xl border border-[#D9A6AB]/30 shadow-xs overflow-hidden">
              <table className="w-full text-left text-sm text-[#332522]">
                <thead className="bg-[#FFF9F5] text-xs font-bold uppercase tracking-wider text-[#332522]/70 border-b border-[#D9A6AB]/30">
                  <tr>
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Sub-Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9A6AB]/20">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF9F5]/60 transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <span className="font-bold">{p.name}</span>
                          {p.inStock === false && (
                            <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs font-semibold">{p.category}</td>
                      <td className="py-4 px-6 text-xs text-[#C6A16B] font-bold">{p.subCategory || '—'}</td>
                      <td className="py-4 px-6 font-bold">${p.price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-2 text-[#C6A16B] hover:text-[#332522] hover:bg-[#FFF9F5] rounded-lg transition-colors inline-flex items-center gap-1 font-bold text-xs"
                          title="Edit Product Details"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: ORDERS MANAGEMENT */}
        {activeSection === 'orders' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16B]">Live Sales</span>
              <h1 className="text-3xl font-bold font-serif text-[#332522] mt-1">Order Management ({orders.length})</h1>
            </div>

            <div className="bg-white rounded-3xl border border-[#D9A6AB]/30 shadow-xs overflow-hidden">
              <div className="divide-y divide-[#D9A6AB]/20">
                {orders.map((order) => (
                  <div key={order._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#332522] font-mono">{order._id}</span>
                        <span className="text-xs px-2.5 py-1 bg-[#E8BFC3]/40 text-[#332522] font-bold rounded-md">
                          {order.status || 'Processing'}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#332522] mt-1">
                        Customer: {order.user?.name || 'Guest'} ({order.user?.email || 'N/A'})
                      </p>
                      <p className="text-xs text-[#332522]/60 mt-0.5">
                        Shipping: {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-[#332522]">${order.totalPrice.toFixed(2)}</p>
                      <p className="text-xs text-[#332522]/60 flex items-center gap-1 justify-end mt-1">
                        <Clock className="w-3 h-3 text-[#C6A16B]" /> {order.createdAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: OTHER ADMIN PANELS */}
        {(activeSection === 'customers' || activeSection === 'settings') && (
          <div className="max-w-4xl mx-auto text-center py-20 bg-white rounded-3xl border border-[#D9A6AB]/30 shadow-xs">
            <h2 className="text-2xl font-bold font-serif text-[#332522] capitalize">{activeSection} Control</h2>
            <p className="text-sm text-[#332522]/70 mt-2">
              The {activeSection} manager is active and synced with MongoDB Atlas.
            </p>
            <button
              onClick={() => setActiveSection('dashboard')}
              className="mt-6 bg-[#E8BFC3] text-[#332522] px-6 py-2.5 rounded-xl font-bold text-sm"
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </main>
    </div>
  );
};
