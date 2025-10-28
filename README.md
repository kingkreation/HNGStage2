# Multi-Framework Ticket Management Web App

A comprehensive ticket management application built with three distinct frontend frameworks: **React**, **Vue.js**, and **Twig**. Each implementation features the same UI design, functionality, and user experience while showcasing best practices for each framework.

## 🎯 Project Overview

This project demonstrates how to build a scalable ticket management system across different frontend technologies. The app includes:

- **Landing Page** with hero section, features showcase, and CTAs
- **Authentication System** with secure login/signup
- **Dashboard** with ticket statistics
- **Ticket Management** with full CRUD operations
- **Responsive Design** optimized for all devices
- **Accessibility Compliance** with semantic HTML and ARIA labels
- **Form Validation** with real-time error feedback
- **Toast Notifications** for user feedback

## 📚 Framework Implementations

### ⚛️ React Implementation
- **Location**: `/react-app`
- **Tech Stack**: React 18, React Router, Context API
- **Status**: ✅ Complete
- **Features**: Component-based, hooks, state management with Context
- **Read More**: [React README](./react-app/README.md)

### 💚 Vue.js Implementation
- **Location**: `/vue-app`
- **Tech Stack**: Vue 3, Vue Router, Composition API
- **Status**: ✅ Complete
- **Features**: Reactive data binding, component composition, routing
- **Read More**: [Vue.js README](./vue-app/README.md)

### 🌿 Twig Implementation
- **Location**: `/twig-app`
- **Tech Stack**: PHP, Twig Templates, Composer
- **Status**: ✅ Complete
- **Features**: Server-side rendering, template inheritance, PHP sessions
- **Read More**: [Twig README](./twig-app/README.md)

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ (for React and Vue.js)
- PHP 7.4+ (for Twig)
- npm or yarn (for Node.js projects)

### Running React App

```bash
cd react-app
npm install
npm start
```

The app will open at `http://localhost:3000`

### Running Vue.js App

```bash
cd vue-app
npm install
npm run dev
```

The app will open at `http://localhost:5173`

### Running Twig App

```bash
cd twig-app
composer install
php -S localhost:8000
```

The app will be available at `http://localhost:8000`

## 🔐 Demo Credentials

Use these credentials to test any of the three implementations:

- **Email**: `demo@ticketapp.test`
- **Password**: `Password123!`

Or create a new account using the signup form.

## 📁 Project Structure

```
HNGStage2/
├── shared-assets/
│   ├── hero-wave.svg          # Wavy background SVG
│   ├── circle-1.svg           # Decorative circle 1
│   ├── circle-2.svg           # Decorative circle 2
│   ├── design-tokens.json     # Design system tokens
│   └── global-styles.css      # Shared CSS variables
│
├── react-app/                 # React implementation
│   ├── src/
│   ├── public/
│   └── README.md
│
├── vue-app/                   # Vue.js implementation
│   ├── src/
│   ├── public/
│   └── README.md
│
├── twig-app/                  # Twig/PHP implementation
│   ├── templates/
│   ├── public/
│   └── README.md
│
└── README.md                  # This file
```

## 🎨 Consistent Design System

All three implementations share:

- **Layout**: Max-width 1440px centered container
- **Hero Section**: Wavy SVG background with decorative circles
- **Color Scheme**:
  - Primary: #3b82f6 (Blue)
  - Secondary: #8b5cf6 (Purple)
  - Status Open: #16a34a (Green)
  - Status In Progress: #f59e0b (Amber)
  - Status Closed: #6b7280 (Gray)

- **Typography**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Spacing**: Consistent padding, margins, and gaps
- **Components**: Header, Footer, Cards, Forms, Status Tags, Modals

## 🔄 Shared Services

All implementations use the same data structures and validation rules:

