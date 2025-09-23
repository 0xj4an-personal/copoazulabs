'use client';

import { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { allCollections } from '@/data/collections';

// Use centralized collections data
const collections = allCollections;

export default function CollectionsPage() {
  const t = useTranslations('collections');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('items');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCollectionClick = (collectionId: string) => {
    // Navigate to products page with collection filter
    router.push(`/products?collection=${collectionId}`);
  };

  // Helper function to get translated text for filtering
  const getTranslatedText = (collection: any) => {
    const name = t(`collectionItems.${collection.nameKey}.name`);
    const description = t(`collectionItems.${collection.descriptionKey}.description`);
    return `${name} ${description}`.toLowerCase();
  };

  // Filter and sort collections
  const filteredCollections = collections
    .filter(collection => {
      const translatedText = getTranslatedText(collection);
      const matchesSearch = translatedText.includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'items':
          return b.itemCount - a.itemCount;
        case 'newest':
        default:
          return 0; // No sorting since we removed createdAt
      }
    });


  return (
    <div className="min-h-screen bg-brand-background dark:bg-brand-dark py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-brand-dark dark:text-brand-background mb-3 transition-colors duration-200">
            {t('title')}
          </h1>
          <p className="text-base text-brand-neutral dark:text-brand-neutral mb-6 transition-colors duration-200">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-brand-white dark:bg-dark-surface p-5 rounded-2xl shadow-lg mb-6 transition-colors duration-200">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-neutral dark:text-brand-neutral" size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-12 pr-4 border-2 border-brand-neutral dark:border-brand-neutral rounded-xl text-sm bg-brand-white dark:bg-dark-surface text-brand-dark dark:text-brand-background placeholder-brand-neutral dark:placeholder-brand-neutral focus:border-brand-primary focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-brand-neutral dark:text-brand-neutral text-sm">{t('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-1.5 px-2.5 border-2 border-brand-neutral dark:border-brand-neutral rounded-lg bg-brand-white dark:bg-dark-surface text-xs text-brand-dark dark:text-brand-background focus:border-brand-primary focus:outline-none transition-colors duration-200"
                >
                  <option value="items">{t('mostItems')}</option>
                </select>
              </div>


              {/* View Mode Toggle */}
              <div className="flex gap-1 ml-auto">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'border-brand-primary bg-brand-primary text-white' 
                      : 'border-brand-neutral dark:border-brand-neutral bg-brand-white dark:bg-dark-surface text-brand-neutral dark:text-brand-neutral'
                  }`}
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'border-brand-primary bg-brand-primary text-white' 
                      : 'border-brand-neutral dark:border-brand-neutral bg-brand-white dark:bg-dark-surface text-brand-neutral dark:text-brand-neutral'
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
          <div className="bg-brand-white dark:bg-dark-surface p-8 rounded-2xl text-center shadow-lg transition-colors duration-200">
            <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-background mb-2 transition-colors duration-200">
              {t('noCollectionsFound')}
            </h3>
            <p className="text-brand-neutral dark:text-brand-neutral mb-3 transition-colors duration-200">
              {t('tryAdjustingFilters')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSortBy('items');
              }}
              className="py-2.5 px-5 bg-brand-primary text-white border-none rounded-xl cursor-pointer text-xs font-semibold hover:bg-brand-accent transition-all duration-200"
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
                className="bg-brand-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg transition-all duration-200 cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-xl"
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
                          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--brand-background) 0%, var(--brand-neutral) 100%); display: flex; align-items: center; justify-content: center; color: var(--brand-neutral); font-family: Arial, sans-serif;">
                            <div style="text-align: center;">
                              <div style="font-size: 18px; margin-bottom: 8px;">Collection Image</div>
                              <div style="font-size: 14px;">Coming Soon</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                {/* Collection Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-background m-0 transition-colors duration-200">
                      {t(`collectionItems.${collection.nameKey}.name`)}
                    </h3>
                  </div>

                  <p className="text-brand-neutral dark:text-brand-neutral text-xs mb-3 leading-relaxed transition-colors duration-200">
                    {t(`collectionItems.${collection.descriptionKey}.description`)}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-brand-neutral dark:text-brand-neutral transition-colors duration-200">
                        {collection.itemCount} {t('items')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollectionClick(collection.id);
                      }}
                      className="py-1.5 px-3 bg-brand-primary text-white border-none rounded-lg cursor-pointer text-xs font-semibold hover:bg-brand-accent transition-all duration-200"
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