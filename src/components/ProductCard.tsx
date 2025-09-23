'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Shield } from 'lucide-react';
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
  const [selectedSize, setSelectedSize] = useState<string>('');
  const t = useTranslations('products');
  const tCollections = useTranslations('collections');
  const { addItem } = useCart();
  const { isVerified } = useVerification();

  // Calculate pricing with discount
  const discountPercentage = 10;
  const originalPrice = product.price;
  const discountedPrice = isVerified ? Math.round(originalPrice * (1 - discountPercentage / 100)) : originalPrice;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    const productName = t(`productItems.${product.nameKey}.name`);
    const sizeName = t(`sizes.${selectedSize}`);
    
    addItem({
      id: `${product.id}-${selectedSize}`,
      name: `${productName} (${sizeName})`,
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


  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
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

      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">{t(`categories.${product.categoryKey}`)}</span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
            {(() => {
              const collection = getCollectionById(product.collectionId);
              return collection ? tCollections(`collectionItems.${collection.nameKey}.name`) : 'Unknown Collection';
            })()}
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-2 leading-tight transition-colors duration-200">
          {t(`productItems.${product.nameKey}.name`)}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
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
          {t(`productItems.${product.nameKey}.description`)}
        </p>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#1C1C1C] dark:text-[#F5F1E7] mb-2 transition-colors duration-200">
            {t('sizes.size')}:
            {!selectedSize && (
              <span className="text-red-500 text-xs ml-2">* {t('sizes.selectSize')}</span>
            )}
          </label>
          <div className="flex gap-2">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium border-2 rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  selectedSize === size
                    ? 'border-[#3E7C4A] bg-[#3E7C4A] text-white shadow-md'
                    : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 text-[#1C1C1C] dark:text-[#F5F1E7] hover:border-[#3E7C4A] hover:bg-[#3E7C4A]/10 hover:shadow-sm'
                }`}
              >
                {t(`sizes.${size}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-3 border-none rounded-lg font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
            selectedSize
              ? 'bg-[#3E7C4A] text-white hover:bg-[#2d5f3a] hover:shadow-lg'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedSize}
        >
          <ShoppingCart className="w-4 h-4" />
          {selectedSize ? t('addToCart') : t('sizes.selectSize')}
        </button>
      </div>
    </div>
  );
}
