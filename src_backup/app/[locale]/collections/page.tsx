'use client';

import { useState } from 'react';
import { Search, Grid, List, Star, Users, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { allCollections } from '@/data/collections';

// Use centralized collections data
const collections = allCollections;

export default function CollectionsPage() {
  const t = useTranslations('collections');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const handleCollectionClick = (collectionId: string) => {
    // Navigate to products page with collection filter
    router.push(`/products?collection=${collectionId}`);
  };

  // Helper function to get translated text for filtering
  const getTranslatedText = (collection: any) => {
    const name = t(`collectionItems.${collection.nameKey}.name`);
    const description = t(`collectionItems.${collection.descriptionKey}.description`);
    return `${name} ${description} ${collection.creator}`.toLowerCase();
  };

  // Filter and sort collections
  const filteredCollections = collections
    .filter(collection => {
      const translatedText = getTranslatedText(collection);
      const matchesSearch = translatedText.includes(searchQuery.toLowerCase());
      const matchesFeatured = !showFeaturedOnly || collection.isFeatured;
      return matchesSearch && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.followers - a.followers;
        case 'rating':
          return b.rating - a.rating;
        case 'items':
          return b.itemCount - a.itemCount;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-3 transition-colors duration-200">
            {t('title')}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-200">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg mb-6 transition-colors duration-200">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-12 pr-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 text-[#1C1C1C] dark:text-[#F5F1E7] placeholder-gray-500 dark:placeholder-gray-400 focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400 text-sm">{t('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1.5 px-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-xs text-[#1C1C1C] dark:text-[#F5F1E7] focus:border-[#3E7C4A] focus:outline-none transition-colors duration-200"
                >
                  <option value="newest">{t('newest')}</option>
                  <option value="popular">{t('mostPopular')}</option>
                  <option value="rating">{t('highestRated')}</option>
                  <option value="items">{t('mostItems')}</option>
                </select>
              </div>

              {/* Featured Only Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="m-0"
                />
                <span className="text-xs text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">{t('featuredOnly')}</span>
              </label>

              {/* View Mode Toggle */}
              <div className="flex gap-1 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'border-[#3E7C4A] bg-[#3E7C4A] text-white' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'border-[#3E7C4A] bg-[#3E7C4A] text-white' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Grid/List */}
        {filteredCollections.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-2 transition-colors duration-200">
              {t('noCollectionsFound')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-200">
              {t('tryAdjustingFilters')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowFeaturedOnly(false);
                setSortBy('newest');
              }}
              className="py-2.5 px-5 bg-[#3E7C4A] text-white border-none rounded-xl cursor-pointer text-xs font-semibold hover:bg-[#2d5f3a] transition-all duration-200"
            >
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleCollectionClick(collection.id)}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Collection Image */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={collection.image}
                    alt={t(`collectionItems.${collection.nameKey}.name`)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      // Fallback to a simple colored div if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #F5F1E7 0%, #E5E5E5 100%); display: flex; align-items: center; justify-content: center; color: #9A9A9A; font-family: Arial, sans-serif;">
                            <div style="text-align: center;">
                              <div style="font-size: 18px; margin-bottom: 8px;">Collection Image</div>
                              <div style="font-size: 14px;">Coming Soon</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                  {collection.isFeatured && (
                    <div className="absolute top-3 right-3 bg-[#3E7C4A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {t('featuredOnly')}
                    </div>
                  )}
                </div>

                {/* Collection Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] m-0 transition-colors duration-200">
                      {t(`collectionItems.${collection.nameKey}.name`)}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {collection.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed transition-colors duration-200">
                    {t(`collectionItems.${collection.descriptionKey}.description`)}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {collection.itemCount} {t('items')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {collection.followers} {t('followers')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {formatDate(collection.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      {t('createdBy')} {collection.creator}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollectionClick(collection.id);
                      }}
                      className="py-1.5 px-3 bg-[#3E7C4A] text-white border-none rounded-lg cursor-pointer text-xs font-semibold hover:bg-[#2d5f3a] transition-all duration-200"
                    >
                      {t('viewCollection')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}