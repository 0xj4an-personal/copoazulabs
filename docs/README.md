# 📚 Copoazú Shop Documentation

Welcome to the Copoazú Shop documentation. This directory contains all the technical documentation for the project.

## 📁 Directory Structure

```
docs/
├── README.md                    # This file
├── environment/                 # Environment variables and configuration
│   ├── env-setup.md           # Environment setup guide
│   ├── env-variables.md       # Complete environment variables reference
│   ├── production.env.example # Production environment variables
│   ├── development.env.example # Development environment variables
│   └── template.env.example   # Environment variables template
├── setup/                     # Project setup and configuration
│   ├── celo-setup.md         # Celo blockchain setup
│   ├── i18n-setup.md         # Internationalization setup
│   └── deployment.md         # Deployment guide
├── integration/               # Third-party integrations
│   └── divvi-integration.md  # Divvi referral system integration
├── components.md              # Component documentation
└── contributing.md            # Contributing guidelines
```

## 🚀 Quick Start

### For Developers
1. **Environment Setup**: See [environment/env-setup.md](./environment/env-setup.md)
2. **Project Setup**: See [setup/deployment.md](./setup/deployment.md)
3. **Component Guide**: See [components.md](./components.md)

### For Deployment
1. **Environment Variables**: See [environment/](./environment/)
2. **Deployment Guide**: See [setup/deployment.md](./setup/deployment.md)

### For Integrations
1. **Divvi Integration**: See [integration/divvi-integration.md](./integration/divvi-integration.md)
2. **Celo Setup**: See [setup/celo-setup.md](./setup/celo-setup.md)

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
