export interface Product {
  id: string;
  nameKey: string;
  categoryKey: string;
  collectionId: string;
  price: number;
  originalPrice?: number;
  image: string;
  availableSizes: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  showActions?: boolean;
  variant?: 'grid' | 'list';
}

export interface ProductPageProps {
  product: Product;
  relatedProducts?: Product[];
}