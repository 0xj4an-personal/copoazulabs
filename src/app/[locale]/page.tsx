'use client';

import { ArrowRight, Zap, Shield, Users, ShoppingCart, Wallet } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';

// Sample products data
const featuredProducts = [
  {
    id: '1',
    name: 'Web3 Hoodie',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 124,
    image: '/products/placeholder.svg',
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
    image: '/products/placeholder.svg',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '3',
    name: 'Crypto Cap',
    price: 24.99,
    rating: 4.7,
    reviewCount: 67,
    image: '/products/placeholder.svg',
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
    image: '/products/placeholder.svg',
    category: 'Sweatshirts',
    isNew: true
  },
  {
    id: '5',
    name: 'NFT Hoodie Collection',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewCount: 203,
    image: '/products/placeholder.svg',
    category: 'Hoodies',
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Smart Contract T-Shirt',
    price: 34.99,
    rating: 4.7,
    reviewCount: 142,
    image: '/products/placeholder.svg',
    category: 'T-Shirts',
    isNew: true
  },
  {
    id: '7',
    name: 'Metaverse Cap',
    price: 29.99,
    rating: 4.8,
    reviewCount: 98,
    image: '/products/placeholder.svg',
    category: 'Accessories',
    isBestSeller: true
  },
  {
    id: '8',
    name: 'DAO Sweatshirt',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 167,
    image: '/products/placeholder.svg',
    category: 'Sweatshirts',
    isNew: true
  }
];


export default function Home() {
  const t = useTranslations();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E7', color: '#1C1C1C' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #F5F1E7 0%, #FFFFFF 50%, #F5F1E7 100%)',
        overflow: 'hidden',
        padding: '60px 0'
      }}>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {/* Left Content */}
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #1C1C1C 0%, #3E7C4A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {t('hero.title')}
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#9A9A9A',
                marginBottom: '28px',
                lineHeight: '1.6',
                maxWidth: '480px'
              }}>
                {t('hero.subtitle')}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="sm:flex-row">
                <Link href="/products">
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '14px 28px',
                    backgroundColor: '#3E7C4A',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    fontSize: '1rem'
                  }}>
                    {t('hero.shopNow')}
                    <ArrowRight style={{ marginLeft: '6px', width: '18px', height: '18px' }} />
                  </button>
                </Link>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: '#1C1C1C',
                  fontWeight: '600',
                  borderRadius: '10px',
                  border: '2px solid #1C1C1C',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}>
                  <Wallet style={{ marginRight: '6px', width: '18px', height: '18px' }} />
                  {t('hero.connectWallet')}
                </button>
              </div>
            </div>
            
            {/* Right Visual */}
            <div style={{ flex: '0 0 320px', maxWidth: '320px' }}>
              <div style={{
                width: '100%',
                height: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-27.614-22.386-50-50-50v100c27.614 0 50-22.386 50-50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#3E7C4A',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <ShoppingCart style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '6px' }}>
                    Web3 Merchandise
                  </h3>
                  <p style={{ color: '#9A9A9A', fontSize: '0.9rem' }}>
                    Shop with crypto, own with pride
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#3E7C4A',
                marginBottom: '8px'
              }}>
                10K+
              </div>
              <div style={{
                fontSize: '1.125rem',
                color: '#9A9A9A',
                fontWeight: '500'
              }}>
                {t('stats.happyCustomers')}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#3E7C4A',
                marginBottom: '8px'
              }}>
                50K+
              </div>
              <div style={{
                fontSize: '1.125rem',
                color: '#9A9A9A',
                fontWeight: '500'
              }}>
                {t('stats.productsSold')}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#3E7C4A',
                marginBottom: '8px'
              }}>
                25+
              </div>
              <div style={{
                fontSize: '1.125rem',
                color: '#9A9A9A',
                fontWeight: '500'
              }}>
                {t('stats.countries')}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#3E7C4A',
                marginBottom: '8px'
              }}>
                3+
              </div>
              <div style={{
                fontSize: '1.125rem',
                color: '#9A9A9A',
                fontWeight: '500'
              }}>
                {t('stats.yearsExperience')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#F5F1E7' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1C1C1C',
              marginBottom: '16px'
            }}>
              {t('features.title')}
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#9A9A9A',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {t('features.subtitle')}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
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
                <Zap style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1C1C1C',
                marginBottom: '16px'
              }}>
                {t('features.lightningFast.title')}
              </h3>
              <p style={{
                color: '#9A9A9A',
                lineHeight: '1.6'
              }}>
                {t('features.lightningFast.description')}
              </p>
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
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
                <Shield style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1C1C1C',
                marginBottom: '16px'
              }}>
                {t('features.securePrivate.title')}
              </h3>
              <p style={{
                color: '#9A9A9A',
                lineHeight: '1.6'
              }}>
                {t('features.securePrivate.description')}
              </p>
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
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
                <Users style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1C1C1C',
                marginBottom: '16px'
              }}>
                {t('features.communityDriven.title')}
              </h3>
              <p style={{
                color: '#9A9A9A',
                lineHeight: '1.6'
              }}>
                {t('features.communityDriven.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1C1C1C',
              marginBottom: '16px'
            }}>
              {t('products.featuredTitle')}
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#9A9A9A',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              {t('products.featuredSubtitle')}
            </p>
            <Link href="/products">
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#3E7C4A',
                fontWeight: '600',
                borderRadius: '8px',
                border: '2px solid #3E7C4A',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }}>
{t('products.viewAll')}
                <ArrowRight style={{ marginLeft: '8px', width: '16px', height: '16px' }} />
              </button>
            </Link>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #3E7C4A 0%, #1C1C1C 100%)',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
{t('cta.title')}
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#F5F1E7',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
{t('cta.subtitle')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }} className="sm:flex-row">
            <Link href="/products">
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#E6B450',
                color: '#1C1C1C',
                fontWeight: '600',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.125rem'
              }}>
{t('cta.startShopping')}
                <ArrowRight style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
              </button>
            </Link>
            <Link href="/about">
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                fontWeight: '600',
                borderRadius: '12px',
                border: '2px solid #FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.125rem'
              }}>
{t('cta.learnMore')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
