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
      className="relative flex items-center justify-center p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      style={style}
      aria-label={`Shopping cart with ${state.totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {state.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[20px]">
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </span>
      )}
    </button>
  );
}
