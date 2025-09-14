'use client';

import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 transition-colors duration-200">
          {t('subtitle')}
        </p>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-lg mt-12 transition-colors duration-200">
          <h2 className="text-2xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
            {t('moreComingSoon')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
            {t('moreProductsDescription')}
          </p>
        </div>
      </div>
    </div>
  );
}