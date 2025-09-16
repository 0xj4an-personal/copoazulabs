'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, Wallet, Shield } from 'lucide-react';
import WalletConnect from './WalletConnect';
import LanguageSwitcher from './LanguageSwitcher';
import CartButton from './CartButton';
import ThemeToggle from './ThemeToggle';
import VerificationStatus from './VerificationStatus';
import VerificationButton from './VerificationButton';
import VerificationPopup from './VerificationPopup';
import Logo from './Logo';
import { useVerification } from '@/contexts/VerificationContext';
import { env } from '../../env.config';
import { useTranslations } from 'next-intl';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const t = useTranslations('navigation');
  const { isVerified, setVerified } = useVerification();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Logo width={40} height={40} />
            <span className="text-xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">{env.APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-[#1C1C1C] dark:text-[#F5F1E7] no-underline transition-colors duration-200 text-base font-medium hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A]"
            >
              {t('home')}
            </Link>
            <Link 
              href="/products" 
              className="text-[#1C1C1C] dark:text-[#F5F1E7] no-underline transition-colors duration-200 text-base font-medium hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A]"
            >
              {t('products')}
            </Link>
            <Link 
              href="/collections" 
              className="text-[#1C1C1C] dark:text-[#F5F1E7] no-underline transition-colors duration-200 text-base font-medium hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A]"
            >
              {t('collections')}
            </Link>
            <Link 
              href="/about" 
              className="text-[#1C1C1C] dark:text-[#F5F1E7] no-underline transition-colors duration-200 text-base font-medium hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A]"
            >
              {t('about')}
            </Link>
          </nav>

          {/* Right Side - Desktop Actions + Language Switcher + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Actions - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-4">
              {isVerified ? (
                <VerificationStatus />
              ) : (
                <VerificationButton onClick={() => setShowVerificationPopup(true)} />
              )}
              <WalletConnect />
              <CartButton />
            </div>
            
            {/* Theme Toggle - Always Visible */}
            <ThemeToggle />
            
            {/* Language Switcher - Always Visible */}
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center p-2 bg-transparent border-none cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 md:hidden touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#1C1C1C] dark:text-[#F5F1E7]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1C1C1C] dark:text-[#F5F1E7]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="block border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 md:hidden">
            <div className="py-4">
              <Link 
                href="/" 
                className="block py-4 px-4 text-[#1C1C1C] dark:text-[#F5F1E7] no-underline text-base font-medium transition-colors duration-200 hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A] hover:bg-gray-50 dark:hover:bg-gray-800 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
                style={{ minHeight: '44px' }}
              >
                {t('home')}
              </Link>
              <Link 
                href="/products" 
                className="block py-4 px-4 text-[#1C1C1C] dark:text-[#F5F1E7] no-underline text-base font-medium transition-colors duration-200 hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A] hover:bg-gray-50 dark:hover:bg-gray-800 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
                style={{ minHeight: '44px' }}
              >
                {t('products')}
              </Link>
              <Link 
                href="/collections" 
                className="block py-4 px-4 text-[#1C1C1C] dark:text-[#F5F1E7] no-underline text-base font-medium transition-colors duration-200 hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A] hover:bg-gray-50 dark:hover:bg-gray-800 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
                style={{ minHeight: '44px' }}
              >
                {t('collections')}
              </Link>
              <Link 
                href="/about" 
                className="block py-4 px-4 text-[#1C1C1C] dark:text-[#F5F1E7] no-underline text-base font-medium transition-colors duration-200 hover:text-[#3E7C4A] dark:hover:text-[#3E7C4A] hover:bg-gray-50 dark:hover:bg-gray-800 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
                style={{ minHeight: '44px' }}
              >
                {t('about')}
              </Link>
              <div className="pt-3 border-t border-gray-300 dark:border-gray-700 mt-3 flex flex-col gap-4 px-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
                  <ThemeToggle />
                </div>
                
                {/* Mobile Actions */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wallet:</span>
                    <WalletConnect />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cart:</span>
                    <CartButton />
                  </div>
                  {!isVerified && (
                    <div className="pt-4">
                      <VerificationButton 
                        onClick={() => setShowVerificationPopup(true)} 
                        variant="header"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => setShowVerificationPopup(false)}
        onVerificationComplete={(verified) => {
          setVerified(verified);
          setShowVerificationPopup(false);
        }}
      />
    </header>
  );
}