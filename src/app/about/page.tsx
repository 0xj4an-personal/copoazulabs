import { Users, Target, Heart, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    description: 'Blockchain enthusiast with 8+ years in Web3',
    image: '/team/alex.jpg'
  },
  {
    name: 'Sarah Martinez',
    role: 'Head of Design',
    description: 'Fashion designer passionate about sustainable tech',
    image: '/team/sarah.jpg'
  },
  {
    name: 'Mike Johnson',
    role: 'CTO',
    description: 'Full-stack developer and crypto advocate',
    image: '/team/mike.jpg'
  }
];

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'Pushing the boundaries of fashion technology'
  },
  {
    icon: Heart,
    title: 'Transparency',
    description: 'Open and honest in everything we do'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building together with our Web3 family'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--brand-background)] dark:bg-brand-dark">
      {/* Hero Section */}
      <section style={{
        padding: '120px 0 80px',
        background: 'linear-gradient(135deg, var(--brand-background) 0%, #FFFFFF 50%, var(--brand-background) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: 'var(--brand-dark)',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            About Copoazú Labs
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brand-neutral)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're pioneering the future of fashion through Web3 technology, 
            creating exclusive merchandise that connects the physical and digital worlds.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }} className="lg:grid-cols-2">
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--brand-dark)',
                marginBottom: '24px'
              }}>
                Our Mission
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--brand-neutral)',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                To revolutionize the fashion industry by integrating Web3 technology, 
                creating a decentralized marketplace where creativity, ownership, and 
                community thrive together.
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--brand-neutral)',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                We believe that fashion should be accessible, sustainable, and 
                empowering for everyone. Our platform enables users to own, trade, 
                and showcase their digital and physical fashion assets.
              </p>
              <Link href="/products">
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 32px',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1.125rem'
                }}>
                  Explore Our Products
                  <ArrowRight style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
                </button>
              </Link>
            </div>
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: 'var(--brand-background)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233E7C4A' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-22.091-17.909-40-40-40v80c22.091 0 40-17.909 40-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
              <div style={{ textAlign: 'center' }}>
                <Award style={{ width: '80px', height: '80px', color: 'var(--brand-primary)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--brand-dark)' }}>
                  Innovation in Fashion
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--brand-background)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--brand-dark)',
              marginBottom: '16px'
            }}>
              Our Values
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--brand-neutral)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The principles that guide everything we do
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {values.map((value, index) => (
              <div key={index} style={{
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
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <value.icon style={{ width: '40px', height: '40px', color: '#FFFFFF' }} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--brand-dark)',
                  marginBottom: '16px'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  color: 'var(--brand-neutral)',
                  lineHeight: '1.6'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--brand-dark)',
              marginBottom: '16px'
            }}>
              Meet Our Team
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--brand-neutral)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The passionate individuals behind Copoazú Labs
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                backgroundColor: 'var(--brand-background)',
                padding: '32px',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Users style={{ width: '60px', height: '60px', color: '#FFFFFF' }} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--brand-dark)',
                  marginBottom: '8px'
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--brand-primary)',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  {member.role}
                </p>
                <p style={{
                  color: 'var(--brand-neutral)',
                  lineHeight: '1.6'
                }}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-dark) 100%)',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            Join Our Mission
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brand-background)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Be part of the Web3 fashion revolution. Connect your wallet and start exploring.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }} className="sm:flex-row">
            <Link href="/products">
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: 'var(--brand-purple)',
                color: 'var(--brand-dark)',
                fontWeight: '600',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.125rem'
              }}>
                Start Shopping
                <ArrowRight style={{ marginLeft: '8px', width: '20px', height: '20px' }} />
              </button>
            </Link>
            <Link href="/collections">
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
                View Collections
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
