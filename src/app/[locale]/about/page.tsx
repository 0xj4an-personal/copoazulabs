'use client';

import { useTranslations } from 'next-intl';
import { Users, Target, Heart, Eye, Zap, Shield, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const t = useTranslations('about');
  const router = useRouter();


  const stats = [
    { number: '10K+', label: t('stats.happyCustomers') },
    { number: '50K+', label: t('stats.productsSold') },
    { number: '25+', label: t('stats.countries') },
    { number: '3+', label: t('stats.yearsExperience') }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E7] dark:bg-[#1C1C1C] py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-[#1C1C1C] dark:text-[#F5F1E7] mb-4 transition-colors duration-200">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto transition-colors duration-200">
            {t('subtitle')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#3E7C4A] mb-2">
                  {stat.number}
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 transition-colors duration-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 p-16 rounded-2xl mb-20 shadow-lg transition-colors duration-200">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-15 h-15 bg-[#3E7C4A] rounded-xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] m-0 transition-colors duration-200">
              {t('mission.title')}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed m-0 transition-colors duration-200">
            {t('mission.description')}
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] text-center mb-12 transition-colors duration-200">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-12 h-12 bg-[#3E7C4A] rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-3 transition-colors duration-200">
                {t('values.innovation.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('values.innovation.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-12 h-12 bg-[#3E7C4A] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-3 transition-colors duration-200">
                {t('values.community.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('values.community.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-12 h-12 bg-[#3E7C4A] rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-3 transition-colors duration-200">
                {t('values.sustainability.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('values.sustainability.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-12 h-12 bg-[#3E7C4A] rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1C] dark:text-[#F5F1E7] mb-3 transition-colors duration-200">
                {t('values.transparency.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                {t('values.transparency.description')}
              </p>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="bg-[#3E7C4A] p-16 rounded-2xl text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => router.push('/products')}
              className="py-4 px-8 bg-white text-[#3E7C4A] border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t('cta.startShopping')}
            </button>
            <button 
              onClick={() => router.push('/collections')}
              className="py-4 px-8 bg-transparent text-white border-2 border-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-white hover:text-[#3E7C4A]"
            >
              {t('cta.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}