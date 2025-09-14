export interface Product {
  id: string;
  nameKey: string; // Key for translation
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  categoryKey: string; // Key for translation
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const allProducts: Product[] = [
  {
    id: '1',
    nameKey: 'web3Hoodie',
    price: 320000, // ~$80 USD at current exchange rate
    originalPrice: 400000, // ~$100 USD
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodies',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    nameKey: 'blockchainTShirt',
    price: 120000, // ~$30 USD
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirts',
    isNew: true
  },
  {
    id: '3',
    nameKey: 'cryptoCap',
    price: 100000, // ~$25 USD
    rating: 4.7,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'accessories',
    isBestSeller: true
  },
  {
    id: '4',
    nameKey: 'defiSweatshirt',
    price: 280000, // ~$70 USD
    originalPrice: 360000, // ~$90 USD
    rating: 4.9,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'sweatshirts',
    isNew: true
  },
  {
    id: '5',
    nameKey: 'nftHoodieCollection',
    price: 400000, // ~$100 USD
    originalPrice: 520000, // ~$130 USD
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodies',
    isBestSeller: true
  },
  {
    id: '6',
    nameKey: 'smartContractTShirt',
    price: 140000, // ~$35 USD
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirts',
    isNew: true
  },
  {
    id: '7',
    nameKey: 'metaverseCap',
    price: 112000, // ~$28 USD
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'accessories',
    isNew: true
  },
  {
    id: '8',
    nameKey: 'daoSweatshirt',
    price: 320000, // ~$80 USD
    originalPrice: 400000, // ~$100 USD
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'sweatshirts',
    isNew: true
  }
];

// Helper functions to get specific product subsets
export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isBestSeller || product.isNew).slice(0, 6);
};

export const getProductsByCategory = (categoryKey: string): Product[] => {
  return allProducts.filter(product => product.categoryKey === categoryKey);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};
