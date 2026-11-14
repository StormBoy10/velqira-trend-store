import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoadingScreen } from './components/common/LoadingScreen';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TrendingPage } from './pages/TrendingPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

import type { CartItem, Product } from './types';
import type { ReactNode } from 'react';

// Automatically scroll window to top whenever navigation route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

interface InnerPageProps {
  children: ReactNode;
}

function InnerPage({ children }: InnerPageProps) {
  return <div className="inner-page">{children}</div>;
}

export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [adminToken, setAdminToken] = useState<string | null>(
    localStorage.getItem('velqira_admin_token')
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });

    triggerToast(`Added "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;

            return newQty > 0
              ? { ...item, quantity: newQty }
              : null;
          }

          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );

    triggerToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen duration={2200} />
      <div className="min-h-screen flex flex-col font-sans text-[#332522] bg-[#FFF9F5] relative">

        <AnnouncementBar />

        <Header cartCount={totalCartCount} />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#332522] text-[#FFF9F5] px-5 py-3 rounded-xl shadow-2xl border border-[#C6A16B]/40 text-sm font-semibold flex items-center space-x-2 animate-bounce">
            <span className="text-[#C6A16B]">✦</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="flex-grow">

          <Routes>

            {/* HOME PAGE — ORIGINAL DESIGN UNCHANGED */}
            <Route
              path="/"
              element={<HomePage onAddToCart={handleAddToCart} />}
            />

            {/* ELEGANT INNER PAGES */}

            <Route
              path="/shop"
              element={
                <InnerPage>
                  <ShopPage onAddToCart={handleAddToCart} />
                </InnerPage>
              }
            />

            <Route
              path="/categories"
              element={
                <InnerPage>
                  <CategoriesPage />
                </InnerPage>
              }
            />

            <Route
              path="/trending"
              element={
                <InnerPage>
                  <TrendingPage onAddToCart={handleAddToCart} />
                </InnerPage>
              }
            />

            <Route
              path="/product/:id"
              element={
                <InnerPage>
                  <ProductPage onAddToCart={handleAddToCart} />
                </InnerPage>
              }
            />

            <Route
              path="/cart"
              element={
                <InnerPage>
                  <CartPage
                    cart={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                </InnerPage>
              }
            />

            <Route
              path="/checkout"
              element={
                <InnerPage>
                  <CheckoutPage
                    cart={cart}
                    onClearCart={handleClearCart}
                  />
                </InnerPage>
              }
            />

            <Route
              path="/about"
              element={
                <InnerPage>
                  <AboutPage />
                </InnerPage>
              }
            />

            {/* ADMIN PAGES */}

            <Route
              path="/admin-login"
              element={
                <InnerPage>
                  <AdminLoginPage
                    onLoginSuccess={(token) => setAdminToken(token)}
                  />
                </InnerPage>
              }
            />

            <Route
              path="/admin"
              element={
                adminToken ? (
                  <InnerPage>
                    <AdminPage />
                  </InnerPage>
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />

            <Route
              path="*"
              element={
                <InnerPage>
                  <NotFoundPage />
                </InnerPage>
              }
            />

          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
