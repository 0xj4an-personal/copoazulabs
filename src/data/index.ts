// Centralized data exports
export * from './products';
export * from './collections';

// Re-export commonly used functions for convenience
export { allProducts, getFeaturedProducts, getProductsByCategory, getProductById } from './products';
export { allCollections, getFeaturedCollections, getCollectionById, getCollectionsByCreator } from './collections';
