'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Grid, List, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

// Sample products data
const products = [
  {
    id: '1',
    name: 'Web3 Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 124,
    image: '/products/hoodie.jpg',
    category: 'Hoodies',
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Blockchain T-Shirt',
    price: 29.99,
    rating: 4.6,
    reviewCount: 89,
    image: '/products/tshirt.jpg',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '3',
    name: 'Crypto Cap',
    price: 24.99,
    rating: 4.7,
    reviewCount: 67,
    image: '/products/cap.jpg',
    category: 'Accessories',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'DeFi Sweatshirt',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewCount: 156,
    image: '/products/sweatshirt.jpg',
    category: 'Sweatshirts',
    isNew: true
  },
  {
    id: '5',
    name: 'NFT Jacket',
    price: 149.99,
    rating: 4.5,
    reviewCount: 43,
    image: '/products/jacket.jpg',
    category: 'Jackets',
    isNew: true
  },
  {
    id: '6',
    name: 'Metaverse Beanie',
    price: 19.99,
    rating: 4.4,
    reviewCount: 78,
    image: '/products/beanie.jpg',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'DAO Tank Top',
    price: 24.99,
    rating: 4.3,
    reviewCount: 56,
    image: '/products/tank.jpg',
    category: 'T-Shirts'
  },
  {
    id: '8',
    name: 'Smart Contract Shorts',
    price: 39.99,
    rating: 4.6,
    reviewCount: 91,
    image: '/products/shorts.jpg',
    category: 'Shorts'
  }
];

const categories = ['All', 'Hoodies', 'T-Shirts', 'Accessories', 'Sweatshirts', 'Jackets', 'Shorts'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
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
            Web3 Merchandise
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#9A9A9A',
            maxWidth: '600px'
          }}>
            Discover exclusive Web3 branded clothing and accessories
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
                  placeholder="Search products..."
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
              {/* Category Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500', color: '#1C1C1C' }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

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
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#9A9A9A' }}>
            <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
            <span>Filters applied</span>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gap: '32px',
          gridTemplateColumns: viewMode === 'grid'
            ? 'repeat(auto-fit, minmax(250px, 1fr))'
            : '1fr'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '64px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <Search style={{ width: '64px', height: '64px', color: '#9A9A9A', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '8px' }}>
              No products found
            </h3>
            <p style={{ color: '#9A9A9A', marginBottom: '24px' }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
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

        {/* Load More Button */}
        {filteredProducts.length > 0 && filteredProducts.length < products.length && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
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
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
