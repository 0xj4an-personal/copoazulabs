'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/data/products';
import { Collection } from '@/data/collections';

interface ProductsClientProps {
  initialProducts: Product[];
  initialCollection: string;
  initialCategory: string;
  initialSearch: string;
  collections: Collection[];
  categories: string[];
}

export default function ProductsClient({
  initialProducts,
  initialCollection,
  initialCategory,
  initialSearch,
  collections,
  categories
}: ProductsClientProps) {
  const t = useTranslations('products');
  const tCollections = useTranslations('collections');
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Update state when initial props change
  useEffect(() => {
    setSelectedCollection(initialCollection);
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialProducts, initialCollection, initialCategory, initialSearch]);

  // Memoized filtered and sorted products
  const processedProducts = useMemo(() => {
    let filtered = initialProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.collection.toLowerCase().includes(query)
      );
    }

    // Filter by collection
    if (selectedCollection) {
      filtered = filtered.filter(product => product.collection === selectedCollection);
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return 0; // Keep original order for newest
      }
    });

    return sorted;
  }, [initialProducts, searchQuery, selectedCollection, selectedCategory, sortBy]);

  // Optimized handlers with useCallback
  const handleCollectionChange = useCallback((collectionId: string) => {
    setSelectedCollection(collectionId);
    // When changing collection, preserve other filters
    updateURL({ collection: collectionId });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    updateURL({ category });
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    updateURL({ search: query });
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const updateURL = useCallback((params: { collection?: string; category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();

    // Preserve existing parameters and update only the specified ones
    const newCollection = params.collection !== undefined ? params.collection : selectedCollection;
    const newCategory = params.category !== undefined ? params.category : selectedCategory;
    const newSearch = params.search !== undefined ? params.search : searchQuery;

    if (newCollection) searchParams.set('collection', newCollection);
    if (newCategory) searchParams.set('category', newCategory);
    if (newSearch) searchParams.set('search', newSearch);

    const newURL = searchParams.toString()
      ? `/products?${searchParams.toString()}`
      : '/products';

    router.push(newURL);
  }, [selectedCollection, selectedCategory, searchQuery, router]);

  const clearFilters = useCallback(() => {
    setSelectedCollection('');
    setSelectedCategory('');
    setSearchQuery('');
    router.push('/products');
  }, [router]);

  return (
    <>
      {/* Filters and Search */}
      <div className="bg-brand-white dark:bg-dark-surface p-6 rounded-2xl shadow-lg mb-8 transition-colors duration-200">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-neutral dark:text-brand-neutral" size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full py-3 pl-12 pr-4 border-2 border-brand-neutral dark:border-brand-neutral rounded-xl text-base bg-brand-white dark:bg-dark-surface text-brand-dark dark:text-brand-background placeholder-brand-neutral dark:placeholder-brand-neutral focus:border-brand-primary focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Collection Filter */}
            <div className="flex items-center gap-2">
              <span className="text-brand-neutral dark:text-brand-neutral text-sm">{t('collections')}:</span>
              <select
                value={selectedCollection}
                onChange={(e) => handleCollectionChange(e.target.value)}
                className="py-2 px-3 border-2 border-brand-neutral dark:border-brand-neutral rounded-lg bg-brand-white dark:bg-dark-surface text-sm text-brand-dark dark:text-brand-background focus:border-brand-primary focus:outline-none transition-colors duration-200"
              >
                <option value="">{t('allCollections')}</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {tCollections(`collectionItems.${collection.nameKey}.name`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-brand-neutral dark:text-brand-neutral text-sm">{t('category')}:</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="py-2 px-3 border-2 border-brand-neutral dark:border-brand-neutral rounded-lg bg-brand-white dark:bg-dark-surface text-sm text-brand-dark dark:text-brand-background focus:border-brand-primary focus:outline-none transition-colors duration-200"
              >
                <option value="">{t('allCategories')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`categories.${category}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-brand-neutral dark:text-brand-neutral text-sm">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="py-2 px-3 border-2 border-brand-neutral dark:border-brand-neutral rounded-lg bg-brand-white dark:bg-dark-surface text-sm text-brand-dark dark:text-brand-background focus:border-brand-primary focus:outline-none transition-colors duration-200"
              >
                <option value="newest">{t('newest')}</option>
                <option value="price-low">{t('priceLowToHigh')}</option>
                <option value="price-high">{t('priceHighToLow')}</option>
                <option value="rating">{t('highestRated')}</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(selectedCollection || selectedCategory || searchQuery) && (
              <button
                onClick={clearFilters}
                className="py-2 px-4 bg-brand-neutral hover:bg-brand-primary text-white border-none rounded-lg cursor-pointer text-sm font-medium transition-all duration-200"
              >
                {t('clearFilters')}
              </button>
            )}

            {/* View Mode Toggle */}
            <div className="flex gap-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'border-brand-primary bg-brand-primary text-white' 
                    : 'border-brand-neutral dark:border-brand-neutral bg-brand-white dark:bg-dark-surface text-brand-neutral dark:text-brand-neutral'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'border-brand-primary bg-brand-primary text-white' 
                    : 'border-brand-neutral dark:border-brand-neutral bg-brand-white dark:bg-dark-surface text-brand-neutral dark:text-brand-neutral'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {processedProducts.length === 0 ? (
        <div className="bg-brand-white dark:bg-dark-surface p-12 rounded-2xl text-center shadow-lg transition-colors duration-200">
          <h3 className="text-xl font-semibold text-brand-dark dark:text-brand-background mb-2 transition-colors duration-200">
            {t('noProductsFound')}
          </h3>
          <p className="text-brand-neutral dark:text-brand-neutral mb-4 transition-colors duration-200">
            {t('tryAdjustingFilters')}
          </p>
          <button
            onClick={clearFilters}
            className="py-3 px-6 bg-brand-primary text-white border-none rounded-xl cursor-pointer text-sm font-semibold hover:bg-brand-accent transition-all duration-200"
          >
            {t('clearFilters')}
          </button>
        </div>
      ) : (
        <div className={`grid gap-8 mb-12 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-brand-neutral dark:text-brand-neutral transition-colors duration-200">
        <p>
          {t('showingResults', {
            count: processedProducts.length,
            total: initialProducts.length
          })}
        </p>
      </div>
    </>
  );
}
