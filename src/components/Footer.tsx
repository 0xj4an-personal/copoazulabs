import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Instagram, Mail } from 'lucide-react';
import Logo from './Logo';
import { envConfig } from '../../env.config';

export default function Footer() {
  return (
    <footer className="bg-brand-dark dark:bg-gray-800 text-brand-background transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#3D7DD6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px'
              }}>
                <Logo width={24} height={24} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{envConfig.app.name}</span>
            </div>
            <p style={{ 
              color: '#C6CED6', 
              marginBottom: '24px', 
              lineHeight: '1.6',
              maxWidth: '400px'
            }}>
              {envConfig.app.description}
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a 
                href="https://instagram.com/copoazulabs" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3D7DD6',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Instagram style={{ width: '20px', height: '20px' }} />
              </a>
              <a 
                href="https://twitter.com/copoazulabs"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3D7DD6',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Twitter style={{ width: '20px', height: '20px' }} />
              </a>
              <a 
                href="https://warpcast.com/copoazulabs" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3D7DD6',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Image 
                  src="/farcaster-icon.svg" 
                  alt="Farcaster" 
                  width="20" 
                  height="20"
                  style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <a 
                href="mailto:copoazulabs@gmail.com" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#3D7DD6',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Mail style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/products" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  All Products
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/collections" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Collections
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/about" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px' }}>Support</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/help" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Help Center
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/shipping" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Shipping Info
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/returns" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Returns
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link href="/size-guide" style={{ color: 'brand-neutral', textDecoration: 'none', transition: 'color 0.2s ease' }}>
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ 
          borderTop: '1px solid brand-neutral', 
          marginTop: '48px', 
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <p style={{ color: 'brand-neutral', margin: 0, fontSize: '0.875rem' }}>
            © 2024 Copoazú Labs. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/privacy" style={{ color: 'brand-neutral', textDecoration: 'none', fontSize: '0.875rem' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: 'brand-neutral', textDecoration: 'none', fontSize: '0.875rem' }}>
              Terms of Service
            </Link>
            <Link href="/cookies" style={{ color: 'brand-neutral', textDecoration: 'none', fontSize: '0.875rem' }}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}