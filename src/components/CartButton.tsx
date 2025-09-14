'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  style?: React.CSSProperties;
}

export default function CartButton({ style = {} }: CartButtonProps) {
  const { state, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      aria-label={`Shopping cart with ${state.totalItems} items`}
    >
      <ShoppingCart 
        style={{ 
          width: '20px', 
          height: '20px', 
          color: '#374151' 
        }} 
      />
      {state.totalItems > 0 && (
        <span 
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: '#3E7C4A',
            color: '#FFFFFF',
            fontSize: '12px',
            borderRadius: '50%',
            height: '20px',
            width: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '500',
            minWidth: '20px'
          }}
        >
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </span>
      )}
    </button>
  );
}
