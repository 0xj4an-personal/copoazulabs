# 📚 Copoazú Shop Documentation

Welcome to the Copoazú Shop documentation. This directory contains all the technical documentation for the project.

## 📁 Directory Structure

```
docs/
├── README.md                    # This file
├── environment/                 # Environment variables and configuration
│   ├── ENV_SETUP.md           # Environment setup guide
│   ├── ENV_VARIABLES.md       # Complete environment variables reference
│   ├── production.env.example # Production environment variables
│   ├── development.env.example # Development environment variables
│   └── template.env.example   # Environment variables template
├── setup/                     # Project setup and configuration
│   ├── CELO_SETUP.md         # Celo blockchain setup
│   ├── I18N_SETUP.md         # Internationalization setup
│   └── DEPLOYMENT.md         # Deployment guide
├── integration/               # Third-party integrations
│   └── DIVVI_INTEGRATION.md  # Divvi referral system integration
├── COMPONENTS.md              # Component documentation
└── CONTRIBUTING.md            # Contributing guidelines
```

## 🚀 Quick Start

### For Developers
1. **Environment Setup**: See [environment/ENV_SETUP.md](./environment/ENV_SETUP.md)
2. **Project Setup**: See [setup/DEPLOYMENT.md](./setup/DEPLOYMENT.md)
3. **Component Guide**: See [COMPONENTS.md](./COMPONENTS.md)

### For Deployment
1. **Environment Variables**: See [environment/](./environment/)
2. **Deployment Guide**: See [setup/DEPLOYMENT.md](./setup/DEPLOYMENT.md)

### For Integrations
1. **Divvi Integration**: See [integration/DIVVI_INTEGRATION.md](./integration/DIVVI_INTEGRATION.md)
2. **Celo Setup**: See [setup/CELO_SETUP.md](./setup/CELO_SETUP.md)

## 🔧 Environment Variables

The project uses environment variables for configuration. All environment files are located in the `environment/` directory:

- **Production**: `production.env.example` - For Vercel deployment
- **Development**: `development.env.example` - For local development
- **Template**: `template.env.example` - For new developers

## 📖 Documentation Guidelines

- All documentation should be in Markdown format
- Use clear headings and structure
- Include code examples where relevant
- Keep documentation up to date with code changes

## 🔒 Security Notes

- Environment variable files contain sensitive information
- Never commit actual `.env` files to version control
- Use the `.example` files as templates
- Follow security best practices in production
