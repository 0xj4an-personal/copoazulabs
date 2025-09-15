'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import { useVerification } from '@/contexts/VerificationContext';
import { Product } from '@/data/products';
import { getCollectionById } from '@/data/collections';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const t = useTranslations('products');
  const tCollections = useTranslations('collections');
  const { addItem } = useCart();
  const { isVerified } = useVerification();

  // Calculate pricing with discount
  const discountPercentage = 10;
  const originalPrice = product.price;
  const discountedPrice = isVerified ? Math.round(originalPrice * (1 - discountPercentage / 100)) : originalPrice;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: t(`productItems.${product.nameKey}.name`),
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    onAddToCart?.(product);
  };

  const handleToggleWishlist = () => {
    setIsLiked(!isLiked);
    onToggleWishlist?.(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        style={{
          width: '14px',
          height: '14px',
          fill: i < rating ? '#E6B450' : 'transparent',
          color: i < rating ? '#E6B450' : '#9A9A9A'
        }}
      />
    ));
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={t(`productItems.${product.nameKey}.name`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            // Fallback to a simple colored div if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #F5F1E7 0%, #E5E5E5 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9A9A9A; font-family: Arial, sans-serif;">
                  <div style="text-align: center;">
                    <div style="width: 80px; height: 80px; background-color: #3E7C4A; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 1.5rem; font-weight: bold; color: #FFFFFF;">${t(`productItems.${product.nameKey}.name`).charAt(0)}</span>
                    </div>
                    <p style="font-size: 0.875rem; color: #9A9A9A; margin: 0;">${t(`categories.${product.categoryKey}`)}</p>
                  </div>
                </div>
              `;
            }
          }}
        />

        {/* Overlay Actions - Show on hover (desktop) or always (mobile) */}
        {(isHovered || showActions) && (
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleToggleWishlist}
              className="w-10 h-10 bg-white dark:bg-gray-700 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isLiked 
                    ? 'text-pink-400 fill-pink-400' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
            </button>
            <button className="w-10 h-10 bg-white dark:bg-gray-700 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 hover:scale-110 active:scale-95">
              <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}

        {/* Mobile Action Toggle Button */}
        <button
          onClick={() => setShowActions(!showActions)}
          className="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-700 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 active:scale-95 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="w-3 h-0.5 bg-gray-500 dark:bg-gray-400 rounded"></div>
            <div className="w-3 h-0.5 bg-gray-500 dark:bg-gray-400 rounded"></div>
            <div className="w-3 h-0.5 bg-gray-500 dark:bg-gray-400 rounded"></div>
          </div>
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#3E7C4A] text-white px-2 py-1 rounded-xl text-xs font-medium">
              {t('new')}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#E6B450] text-[#1C1C1C] dark:text-[#1C1C1C] px-2 py-1 rounded-xl text-xs font-medium">
              {t('bestseller')}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">{t(`categories.${product.categoryKey}`)}</span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
            {(() => {
              const collection = getCollectionById(product.collectionId);
              return collection ? tCollections(`collectionItems.${collection.nameKey}.name`) : 'Unknown Collection';
            })()}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-2 leading-tight transition-colors duration-200">
          {product.nameKey}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
            {discountedPrice.toLocaleString('es-CO')} cCOP
          </span>
          {isVerified && (
            <span className="text-base text-gray-500 dark:text-gray-400 line-through transition-colors duration-200">
              {originalPrice.toLocaleString('es-CO')} cCOP
            </span>
          )}
          {product.originalPrice && !isVerified && (
            <span className="text-base text-gray-500 dark:text-gray-400 line-through transition-colors duration-200">
              {product.originalPrice.toLocaleString('es-CO')} cCOP
            </span>
          )}
          {isVerified && (
            <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed transition-colors duration-200">
          {t(`productItems.${product.nameKey}.shortDescription`)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-3 px-4 bg-[#3E7C4A] text-white border-none rounded-lg font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#2d5f3a] hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}
