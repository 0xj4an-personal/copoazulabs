export interface Product {
  id: string;
  nameKey: string; // Key for translation
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  categoryKey: string; // Key for translation (cap, tshirt, hoodie)
  collectionId: string; // ID of the collection
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const allProducts: Product[] = [
  // Gaming Collection
  {
    id: '1',
    nameKey: 'gamingCap',
    price: 100000,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '1',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    nameKey: 'gamingTShirt',
    price: 120000,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '1',
    isNew: true
  },
  {
    id: '3',
    nameKey: 'gamingHoodie',
    price: 320000,
    originalPrice: 400000,
    rating: 4.9,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '1',
    isBestSeller: true
  },

  // ReFi Collection
  {
    id: '4',
    nameKey: 'refiCap',
    price: 112000,
    rating: 4.7,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '2',
    isBestSeller: true
  },
  {
    id: '5',
    nameKey: 'refiTShirt',
    price: 140000,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '2',
    isNew: true
  },
  {
    id: '6',
    nameKey: 'refiHoodie',
    price: 280000,
    originalPrice: 360000,
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '2',
    isNew: true
  },

  // DeFi Collection
  {
    id: '7',
    nameKey: 'defiCap',
    price: 108000,
    rating: 4.6,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '3',
    isNew: true
  },
  {
    id: '8',
    nameKey: 'defiTShirt',
    price: 132000,
    rating: 4.7,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '3',
    isNew: true
  },
  {
    id: '9',
    nameKey: 'defiHoodie',
    price: 340000,
    originalPrice: 420000,
    rating: 4.8,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '3',
    isBestSeller: true
  },

  // Governance Collection
  {
    id: '10',
    nameKey: 'governanceCap',
    price: 104000,
    rating: 4.5,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '4',
    isBestSeller: true
  },
  {
    id: '11',
    nameKey: 'governanceTShirt',
    price: 128000,
    rating: 4.6,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '4',
    isNew: true
  },
  {
    id: '12',
    nameKey: 'governanceHoodie',
    price: 300000,
    originalPrice: 380000,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '4',
    isNew: true
  },

  // Coding Collection
  {
    id: '13',
    nameKey: 'codingCap',
    price: 116000,
    rating: 4.9,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '5',
    isNew: true
  },
  {
    id: '14',
    nameKey: 'codingTShirt',
    price: 136000,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '5',
    isBestSeller: true
  },
  {
    id: '15',
    nameKey: 'codingHoodie',
    price: 360000,
    originalPrice: 440000,
    rating: 4.9,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '5',
    isBestSeller: true
  },

  // Degen Collection
  {
    id: '16',
    nameKey: 'degenCap',
    price: 96000,
    rating: 4.4,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'cap',
    collectionId: '6',
    isNew: true
  },
  {
    id: '17',
    nameKey: 'degenTShirt',
    price: 124000,
    rating: 4.5,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'tshirt',
    collectionId: '6',
    isNew: true
  },
  {
    id: '18',
    nameKey: 'degenHoodie',
    price: 280000,
    originalPrice: 360000,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
    categoryKey: 'hoodie',
    collectionId: '6',
    isBestSeller: true
  }
];

// Helper functions to get specific product subsets
export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.isBestSeller || product.isNew).slice(0, 6);
};

export const getProductsByCategory = (categoryKey: string): Product[] => {
  return allProducts.filter(product => product.categoryKey === categoryKey);
};

export const getProductsByCollection = (collectionId: string): Product[] => {
  return allProducts.filter(product => product.collectionId === collectionId);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getCollections = (): string[] => {
  return Array.from(new Set(allProducts.map(product => product.collectionId)));
};

export const getCategories = (): string[] => {
  return Array.from(new Set(allProducts.map(product => product.categoryKey)));
};
