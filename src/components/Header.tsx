'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, Wallet } from 'lucide-react';
import WalletConnect from './WalletConnect';
import { env } from '../../env.config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#3E7C4A',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.25rem' }}>C</span>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1C1C1C' }}>{env.APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="md:flex">
            <Link 
              href="/" 
              style={{ 
                color: '#1C1C1C', 
                textDecoration: 'none', 
                transition: 'color 0.2s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              style={{ 
                color: '#1C1C1C', 
                textDecoration: 'none', 
                transition: 'color 0.2s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              style={{ 
                color: '#1C1C1C', 
                textDecoration: 'none', 
                transition: 'color 0.2s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              style={{ 
                color: '#1C1C1C', 
                textDecoration: 'none', 
                transition: 'color 0.2s ease',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="md:flex">
            <WalletConnect />
            <button style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease'
            }}>
              <ShoppingCart style={{ width: '20px', height: '20px', color: '#1C1C1C' }} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease'
            }}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X style={{ width: '24px', height: '24px', color: '#1C1C1C' }} />
            ) : (
              <Menu style={{ width: '24px', height: '24px', color: '#1C1C1C' }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ 
            display: 'block', 
            borderTop: '1px solid #9A9A9A', 
            backgroundColor: '#FFFFFF' 
          }} className="md:hidden">
            <div style={{ padding: '16px 0' }}>
              <Link 
                href="/" 
                style={{ 
                  display: 'block', 
                  padding: '12px 0', 
                  color: '#1C1C1C', 
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                style={{ 
                  display: 'block', 
                  padding: '12px 0', 
                  color: '#1C1C1C', 
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/collections" 
                style={{ 
                  display: 'block', 
                  padding: '12px 0', 
                  color: '#1C1C1C', 
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/about" 
                style={{ 
                  display: 'block', 
                  padding: '12px 0', 
                  color: '#1C1C1C', 
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div style={{ padding: '12px 0', borderTop: '1px solid #9A9A9A', marginTop: '12px' }}>
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}