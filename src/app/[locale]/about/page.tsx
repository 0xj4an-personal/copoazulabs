'use client';

import { useTranslations } from 'next-intl';
import { Users, Target, Heart, Eye, Zap, Shield, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

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
    <div className="min-h-screen bg-[#F5F8FA] dark:bg-[#1B1B2E] py-8 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-6">
            <Logo 
              width={80} 
              height={80} 
              className="rounded-xl mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-[#1B1B2E] dark:text-[#F5F8FA] mb-3 transition-colors duration-200">
            {t('title')}
          </h1>
          <p className="text-lg text-brand-neutral dark:text-brand-background mb-10 max-w-2xl mx-auto transition-colors duration-200">
            {t('subtitle')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#3D7DD6] mb-2">
                  {stat.number}
                </div>
                <div className="text-base text-brand-neutral dark:text-brand-background transition-colors duration-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-brand-dark/80 p-12 rounded-2xl mb-16 shadow-lg transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#3D7DD6] rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] m-0 transition-colors duration-200">
              {t('mission.title')}
            </h2>
          </div>
          <p className="text-base text-brand-neutral dark:text-brand-background leading-relaxed m-0 transition-colors duration-200">
            {t('mission.description')}
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] text-center mb-10 transition-colors duration-200">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-10 h-10 bg-[#3D7DD6] rounded-xl flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] mb-2 transition-colors duration-200">
                {t('values.innovation.title')}
              </h3>
              <p className="text-brand-neutral dark:text-brand-background leading-relaxed transition-colors duration-200">
                {t('values.innovation.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-10 h-10 bg-[#3D7DD6] rounded-xl flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] mb-2 transition-colors duration-200">
                {t('values.community.title')}
              </h3>
              <p className="text-brand-neutral dark:text-brand-background leading-relaxed transition-colors duration-200">
                {t('values.community.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-10 h-10 bg-[#3D7DD6] rounded-xl flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] mb-2 transition-colors duration-200">
                {t('values.sustainability.title')}
              </h3>
              <p className="text-brand-neutral dark:text-brand-background leading-relaxed transition-colors duration-200">
                {t('values.sustainability.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-brand-dark/80 p-6 rounded-2xl shadow-lg transition-colors duration-200">
              <div className="w-10 h-10 bg-[#3D7DD6] rounded-xl flex items-center justify-center mb-3">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B2E] dark:text-[#F5F8FA] mb-2 transition-colors duration-200">
                {t('values.transparency.title')}
              </h3>
              <p className="text-brand-neutral dark:text-brand-background leading-relaxed transition-colors duration-200">
                {t('values.transparency.description')}
              </p>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="bg-[#3D7DD6] p-12 rounded-2xl text-center text-white">
          <h2 className="text-2xl font-semibold mb-3">
            {t('cta.title')}
          </h2>
          <p className="text-base mb-6 opacity-90">
            {t('cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => router.push('/products')}
              className="py-3 px-6 bg-white text-[#3D7DD6] border-none rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t('cta.startShopping')}
            </button>
            <button 
              onClick={() => router.push('/collections')}
              className="py-3 px-6 bg-transparent text-white border-2 border-white rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-white hover:text-[#3D7DD6]"
            >
              {t('cta.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}