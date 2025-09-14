'use client';

import { ArrowRight, Zap, Shield, Users, ShoppingCart, Wallet } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useTranslations } from 'next-intl';
import { getFeaturedProducts } from '@/data/products';

// Get featured products from centralized data
const featuredProducts = getFeaturedProducts();


export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F5F1E7] transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-15 bg-gradient-to-br from-[#F5F1E7] via-white to-[#F5F1E7] dark:from-[#1C1C1C] dark:via-gray-800 dark:to-[#1C1C1C] transition-colors duration-200">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-8 flex-wrap">
            {/* Left Content */}
            <div className="flex-1 min-w-80">
              <h1 className="text-5xl font-extrabold leading-tight mb-5 bg-gradient-to-br from-[#1C1C1C] to-[#3E7C4A] dark:from-[#F5F1E7] dark:to-[#3E7C4A] bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-7 leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/products">
                  <button className="inline-flex items-center px-7 py-3.5 bg-[#3E7C4A] text-white font-semibold rounded-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-[#2d5f3a] hover:shadow-xl text-base">
                    {t('hero.shopNow')}
                    <ArrowRight className="ml-1.5 w-4.5 h-4.5" />
                  </button>
                </Link>
                <button className="inline-flex items-center px-7 py-3.5 bg-transparent text-[#1C1C1C] dark:text-[#F5F1E7] font-semibold rounded-lg border-2 border-[#1C1C1C] dark:border-[#F5F1E7] cursor-pointer transition-all duration-300 hover:bg-[#1C1C1C] hover:text-[#F5F1E7] dark:hover:bg-[#F5F1E7] dark:hover:text-[#1C1C1C] text-base">
                  <Wallet className="mr-1.5 w-4.5 h-4.5" />
                  {t('hero.connectWallet')}
                </button>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="flex-none w-80 max-w-80">
              <div className="w-full h-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center transition-colors duration-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#3E7C4A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-1.5 transition-colors duration-200">
                    Web3 Merchandise
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                    Shop with crypto, own with pride
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#3E7C4A] mb-2">
                10K+
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t('stats.happyCustomers')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#3E7C4A] mb-2">
                50K+
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t('stats.productsSold')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#3E7C4A] mb-2">
                25+
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t('stats.countries')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#3E7C4A] mb-2">
                3+
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t('stats.yearsExperience')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F5F1E7] dark:bg-[#1C1C1C] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-200">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-20 h-20 bg-[#3E7C4A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
                {t('features.lightningFast.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('features.lightningFast.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-20 h-20 bg-[#3E7C4A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
                {t('features.securePrivate.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('features.securePrivate.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-20 h-20 bg-[#3E7C4A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
                {t('features.communityDriven.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('features.communityDriven.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
              {t('products.featuredTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 transition-colors duration-200">
              {t('products.featuredSubtitle')}
            </p>
            <Link href="/products">
              <button className="inline-flex items-center px-6 py-3 bg-transparent text-[#3E7C4A] font-semibold rounded-lg border-2 border-[#3E7C4A] cursor-pointer transition-all duration-300 hover:bg-[#3E7C4A] hover:text-white text-base">
                {t('products.viewAll')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#3E7C4A] to-[#1C1C1C] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[#F5F1E7] mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col gap-4 items-center sm:flex-row sm:justify-center">
            <Link href="/products">
              <button className="inline-flex items-center px-8 py-4 bg-[#E6B450] text-[#1C1C1C] font-semibold rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[#d4a042] hover:shadow-lg text-lg">
                {t('cta.startShopping')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="/about">
              <button className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#1C1C1C] text-lg">
                {t('cta.learnMore')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
