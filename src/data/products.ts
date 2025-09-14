export interface Product {
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

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Web3 Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    category: 'Hoodies',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Blockchain T-Shirt',
    price: 29.99,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '3',
    name: 'Crypto Cap',
    price: 24.99,
    rating: 4.7,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    category: 'Accessories',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'DeFi Sweatshirt',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center',
    category: 'Sweatshirts',
    isNew: true
  },
  {
    id: '5',
    name: 'NFT Hoodie Collection',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    category: 'Hoodies',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Smart Contract T-Shirt',
    price: 34.99,
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '7',
    name: 'Metaverse Cap',
    price: 27.99,
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    category: 'Accessories',
    isNew: true
  },
  {
    id: '8',
    name: 'DAO Sweatshirt',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center',
    category: 'Sweatshirts',
    isNew: true
  }
];

// Helper functions to get specific product subsets
export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isBestSeller || product.isNew).slice(0, 6);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};
