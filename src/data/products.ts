export interface Product {
  id: string;
  nameKey: string; // Key for translation
  price: number;
  originalPrice?: number;
  image: string;
  categoryKey: string; // Key for translation (cap, tshirt, hoodie)
  collectionId: string; // ID of the collection
  availableSizes: string[]; // Available sizes (S, M, L)
}

export const allProducts: Product[] = [
  // ReFi Collection
  {
    id: '1',
    nameKey: 'refiHoodie',
    price: 320000,
    originalPrice: 400000,
    image: '/assets/products/hoodie-refi.jpeg',
    categoryKey: 'hoodie',
    collectionId: '2',
    availableSizes: ['S', 'M', 'L']
  },

  // DeFi Collection
  {
    id: '2',
    nameKey: 'defiHoodie',
    price: 350000,
    originalPrice: 450000,
    image: '/assets/products/hoodie-defi.jpeg',
    categoryKey: 'hoodie',
    collectionId: '3',
    availableSizes: ['S', 'M', 'L']
  },

  // Governance Collection
  {
    id: '3',
    nameKey: 'governanceHoodie',
    price: 330000,
    originalPrice: 410000,
    image: '/assets/products/hoodie-governance.jpeg',
    categoryKey: 'hoodie',
    collectionId: '4',
    availableSizes: ['S', 'M', 'L']
  },

  // Coding Collection
  {
    id: '4',
    nameKey: 'codingHoodie',
    price: 370000,
    originalPrice: 460000,
    image: '/assets/products/hoodie-code.jpeg',
    categoryKey: 'hoodie',
    collectionId: '5',
    availableSizes: ['S', 'M', 'L']
  },

  // Degen Collection
  {
    id: '5',
    nameKey: 'degenHoodie',
    price: 310000,
    originalPrice: 390000,
    image: '/assets/products/hoodie-degen.jpeg',
    categoryKey: 'hoodie',
    collectionId: '6',
    availableSizes: ['S', 'M', 'L']
  }
];

// Helper functions to get specific product subsets
export const getFeaturedProducts = (): Product[] => {
  return allProducts.slice(0, 6);
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
