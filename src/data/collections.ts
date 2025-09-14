export interface Collection {
  id: string;
  name: string;
  description: string;
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
    id: '1',
    name: 'Web3 Essentials',
    description: 'Core pieces for the modern crypto enthusiast',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
    itemCount: 12,
    rating: 4.8,
    followers: 1250,
    createdAt: '2024-01-15',
    isFeatured: true,
    creator: 'Copoazú Labs'
  },
  {
    id: '2',
    name: 'DeFi Fashion',
    description: 'Decentralized fashion for the decentralized world',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&crop=center',
    itemCount: 8,
    rating: 4.7,
    followers: 890,
    createdAt: '2024-02-03',
    isFeatured: true,
    creator: 'Blockchain Boutique'
  },
  {
    id: '3',
    name: 'NFT Collectibles',
    description: 'Unique digital fashion pieces',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=300&fit=crop&crop=center',
    itemCount: 15,
    rating: 4.9,
    followers: 2100,
    createdAt: '2024-01-28',
    creator: 'Digital Fashion Co'
  },
  {
    id: '4',
    name: 'Crypto Streetwear',
    description: 'Urban style meets blockchain technology',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop&crop=center',
    itemCount: 20,
    rating: 4.6,
    followers: 1560,
    createdAt: '2024-02-10',
    creator: 'Street Crypto'
  },
  {
    id: '5',
    name: 'Metaverse Ready',
    description: 'Fashion for virtual worlds and real life',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&crop=center',
    itemCount: 11,
    rating: 4.8,
    followers: 980,
    createdAt: '2024-02-15',
    creator: 'Meta Fashion'
  },
  {
    id: '6',
    name: 'DAO Community',
    description: 'Clothing for decentralized communities',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&crop=center',
    itemCount: 7,
    rating: 4.5,
    followers: 720,
    createdAt: '2024-02-20',
    creator: 'Community DAO'
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
