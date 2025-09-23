import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { allProducts, getCollections, getCategories, getProductsByCollection, getProductsByCategory } from '@/data/products';
import { allCollections } from '@/data/collections';
import ProductsClient from './ProductsClient';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const t = await getTranslations('products');

  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Get URL parameters
  const collectionParam = Array.isArray(resolvedSearchParams.collection)
    ? resolvedSearchParams.collection[0]
    : resolvedSearchParams.collection;
  const categoryParam = Array.isArray(resolvedSearchParams.category)
    ? resolvedSearchParams.category[0]
    : resolvedSearchParams.category;
  const searchParam = Array.isArray(resolvedSearchParams.search)
    ? resolvedSearchParams.search[0]
    : resolvedSearchParams.search;

  // Apply server-side filtering
  let filteredProducts = allProducts;

  if (collectionParam) {
    filteredProducts = getProductsByCollection(collectionParam);
  }

  if (categoryParam) {
    filteredProducts = filteredProducts.filter(product => product.categoryKey === categoryParam);
  }

  if (searchParam) {
    const searchLower = searchParam.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.nameKey.toLowerCase().includes(searchLower) ||
      product.categoryKey.toLowerCase().includes(searchLower)
    );
  }

  // Get collections and categories for filters
  const collections = getCollections();
  const categories = getCategories();

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

        {/* Client Component for Interactive Features */}
        <Suspense fallback={
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg mb-6 transition-colors duration-200">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="flex gap-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
              </div>
            </div>
          </div>
        }>
          <ProductsClient 
            initialProducts={filteredProducts}
            initialCollection={collectionParam || ''}
            initialCategory={categoryParam || ''}
            initialSearch={searchParam || ''}
            collections={allCollections}
            categories={categories}
          />
        </Suspense>
      </div>
    </div>
  );
}