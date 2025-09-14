'use client';

import { useState } from 'react';
import { Search, Grid, List, Star, Users, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { allCollections } from '@/data/collections';

// Use centralized collections data
const collections = allCollections;

export default function CollectionsPage() {
  const t = useTranslations('collections');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

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
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E7', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#9A9A9A', marginBottom: '32px' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9A9A9A' }} size={20} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 48px',
                  border: '2px solid #E5E5E5',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            {/* Filters Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#9A9A9A', fontSize: '0.875rem' }}>{t('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    border: '2px solid #E5E5E5',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="newest">{t('newest')}</option>
                  <option value="popular">{t('mostPopular')}</option>
                  <option value="rating">{t('highestRated')}</option>
                  <option value="items">{t('mostItems')}</option>
                </select>
              </div>

              {/* Featured Only Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  style={{ margin: 0 }}
                />
                <span style={{ fontSize: '0.875rem', color: '#1C1C1C' }}>{t('featuredOnly')}</span>
              </label>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px',
                    border: viewMode === 'grid' ? '2px solid #22C55E' : '2px solid #E5E5E5',
                    borderRadius: '8px',
                    backgroundColor: viewMode === 'grid' ? '#22C55E' : '#FFFFFF',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#9A9A9A',
                    cursor: 'pointer'
                  }}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px',
                    border: viewMode === 'list' ? '2px solid #22C55E' : '2px solid #E5E5E5',
                    borderRadius: '8px',
                    backgroundColor: viewMode === 'list' ? '#22C55E' : '#FFFFFF',
                    color: viewMode === 'list' ? '#FFFFFF' : '#9A9A9A',
                    cursor: 'pointer'
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Grid/List */}
        {filteredCollections.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '48px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '8px' }}>
              {t('noCollectionsFound')}
            </h3>
            <p style={{ color: '#9A9A9A', marginBottom: '16px' }}>
              {t('tryAdjustingFilters')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowFeaturedOnly(false);
                setSortBy('newest');
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#22C55E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
            gap: '24px'
          }}>
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Collection Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
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
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: '#22C55E',
                      color: '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {t('featuredOnly')}
                    </div>
                  )}
                </div>

                {/* Collection Info */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', margin: 0 }}>
                      {t(`collectionItems.${collection.nameKey}.name`)}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} style={{ color: '#FFD700', fill: '#FFD700' }} />
                      <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>
                        {collection.rating}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: '#9A9A9A', fontSize: '0.875rem', marginBottom: '16px', lineHeight: '1.5' }}>
                    {t(`collectionItems.${collection.descriptionKey}.description`)}
                  </p>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9A9A9A' }}>
                        {collection.itemCount} {t('items')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} style={{ color: '#9A9A9A' }} />
                      <span style={{ fontSize: '0.75rem', color: '#9A9A9A' }}>
                        {collection.followers} {t('followers')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} style={{ color: '#9A9A9A' }} />
                      <span style={{ fontSize: '0.75rem', color: '#9A9A9A' }}>
                        {formatDate(collection.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Creator */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9A9A9A' }}>
                      {t('createdBy')} {collection.creator}
                    </span>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#22C55E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
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