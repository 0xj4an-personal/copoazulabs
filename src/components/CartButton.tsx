'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  className?: string;
}

export default function CartButton({ className = '' }: CartButtonProps) {
  const { state, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className={`relative flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-gray-100 ${className}`}
      aria-label={`Shopping cart with ${state.totalItems} items`}
    >
      <ShoppingCart className="w-5 h-5 text-gray-700" />
      {state.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </span>
      )}
    </button>
  );
}
