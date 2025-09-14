'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const t = useTranslations('products');
  const { addItem } = useCart();

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
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
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

        {/* Overlay Actions */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              onClick={handleToggleWishlist}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart 
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  color: isLiked ? '#D88FA0' : '#9A9A9A',
                  fill: isLiked ? '#D88FA0' : 'transparent'
                }} 
              />
            </button>
            <button style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease'
            }}>
              <Eye style={{ width: '20px', height: '20px', color: '#9A9A9A' }} />
            </button>
          </div>
        )}

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {product.isNew && (
            <span style={{
              backgroundColor: '#3E7C4A',
              color: '#FFFFFF',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {t('new')}
            </span>
          )}
          {product.isBestSeller && (
            <span style={{
              backgroundColor: '#E6B450',
              color: '#1C1C1C',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {t('bestseller')}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>{t(`categories.${product.categoryKey}`)}</span>
        </div>
        
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: '#1C1C1C', 
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          {t(`productItems.${product.nameKey}.name`)}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {renderStars(product.rating)}
          </div>
          <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1C1C1C' }}>
            {product.price.toLocaleString('es-CO')} cCOP
          </span>
          {product.originalPrice && (
            <span style={{ 
              fontSize: '1rem', 
              color: '#9A9A9A', 
              textDecoration: 'line-through' 
            }}>
              {product.originalPrice.toLocaleString('es-CO')} cCOP
            </span>
          )}
        </div>

        {/* Product Description */}
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#9A9A9A', 
          marginBottom: '16px',
          lineHeight: '1.4'
        }}>
          {t(`productItems.${product.nameKey}.shortDescription`)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#3E7C4A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <ShoppingCart style={{ width: '16px', height: '16px' }} />
{t('addToCart')}
        </button>
      </div>
    </div>
  );
}
