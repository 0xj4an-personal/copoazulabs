'use client';

import { useState, useCallback, useMemo, memo } from 'react';
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

const ProductCard = memo(function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const t = useTranslations('products');
  const tCollections = useTranslations('collections');
  const { addItem } = useCart();
  const { isVerified } = useVerification();

  // Memoized calculations
  const pricing = useMemo(() => {
    const discountPercentage = 10;
    const originalPrice = product.price;
    const discountedPrice = isVerified ? Math.round(originalPrice * (1 - discountPercentage / 100)) : originalPrice;
    return { discountPercentage, originalPrice, discountedPrice };
  }, [product.price, isVerified]);

  const collection = useMemo(() => getCollectionById(product.collectionId), [product.collectionId]);

  // Optimized handlers
  const handleAddToCart = useCallback(() => {
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
  }, [selectedSize, product, t, addItem, onAddToCart]);

  const handleToggleWishlist = useCallback(() => {
    setIsLiked(!isLiked);
    onToggleWishlist?.(product);
  }, [isLiked, onToggleWishlist, product]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const toggleActions = useCallback(() => setShowActions(!showActions), [showActions]);


  return (
    <div
      className="relative bg-white dark:bg-brand-dark/80 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--brand-background) 0%, var(--brand-neutral) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--brand-neutral); font-family: Arial, sans-serif;">
                  <div style="text-align: center;">
                    <div style="width: 80px; height: 80px; background-color: var(--brand-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                      <span style="font-size: 1.5rem; font-weight: bold; color: var(--brand-white);">${t(`productItems.${product.nameKey}.name`).charAt(0)}</span>
                    </div>
                    <p style="font-size: 0.875rem; color: var(--brand-neutral); margin: 0;">${t(`categories.${product.categoryKey}`)}</p>
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
              className="w-10 h-10 bg-white dark:bg-brand-dark/70 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isLiked 
                    ? 'text-pink-400 fill-pink-400' 
                    : 'text-brand-neutral dark:text-brand-background'
                }`}
              />
            </button>
            <button className="w-10 h-10 bg-white dark:bg-brand-dark/70 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 hover:scale-110 active:scale-95">
              <Eye className="w-5 h-5 text-brand-neutral dark:text-brand-background" />
            </button>
          </div>
        )}

        {/* Mobile Action Toggle Button */}
        <button
          onClick={toggleActions}
          className="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-brand-dark/70 border-none rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-200 active:scale-95 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <div className="w-3 h-0.5 bg-brand-neutral dark:bg-brand-background rounded"></div>
            <div className="w-3 h-0.5 bg-brand-neutral dark:bg-brand-background rounded"></div>
            <div className="w-3 h-0.5 bg-brand-neutral dark:bg-brand-background rounded"></div>
          </div>
        </button>

      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-brand-neutral dark:text-brand-background">{t(`categories.${product.categoryKey}`)}</span>
          <span className="text-xs bg-brand-light/20 dark:bg-brand-dark/70 text-brand-neutral dark:text-brand-background px-2 py-1 rounded-full">
            {collection ? tCollections(`collectionItems.${collection.nameKey}.name`) : 'Unknown Collection'}
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-brand-dark dark:text-brand-background mb-2 leading-tight transition-colors duration-200">
          {t(`productItems.${product.nameKey}.name`)}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-brand-dark dark:text-brand-background transition-colors duration-200">
            {pricing.discountedPrice.toLocaleString('es-CO')} cCOP
          </span>
          {isVerified && (
            <span className="text-base text-brand-neutral dark:text-brand-neutral line-through transition-colors duration-200">
              {pricing.originalPrice.toLocaleString('es-CO')} cCOP
            </span>
          )}
          {product.originalPrice && !isVerified && (
            <span className="text-base text-brand-neutral dark:text-brand-neutral line-through transition-colors duration-200">
              {product.originalPrice.toLocaleString('es-CO')} cCOP
            </span>
          )}
          {isVerified && (
            <span className="text-xs bg-brand-light/20 dark:bg-brand-light/20 text-brand-primary dark:text-brand-light px-2 py-1 rounded-full font-medium">
              -{pricing.discountPercentage}%
            </span>
          )}
        </div>

        {/* Product Description */}
        <p className="text-sm text-brand-neutral dark:text-brand-neutral mb-4 leading-relaxed transition-colors duration-200">
          {t(`productItems.${product.nameKey}.description`)}
        </p>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-brand-dark dark:text-brand-background mb-2 transition-colors duration-200">
            {t('sizes.size')}:
            {!selectedSize && (
              <span className="text-brand-purple text-xs ml-2">* {t('sizes.selectSize')}</span>
            )}
          </label>
          <div className="flex gap-2">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium border-2 rounded-lg transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  selectedSize === size
                    ? 'border-brand-primary bg-brand-primary text-brand-white shadow-md'
                    : 'border-brand-neutral dark:border-brand-neutral bg-brand-white dark:bg-dark-surface text-brand-dark dark:text-brand-background hover:border-brand-primary hover:bg-brand-light/10 hover:shadow-sm'
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
          className={`w-full py-3 px-4 border-none rounded-lg font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
            selectedSize
              ? 'bg-brand-primary text-brand-white hover:bg-brand-accent hover:shadow-xl hover:scale-105'
              : 'bg-brand-neutral dark:bg-brand-neutral text-brand-neutral dark:text-brand-background cursor-not-allowed'
          }`}
          disabled={!selectedSize}
        >
          <ShoppingCart className="w-4 h-4" />
          {selectedSize ? t('addToCart') : t('sizes.selectSize')}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
