'use client';

import { useState, useEffect } from 'react';
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
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // Update products when initial props change
  useEffect(() => {
    setFilteredProducts(initialProducts);
    setSelectedCollection(initialCollection);
    setSelectedCategory(initialCategory);
    setSearchQuery(initialSearch);
  }, [initialProducts, initialCollection, initialCategory, initialSearch]);

  // Handle filter changes
  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId);
    // When changing collection, preserve other filters
    updateURL({ collection: collectionId });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateURL({ search: query });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const updateURL = (params: { collection?: string; category?: string; search?: string }) => {
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
  };

  const clearFilters = () => {
    setSelectedCollection('');
    setSelectedCategory('');
    setSearchQuery('');
    router.push('/products');
  };

  return (
    <>
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 transition-colors duration-200">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full py-3 pl-12 pr-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-base bg-white dark:bg-gray-700 text-[#1C1C1C] dark:text-[#F5F1E7] placeholder-gray-500 dark:placeholder-gray-400 focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Collection Filter */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t('collections')}:</span>
              <select
                value={selectedCollection}
                onChange={(e) => handleCollectionChange(e.target.value)}
                className="py-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-[#1C1C1C] dark:text-[#F5F1E7] focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
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
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t('category')}:</span>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="py-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-[#1C1C1C] dark:text-[#F5F1E7] focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
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
              <span className="text-gray-500 dark:text-gray-400 text-sm">{t('sortBy')}:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="py-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-[#1C1C1C] dark:text-[#F5F1E7] focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
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
                className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium transition-all duration-200"
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
                    ? 'border-[#3E7C4A] bg-[#3E7C4A] text-white' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'border-[#3E7C4A] bg-[#3E7C4A] text-white' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl text-center shadow-lg transition-colors duration-200">
          <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-2 transition-colors duration-200">
            {t('noProductsFound')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200">
            {t('tryAdjustingFilters')}
          </p>
          <button
            onClick={clearFilters}
            className="py-3 px-6 bg-[#3E7C4A] text-white border-none rounded-xl cursor-pointer text-sm font-semibold hover:bg-[#2d5f3a] transition-all duration-200"
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
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-gray-600 dark:text-gray-400 transition-colors duration-200">
        <p>
          {t('showingResults', { 
            count: filteredProducts.length,
            total: filteredProducts.length 
          })}
        </p>
      </div>
    </>
  );
}
