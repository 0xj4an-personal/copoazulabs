'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import { useVerification } from './VerificationContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'RESTORE_CART'; payload: { items: CartItem[]; totalItems: number; totalPrice: number } };

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
  discountedPrice: 0,
  discountPercentage: 0,
};

// Helper function to calculate totals with discount
const calculateTotals = (items: CartItem[], isVerified: boolean) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (isVerified) {
    const discountPercentage = 10;
    const discountedPrice = Math.round(totalPrice * (1 - discountPercentage / 100));
    return {
      totalItems,
      totalPrice,
      discountedPrice,
      discountPercentage
    };
  }
  
  return {
    totalItems,
    totalPrice,
    discountedPrice: totalPrice,
    discountPercentage: 0
  };
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        isOpen: true, // Auto-open cart when adding item
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    case 'RESTORE_CART':
      return {
        ...state,
        items: action.payload.items,
        totalItems: action.payload.totalItems,
        totalPrice: action.payload.totalPrice,
        isOpen: false, // Always start with cart closed when restoring
      };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  // Computed values with discount
  finalPrice: number;
  discountAmount: number;
  discountPercentage: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize state with localStorage data if available
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get verification status
  const verificationContext = useVerification();
  const isVerified = verificationContext?.isVerified || false;

  // Calculate computed values with discount
  const totals = calculateTotals(state.items, isVerified);
  const finalPrice = totals.discountedPrice;
  const discountAmount = totals.totalPrice - totals.discountedPrice;
  const discountPercentage = totals.discountPercentage;

  // Load cart from localStorage after component mounts to prevent hydration issues
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate the structure
          if (parsedCart && Array.isArray(parsedCart.items)) {
            // Dispatch a special action to restore cart state
            dispatch({
              type: 'RESTORE_CART',
              payload: {
                items: parsedCart.items,
                totalItems: parsedCart.totalItems || 0,
                totalPrice: parsedCart.totalPrice || 0,
              }
            });
          }
        }
      } catch (error) {
        console.warn('Failed to load cart from localStorage:', error);
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Recalculate totals when verification status changes
  useEffect(() => {
    if (isInitialized && state.items.length > 0) {
      const totals = calculateTotals(state.items, isVerified);
      // Update state with new totals
      dispatch({
        type: 'RESTORE_CART',
        payload: {
          items: state.items,
          totalItems: totals.totalItems,
          totalPrice: totals.totalPrice,
        }
      });
    }
  }, [isVerified, isInitialized, state.items]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
        }));
      } catch (error) {
        console.warn('Failed to save cart to localStorage:', error);
      }
    }
  }, [state.items, state.totalItems, state.totalPrice]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    // Also clear from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('cart');
      } catch (error) {
        console.warn('Failed to clear cart from localStorage:', error);
      }
    }
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        finalPrice,
        discountAmount,
        discountPercentage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
