export interface Collection {
  id: string;
  nameKey: string; // Key for translation
  descriptionKey: string; // Key for translation
  image: string;
  itemCount: number;
}

export const allCollections: Collection[] = [
  {
    id: '2',
    nameKey: 'refiCollection',
    descriptionKey: 'refiCollection',
    image: '/assets/collections/refi.jpeg',
    itemCount: 1
  },
  {
    id: '3',
    nameKey: 'defiCollection',
    descriptionKey: 'defiCollection',
    image: '/assets/collections/defi.jpeg',
    itemCount: 1
  },
  {
    id: '4',
    nameKey: 'governanceCollection',
    descriptionKey: 'governanceCollection',
    image: '/assets/collections/governance.jpeg',
    itemCount: 1
  },
  {
    id: '5',
    nameKey: 'codingCollection',
    descriptionKey: 'codingCollection',
    image: '/assets/collections/code.jpeg',
    itemCount: 1
  },
  {
    id: '6',
    nameKey: 'degenCollection',
    descriptionKey: 'degenCollection',
    image: '/assets/collections/degen.jpeg',
    itemCount: 1
  }
];

// Helper functions to get specific collection subsets
export const getFeaturedCollections = (): Collection[] => {
  return allCollections; // Return all collections since we removed isFeatured
};

export const getCollectionById = (id: string): Collection | undefined => {
  return allCollections.find(collection => collection.id === id);
};

export const getCollectionsByCreator = (creator: string): Collection[] => {
  return allCollections; // Return all collections since we removed creator
};
