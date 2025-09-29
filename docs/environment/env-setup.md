# Environment Variables Setup

## Quick Start

1. **Copy the template:**
   ```bash
   cp docs/environment/env.example .env.local
   ```

2. **Fill in your values:**
   - Get your Reown project ID from [cloud.reown.com](https://cloud.reown.com)
   - Add your Divvi consumer address
   - Configure other services as needed

3. **Start development:**
   ```bash
   npm run dev
   ```

## Required Variables

- `NEXT_PUBLIC_REOWN_PROJECT_ID` - Get from [Reown Cloud](https://cloud.reown.com)
- `NEXT_PUBLIC_CELO_RPC_URL` - Celo network RPC endpoint
- `NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS` - Your Divvi consumer address
- `NEXT_PUBLIC_APP_URL` - Your app URL (localhost for dev, production URL for prod)

## Optional Variables

- **Self Verification**: `NEXT_PUBLIC_SELF_APP_ID`, `NEXT_PUBLIC_SELF_SCOPE`, `NEXT_PUBLIC_SELF_ENDPOINT`, `SELF_SECRET_KEY`
- **NextAuth**: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **Email**: `RESEND_API_KEY`
- **Analytics**: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

## Setup Instructions

### For Development
1. Create `.env.local` file in project root
2. Copy the variables above with your actual values
3. Run `npm run dev`

### For Production (Vercel)
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable with your actual values
3. Redeploy your application

### Note: Reown (formerly WalletConnect)
- The variable is now `NEXT_PUBLIC_REOWN_PROJECT_ID` for clarity
- Get your project ID from the [Reown Cloud Dashboard](https://cloud.reown.com)
- The service is now called "Reown" but the API remains the same

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Rotate secrets regularly
- Monitor for exposed credentials

## Divvi Integration

The Divvi consumer address is now configurable via environment variable:
- `NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS` - Your Divvi consumer address
- Default: `your_divvi_consumer_address`

This allows you to:
- Use different consumer addresses per environment
- Change the address without code changes
- Better manage multiple projects

## Self Verification Integration

The Self verification system is configurable via environment variables:
- `NEXT_PUBLIC_SELF_APP_ID` - Your Self application ID
- `NEXT_PUBLIC_SELF_SCOPE` - Verification scope (default: "copoazu-prod")
- `NEXT_PUBLIC_SELF_ENDPOINT` - Your verification endpoint URL
- `SELF_SECRET_KEY` - Self secret key (server-side only)

### Configuration Notes:
- **Scope**: Should match your Self app configuration
- **Endpoint**: Should point to your `/api/verify` route
- **Development**: Use `http://localhost:3000/api/verify`
- **Production**: Use `https://your-app.vercel.app/api/verify`

This allows you to:
- Use different Self apps per environment
- Change verification settings without code changes
- Better manage multiple verification projects

## Need More Details?

For comprehensive documentation including all variable descriptions, validation rules, and advanced configuration, see [env-variables.md](./env-variables.md).