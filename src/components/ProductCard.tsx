'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
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
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#F5F1E7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#3E7C4A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF' }}>
              {product.name.charAt(0)}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9A9A9A', margin: 0 }}>{product.category}</p>
        </div>

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
              New
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
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>{product.category}</span>
        </div>
        
        <h3 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '600', 
          color: '#1C1C1C', 
          marginBottom: '8px',
          lineHeight: '1.4'
        }}>
          {product.name}
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
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ 
              fontSize: '1rem', 
              color: '#9A9A9A', 
              textDecoration: 'line-through' 
            }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

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
          Add to Cart
        </button>
      </div>
    </div>
  );
}
