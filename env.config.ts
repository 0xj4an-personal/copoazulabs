/**
 * Environment Configuration for Copoazú Shop
 * Centralized configuration management with type safety
 */

// Define environment variable types
interface EnvConfig {
  // App Configuration
  app: {
    name: string;
    url: string;
    description: string;
    environment: 'development' | 'production' | 'test';
  };

  // Blockchain Configuration
  blockchain: {
    network: 'mainnet';
    rpcUrl: string;
    explorerUrl: string;
    walletConnectProjectId: string;
    contracts: {
      ccopToken: string;
      paymentContract: string;
    };
  };

  // Third-party Services
  services: {
    divvi: {
      consumerAddress: string;
      apiKey: string;
      projectId: string;
      secretKey?: string;
    };
    self: {
      appId: string;
      secretKey?: string;
    };
    analytics: {
      googleAnalyticsId?: string;
      mixpanelToken?: string;
    };
    email: {
      resendApiKey?: string;
      supportEmail: string;
    };
    media: {
      cloudinaryCloudName?: string;
      cloudinaryApiKey?: string;
      cloudinaryApiSecret?: string;
    };
  };

  // Security
  security: {
    nextAuthSecret?: string;
    nextAuthUrl: string;
  };

  // Development
  development: {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
}

// Helper function to get environment variable with validation
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    console.warn(`⚠️  Environment variable ${key} is not set`);
    return '';
  }
  return value;
}

function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Required environment variable ${key} is not set`);
  }
  return value;
}

// Export configuration object
export const envConfig: EnvConfig = {
  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Copoazú Shop'),
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    description: getEnvVar(
      'NEXT_PUBLIC_APP_DESCRIPTION',
      'Web3 Fashion & Merchandise E-commerce Platform'
    ),
    environment: (getEnvVar('NODE_ENV', 'development') as EnvConfig['app']['environment']),
  },

  blockchain: {
    network: (getEnvVar('NEXT_PUBLIC_CELO_NETWORK', 'mainnet') as EnvConfig['blockchain']['network']),
    rpcUrl: getEnvVar(
      'NEXT_PUBLIC_CELO_RPC_URL',
      'https://rpc.celocolombia.org'
    ),
    explorerUrl: getEnvVar(
      'NEXT_PUBLIC_CELO_EXPLORER_URL',
      'https://explorer.celo.org'
    ),
    walletConnectProjectId: getEnvVar('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID', ''),
    contracts: {
      ccopToken: getEnvVar(
        'NEXT_PUBLIC_CCOP_TOKEN_ADDRESS',
        '0x456a3D042C0DbD3db53D5489e98dFb038553B0d0'
      ),
      paymentContract: getEnvVar('NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS', ''),
    },
  },

  services: {
    divvi: {
      consumerAddress: getEnvVar('NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS', ''),
      apiKey: getEnvVar('NEXT_PUBLIC_DIVVI_API_KEY', ''),
      projectId: getEnvVar('NEXT_PUBLIC_DIVVI_PROJECT_ID', ''),
      secretKey: getEnvVar('DIVVI_SECRET_KEY'),
    },
    self: {
      appId: getEnvVar('NEXT_PUBLIC_SELF_APP_ID', ''),
      secretKey: getEnvVar('SELF_SECRET_KEY'),
    },
    analytics: {
      googleAnalyticsId: getEnvVar('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'),
      mixpanelToken: getEnvVar('NEXT_PUBLIC_MIXPANEL_TOKEN'),
    },
    email: {
      resendApiKey: getEnvVar('RESEND_API_KEY'),
      supportEmail: getEnvVar('NEXT_PUBLIC_SUPPORT_EMAIL', 'support@copoazulabs.com'),
    },
    media: {
      cloudinaryCloudName: getEnvVar('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'),
      cloudinaryApiKey: getEnvVar('CLOUDINARY_API_KEY'),
      cloudinaryApiSecret: getEnvVar('CLOUDINARY_API_SECRET'),
    },
  },

  security: {
    nextAuthSecret: getEnvVar('NEXTAUTH_SECRET'),
    nextAuthUrl: getEnvVar('NEXTAUTH_URL', 'http://localhost:3000'),
  },

  development: {
    logLevel: (getEnvVar('LOG_LEVEL', 'info') as EnvConfig['development']['logLevel']),
  },
};

// Export individual sections for convenience
export const appConfig = envConfig.app;
export const blockchainConfig = envConfig.blockchain;
export const servicesConfig = envConfig.services;
export const securityConfig = envConfig.security;
export const developmentConfig = envConfig.development;

// Validation function to check if all required variables are set
export function validateEnvConfig(): boolean {
  const errors: string[] = [];

  // Check required blockchain configuration
  if (!envConfig.blockchain.walletConnectProjectId && envConfig.app.environment === 'production') {
    errors.push('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for production');
  }

  // Check required service configurations for production
  if (envConfig.app.environment === 'production') {
    if (!envConfig.services.divvi.apiKey) {
      errors.push('NEXT_PUBLIC_DIVVI_API_KEY is required for production');
    }
    if (!envConfig.services.self.appId) {
      errors.push('NEXT_PUBLIC_SELF_APP_ID is required for production');
    }
  }

  if (errors.length > 0) {
    console.error('❌ Environment configuration errors:');
    errors.forEach(error => console.error(`  • ${error}`));
    return false;
  }

  console.log('✅ Environment configuration is valid');
  return true;
}

// Auto-validate in development
if (typeof window === 'undefined' && envConfig.app.environment === 'development') {
  validateEnvConfig();
}

export default envConfig;