'use client';

import { useState } from 'react';
import { Search, Filter, Grid, List, Plus, Star, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

// Sample collections data
const collections = [
  {
    id: '1',
    name: 'Web3 Essentials',
    description: 'Core pieces for the modern crypto enthusiast',
    image: '/collections/essentials.jpg',
    itemCount: 12,
    rating: 4.8,
    followers: 1250,
    createdAt: '2024-01-15',
    isFeatured: true,
    creator: 'Copoazú Labs'
  },
  {
    id: '2',
    name: 'DeFi Collection',
    description: 'Decentralized finance inspired designs',
    image: '/collections/defi.jpg',
    itemCount: 8,
    rating: 4.6,
    followers: 890,
    createdAt: '2024-02-01',
    isFeatured: true,
    creator: 'DeFi Designer'
  },
  {
    id: '3',
    name: 'NFT Artists',
    description: 'Collaboration with top NFT creators',
    image: '/collections/nft-artists.jpg',
    itemCount: 15,
    rating: 4.9,
    followers: 2100,
    createdAt: '2024-01-20',
    isFeatured: false,
    creator: 'NFT Collective'
  },
  {
    id: '4',
    name: 'Metaverse Ready',
    description: 'Fashion for virtual worlds',
    image: '/collections/metaverse.jpg',
    itemCount: 6,
    rating: 4.4,
    followers: 650,
    createdAt: '2024-02-10',
    isFeatured: false,
    creator: 'Meta Fashion'
  },
  {
    id: '5',
    name: 'Crypto Winter',
    description: 'Cozy pieces for the bear market',
    image: '/collections/crypto-winter.jpg',
    itemCount: 10,
    rating: 4.7,
    followers: 980,
    createdAt: '2024-01-25',
    isFeatured: true,
    creator: 'Winter Crypto'
  },
  {
    id: '6',
    name: 'DAO Governance',
    description: 'Official DAO merchandise and apparel',
    image: '/collections/dao.jpg',
    itemCount: 7,
    rating: 4.5,
    followers: 750,
    createdAt: '2024-02-05',
    isFeatured: false,
    creator: 'DAO Council'
  }
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'items', label: 'Most Items' }
];

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter and sort collections
  const filteredCollections = collections
    .filter(collection => {
      const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           collection.creator.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div style={{ minHeight: '100vh', backgroundColor: 'rgba(245, 241, 231, 0.3)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1C1C1C',
            marginBottom: '16px'
          }}>
            Collections
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#9A9A9A',
            maxWidth: '600px'
          }}>
            Discover curated collections of Web3 merchandise from top creators
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
            {/* Search */}
            <div style={{ flex: 1 }}>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9A9A9A'
                }} />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 48px',
                    border: '2px solid #9A9A9A',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                />
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="sm:flex-row">
              {/* Sort Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#1C1C1C' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #9A9A9A',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Featured Filter */}
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1C1C1C' }}>
                    Featured Only
                  </span>
                </label>
              </div>

              {/* View Mode Toggle */}
              <div style={{ display: 'flex', alignItems: 'end', gap: '8px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '12px',
                    backgroundColor: viewMode === 'grid' ? '#3E7C4A' : '#F5F1E7',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#1C1C1C',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Grid style={{ width: '20px', height: '20px' }} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '12px',
                    backgroundColor: viewMode === 'list' ? '#3E7C4A' : '#F5F1E7',
                    color: viewMode === 'list' ? '#FFFFFF' : '#1C1C1C',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <List style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ color: '#9A9A9A', margin: 0 }}>
            Showing {filteredCollections.length} collections
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#9A9A9A' }}>
            <Filter style={{ width: '16px', height: '16px' }} />
            <span>Filters applied</span>
          </div>
        </div>

        {/* Collections Grid */}
        <div style={{
          display: 'grid',
          gap: '32px',
          gridTemplateColumns: viewMode === 'grid'
            ? 'repeat(auto-fit, minmax(300px, 1fr))'
            : '1fr'
        }}>
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {/* Collection Image */}
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#F5F1E7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-22.091-17.909-40-40-40v80c22.091 0 40-17.909 40-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#3E7C4A',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Star style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9A9A9A', margin: 0 }}>
                      {collection.itemCount} items
                    </p>
                  </div>
                </div>

                {/* Featured Badge */}
                {collection.isFeatured && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#E6B450',
                    color: '#1C1C1C',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    Featured
                  </div>
                )}
              </div>

              {/* Collection Info */}
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1C1C1C',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>
                    {collection.name}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#9A9A9A',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>
                    {collection.description}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star style={{ width: '16px', height: '16px', color: '#E6B450', fill: '#E6B450' }} />
                    <span style={{ fontSize: '0.875rem', color: '#1C1C1C', fontWeight: '500' }}>
                      {collection.rating}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users style={{ width: '16px', height: '16px', color: '#9A9A9A' }} />
                    <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>
                      {collection.followers.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar style={{ width: '16px', height: '16px', color: '#9A9A9A' }} />
                    <span style={{ fontSize: '0.875rem', color: '#9A9A9A' }}>
                      {formatDate(collection.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Creator */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#9A9A9A', margin: '0 0 4px 0' }}>
                    Created by
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#1C1C1C', fontWeight: '500', margin: 0 }}>
                    {collection.creator}
                  </p>
                </div>

                {/* View Collection Button */}
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#3E7C4A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem'
                }}>
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCollections.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '64px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <Search style={{ width: '64px', height: '64px', color: '#9A9A9A', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '8px' }}>
              No collections found
            </h3>
            <p style={{ color: '#9A9A9A', marginBottom: '24px' }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setShowFeaturedOnly(false);
                setSortBy('newest');
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3E7C4A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Create Collection CTA */}
        <div style={{
          textAlign: 'center',
          marginTop: '64px',
          padding: '48px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#3E7C4A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Plus style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1C1C1C',
            marginBottom: '12px'
          }}>
            Create Your Collection
          </h3>
          <p style={{
            color: '#9A9A9A',
            marginBottom: '24px',
            maxWidth: '400px',
            margin: '0 auto 24px'
          }}>
            Showcase your Web3 merchandise in a curated collection
          </p>
          <button style={{
            padding: '16px 32px',
            backgroundColor: '#3E7C4A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1.125rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            Start Creating
          </button>
        </div>
      </div>
    </div>
  );
}