### Session Storage
```json
{
  "token": "mock-token-timestamp",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### Ticket Schema
```json
{
  "id": 1,
  "title": "Fix login bug",
  "description": "Detailed description",
  "status": "open",
  "priority": "high",
  "createdAt": 1690000000000,
  "updatedAt": 1690000000000
}
```

### Validation Rules
- **Title**: Required, non-empty
- **Status**: Required, one of [open, in_progress, closed]
- **Description**: Optional, min 10 characters if provided
- **Priority**: Optional, one of [low, medium, high]

## ♿ Accessibility Features

Each implementation includes:

- ✅ Semantic HTML elements
- ✅ Proper heading hierarchy
- ✅ Form labels with `htmlFor`/`for` attributes
- ✅ Error messages with `aria-describedby`
- ✅ Focus visible styles
- ✅ ARIA labels and regions
- ✅ Keyboard navigation support
- ✅ Color contrast compliance (WCAG AA)
- ✅ Alt text for images

## 🧪 Manual Testing Checklist

Before submission, verify:

- [ ] Landing page displays hero wave and decorative circles
- [ ] Signup flow creates account and redirects to dashboard
- [ ] Login flow with demo credentials succeeds
- [ ] Dashboard displays correct ticket statistics
- [ ] Create ticket form validates all fields
- [ ] Edit ticket updates data and changes updatedAt
- [ ] Delete ticket shows confirmation modal
- [ ] Logout clears session and redirects to landing
- [ ] Accessing /dashboard without token redirects to login
- [ ] Responsive design works at 320px, 768px, 1024px, 1440px
- [ ] Toast notifications appear for success/error
- [ ] All form errors display inline
- [ ] Status tags show correct colors
- [ ] Keyboard navigation works throughout app

## 🚀 Deployment

### Complete Deployment Guide

Comprehensive step-by-step instructions for deploying all three frameworks:
📖 [Read Full Deployment Guide](./DEPLOYMENT_GUIDE.md)

### Quick Deployment Options

**React & Vue.js**:
- 🔗 Netlify: Build with `npm run build`, publish directory `build/` (Vue) or `dist/` (Vue)
- 🔗 Vercel: Connect GitHub, auto-deploy on push
- 📚 [Detailed React Deploy Guide](./react-app/README.md#-deployment)
- 📚 [Detailed Vue Deploy Guide](./vue-app/README.md#-deployment)

**Twig/PHP**:
- 🔗 Render: Free PHP hosting, auto-deploy from GitHub
- 🔗 Railway: Quick deployment with Procfile
- 🔗 Heroku: Traditional hosting option
- 📚 [Detailed Twig Deploy Guide](./twig-app/README.md#-deployment)

### Live Deployments (After Setup)
- React: `https://your-react-app.netlify.app` or `.vercel.app`
- Vue: `https://your-vue-app.netlify.app` or `.vercel.app`
- Twig: `https://your-twig-app.onrender.com` or `.railway.app` or `.herokuapp.com`

## 📊 Performance Tips

- React: Use code splitting with React.lazy() for large apps
- Vue: Leverage tree-shaking and lazy component loading
- Twig: Enable OPcache and use a production PHP server like PHP-FPM

## 🔍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Documentation

Comprehensive guides and READMEs:

- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment for all three apps
- **[Local Testing Guide](./LOCAL_TESTING_GUIDE.md)** - Complete testing checklist before deployment
- [React README](./react-app/README.md) - Component structure, hooks usage, deployment
- [Vue.js README](./vue-app/README.md) - Composition API, reactive patterns, deployment
- [Twig README](./twig-app/README.md) - Template structure, PHP integration, deployment

## 🤝 Contributing

This is a learning project for HNG Stage 2. Each framework should:

1. Maintain identical UI/UX
2. Implement same validation rules
3. Use same data structures
4. Follow accessibility guidelines
5. Be fully responsive
6. Include comprehensive README

## 📋 Submission Checklist

- [x] All three implementations complete and functional
- [x] Shared assets folder with SVGs and design tokens
- [x] Each implementation has a README with setup instructions
- [x] Demo credentials work on all versions
- [x] Responsive design verified at multiple breakpoints
- [x] Accessibility compliance checked
- [ ] Live deployment URLs provided (⏳ In Progress)
- [x] Protected routes redirect correctly
- [x] Full CRUD implemented with validation
- [x] Error handling consistent across frameworks
- [x] Deployment guides created (Netlify, Vercel, Render, Railway, Heroku)
- [x] Local testing guide provided

## 🎓 Learning Objectives

- Master different frontend frameworks
- Implement consistent design across technologies
- Build robust authentication and session management
- Create form validation patterns
- Develop accessible user interfaces
- Deploy to production environments

## 📞 Support

For issues or questions about specific implementations, refer to the individual framework READMEs or the main HNG Stage 2 documentation.

---

**Built for HNG Stage 2 Challenge** | Multi-Framework Mastery