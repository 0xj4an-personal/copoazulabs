export interface Collection {
  id: string;
  nameKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  image: string;
  itemCount: number;
  rating: number;
  followers: number;
  createdAt: string;
  isFeatured?: boolean;
  creator: string;
}

export const allCollections: Collection[] = [
  {
    id: '2',
    nameKey: 'refiCollection',
    descriptionKey: 'refiCollection',
    image: '/assets/refi.jpeg',
    itemCount: 12,
    rating: 4.8,
    followers: 1890,
    createdAt: '2024-02-03',
    isFeatured: true,
    creator: 'Regenerative Finance'
  },
  {
    id: '3',
    nameKey: 'defiCollection',
    descriptionKey: 'defiCollection',
    image: '/assets/defi.jpeg',
    itemCount: 15,
    rating: 4.7,
    followers: 2100,
    createdAt: '2024-01-28',
    creator: 'DeFi Protocol'
  },
  {
    id: '4',
    nameKey: 'governanceCollection',
    descriptionKey: 'governanceCollection',
    image: '/assets/governance.jpeg',
    itemCount: 9,
    rating: 4.6,
    followers: 1560,
    createdAt: '2024-02-10',
    creator: 'Governance DAO'
  },
  {
    id: '5',
    nameKey: 'codingCollection',
    descriptionKey: 'codingCollection',
    image: '/assets/code.jpeg',
    itemCount: 14,
    rating: 4.8,
    followers: 3200,
    createdAt: '2024-02-15',
    creator: 'Developer Guild'
  },
  {
    id: '6',
    nameKey: 'degenCollection',
    descriptionKey: 'degenCollection',
    image: '/assets/degen.jpeg',
    itemCount: 22,
    rating: 4.5,
    followers: 4200,
    createdAt: '2024-02-20',
    creator: 'Degen Army'
  }
];

// Helper functions to get specific collection subsets
export const getFeaturedCollections = (): Collection[] => {
  return allCollections.filter(collection => collection.isFeatured);
};

export const getCollectionById = (id: string): Collection | undefined => {
  return allCollections.find(collection => collection.id === id);
};

export const getCollectionsByCreator = (creator: string): Collection[] => {
  return allCollections.filter(collection => collection.creator === creator);
};
