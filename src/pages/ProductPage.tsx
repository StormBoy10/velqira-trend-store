import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProductById } from '../services';
import type { Product } from '../types';

interface ProductPageProps {
  onAddToCart?: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then((p) => setProduct(p || null));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-16 text-center">
        <h2 className="text-2xl font-bold font-serif text-[#332522]">Product Not Found</h2>
        <Link to="/shop" className="text-sm font-semibold text-[#C6A16B] hover:underline mt-4 inline-block">
          &larr; Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center text-sm font-semibold text-[#332522]/70 hover:text-[#C6A16B] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9A6AB]/30 shadow-xs">
          {/* Product Image */}
          <div className="aspect-square bg-[#FFF9F5] rounded-xl overflow-hidden shadow-xs">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase text-[#C6A16B] tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold font-serif text-[#332522] mt-2">{product.name}</h1>

            <div className="flex items-center space-x-2 mt-3 text-sm">
              <div className="flex items-center text-[#C6A16B]">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-bold text-[#332522]">{product.rating}</span>
              </div>
              <span className="text-[#D9A6AB]">|</span>
              <span className="text-[#332522]/70">{product.reviewsCount} Customer Reviews</span>
            </div>

            <div className="flex items-baseline space-x-3 mt-6">
              <span className="text-3xl font-bold text-[#332522]">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#332522]/40 line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-[#332522]/80 mt-6 leading-relaxed">{product.description}</p>

            <button
              onClick={() => onAddToCart && onAddToCart(product)}
              className="mt-8 flex items-center justify-center w-full py-4 bg-[#E8BFC3] text-[#332522] rounded-xl font-bold hover:bg-[#D9A6AB] transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
