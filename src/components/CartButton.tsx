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
      className="relative flex items-center justify-center p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-brand-light/20 dark:hover:bg-brand-neutral/20 active:bg-brand-light/30 dark:active:bg-brand-neutral/30 touch-manipulation"
      style={{ ...style, minWidth: '44px', minHeight: '44px' }}
      aria-label={`Shopping cart with ${state.totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5 text-brand-dark dark:text-brand-background" />
      {state.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[20px]">
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </span>
      )}
    </button>
  );
}
