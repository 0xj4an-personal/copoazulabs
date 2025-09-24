# Environment Variables Setup

## Required Environment Variables

### Critical Variables (Required)
```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CELO_RPC_URL=https://rpc.celocolombia.org
NEXT_PUBLIC_CELO_EXPLORER_URL=https://explorer.celo.org
NEXT_PUBLIC_DIVVI_CONSUMER_ADDRESS=your_divvi_consumer_address
NODE_ENV=production
```

### Optional Variables (Only if you use them)
```bash
# NextAuth (only if using authentication)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-app.vercel.app

# Self Verification (only if using Self)
NEXT_PUBLIC_SELF_APP_ID=your_self_app_id
SELF_SECRET_KEY=your_self_secret_key

# Email (only if using Resend)
RESEND_API_KEY=your_resend_api_key

# Analytics (only if using Google Analytics)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

## Setup Instructions

### For Development
1. Create `.env.local` file in project root
2. Copy the variables above with your actual values
3. Run `npm run dev`

### For Production (Vercel)
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable with your actual values
3. Redeploy your application

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
