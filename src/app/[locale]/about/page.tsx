'use client';

import { useTranslations } from 'next-intl';
import { Users, Target, Heart, Eye, Zap, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');

  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Blockchain expert with 8+ years in Web3, former Coinbase engineer.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Maria Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack developer passionate about sustainable fashion tech.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'David Kim',
      role: 'Head of Design',
      bio: 'Creative director with expertise in digital fashion and NFT art.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sarah Johnson',
      role: 'Community Manager',
      bio: 'Web3 community builder and fashion industry veteran.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const stats = [
    { number: '10K+', label: t('stats.happyCustomers') },
    { number: '50K+', label: t('stats.productsSold') },
    { number: '25+', label: t('stats.countries') },
    { number: '3+', label: t('stats.yearsExperience') }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1E7', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
            {t('title')}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#9A9A9A', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            {t('subtitle')}
          </p>
          
          {/* Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px',
            marginBottom: '48px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3E7C4A', marginBottom: '8px' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1rem', color: '#9A9A9A' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '64px', 
          borderRadius: '16px', 
          marginBottom: '80px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#3E7C4A', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Target style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#1C1C1C', margin: 0 }}>
              {t('mission.title')}
            </h2>
          </div>
          <p style={{ fontSize: '1.125rem', color: '#9A9A9A', lineHeight: '1.6', margin: 0 }}>
            {t('mission.description')}
          </p>
        </div>

        {/* Values Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#1C1C1C', textAlign: 'center', marginBottom: '48px' }}>
            {t('values.title')}
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#3E7C4A', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Zap style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '12px' }}>
                {t('values.innovation.title')}
              </h3>
              <p style={{ color: '#9A9A9A', lineHeight: '1.6' }}>
                {t('values.innovation.description')}
              </p>
            </div>

            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#3E7C4A', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Users style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '12px' }}>
                {t('values.community.title')}
              </h3>
              <p style={{ color: '#9A9A9A', lineHeight: '1.6' }}>
                {t('values.community.description')}
              </p>
            </div>

            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#3E7C4A', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Heart style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '12px' }}>
                {t('values.sustainability.title')}
              </h3>
              <p style={{ color: '#9A9A9A', lineHeight: '1.6' }}>
                {t('values.sustainability.description')}
              </p>
            </div>

            <div style={{ 
              backgroundColor: '#FFFFFF', 
              padding: '32px', 
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#3E7C4A', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Eye style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '12px' }}>
                {t('values.transparency.title')}
              </h3>
              <p style={{ color: '#9A9A9A', lineHeight: '1.6' }}>
                {t('values.transparency.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', color: '#1C1C1C', textAlign: 'center', marginBottom: '16px' }}>
            {t('team.title')}
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#9A9A9A', textAlign: 'center', marginBottom: '48px' }}>
            {t('team.subtitle')}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px' 
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '32px', 
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginBottom: '24px'
                  }}
                />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1C1C1C', marginBottom: '8px' }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '1rem', color: '#3E7C4A', fontWeight: '500', marginBottom: '12px' }}>
                  {member.role}
                </p>
                <p style={{ color: '#9A9A9A', lineHeight: '1.6' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ 
          backgroundColor: '#3E7C4A', 
          padding: '64px', 
          borderRadius: '16px', 
          textAlign: 'center',
          color: '#FFFFFF'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px' }}>
            {t('cta.title')}
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '32px', opacity: 0.9 }}>
            {t('cta.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '16px 32px',
              backgroundColor: '#FFFFFF',
              color: '#3E7C4A',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              {t('cta.startShopping')}
            </button>
            <button style={{
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              {t('cta.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}