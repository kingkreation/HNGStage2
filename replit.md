# Multi-Framework Ticket Management Web App

## Overview
This is a comprehensive ticket management application built with three distinct frontend frameworks: React, Vue.js, and Twig/PHP. Currently configured to run the **Vue.js implementation** in the Replit environment.

## Purpose
A learning project for the HNG Stage 2 Challenge demonstrating how to build a scalable ticket management system across different frontend technologies.

## Current State
- **Active Implementation**: Vue.js (running on port 5000)
- **Status**: Fully functional with authentication, dashboard, and ticket CRUD operations
- **Last Updated**: October 28, 2025

## Recent Changes
- **Oct 28, 2025**: Initial Replit setup
  - Configured Vue.js implementation to run on port 5000
  - Updated Vite config for Replit proxy compatibility (host: 0.0.0.0, HMR over WSS)
  - Created workflow for Vue dev server
  - Added Node.js dependencies via npm

## Project Architecture

### Tech Stack (Vue.js Implementation)
- **Framework**: Vue 3.4.0 with Composition API
- **Routing**: Vue Router 4.2.0
- **State Management**: Pinia 2.1.0 (for toast notifications)
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS3 with CSS Variables
- **Storage**: localStorage (client-side)

### Directory Structure
```
/
├── vue-app/               # Active Vue.js implementation
│   ├── src/
│   │   ├── components/    # Reusable UI components (Header, Footer, Toast)
│   │   ├── pages/        # Page components (Landing, Login, Dashboard, Tickets)
│   │   ├── router/       # Vue Router configuration
│   │   ├── services/     # Business logic (authService, ticketService)
│   │   ├── stores/       # Pinia stores (toastStore)
│   │   └── styles/       # Component-specific CSS
│   ├── vite.config.js    # Vite configuration (configured for Replit)
│   └── package.json
├── react-app/            # Alternative React implementation (not active)
├── twig-app/             # Alternative PHP/Twig implementation (not active)
└── shared-assets/        # Common SVG assets and design tokens
```

### Key Features
1. **Authentication System**: Login/signup with session management (localStorage)
2. **Dashboard**: Ticket statistics (total, open, in progress, closed)
3. **Ticket Management**: Full CRUD operations with form validation
4. **Toast Notifications**: Success/error feedback using Pinia
5. **Responsive Design**: Mobile-first, works at 320px-1440px
6. **Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels

### Data Schema

#### Session Storage
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

#### Ticket Schema
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

## Demo Credentials
- **Email**: `demo@ticketapp.test`
- **Password**: `Password123!`

## Development

### Running the App
The Vue.js app runs automatically via the configured workflow:
- **Command**: `cd vue-app && npm run dev`
- **Port**: 5000
- **URL**: Available in the Replit webview

### Installing Dependencies
```bash
cd vue-app
npm install
```

### Building for Production
```bash
cd vue-app
npm run build
```

## Replit-Specific Configuration

### Vite Configuration
The Vite config has been customized for Replit:
- **Host**: `0.0.0.0` (required for Replit to serve the app)
- **Port**: 5000 (Replit's standard web port)
- **HMR**: WebSocket over WSS on port 443 (for hot module replacement through Replit's proxy)

### Workflow
- **Name**: Vue Ticket App
- **Command**: `cd vue-app && npm run dev`
- **Output Type**: Webview (shows the web preview)

## Alternative Implementations

This repository includes two other implementations that can be run instead:

### React Implementation
- Location: `/react-app`
- Tech: React 18, React Router, Context API
- Run: `cd react-app && npm install && npm start`
- Note: Would need port reconfiguration for Replit

### PHP/Twig Implementation
- Location: `/twig-app`
- Tech: PHP 7.4+, Twig 3.8, Composer
- Run: `cd twig-app && composer install && php -S 0.0.0.0:5000 -t public`
- Note: Requires PHP module installation

## Deployment
- **Development**: Currently running in Replit dev environment
- **Production**: Can be deployed to Netlify, Vercel, or similar platforms
- **Build Output**: `vue-app/dist/` after running `npm run build`

## Testing Checklist
- [x] Landing page displays hero wave and decorative circles
- [x] Signup flow creates account and redirects to dashboard
- [x] Login flow with demo credentials succeeds
- [x] Dashboard displays correct ticket statistics
- [x] Create ticket form validates all fields
- [x] Edit ticket updates data and changes updatedAt
- [x] Delete ticket shows confirmation modal
- [x] Logout clears session and redirects to landing
- [x] Accessing /dashboard without token redirects to login
- [x] Responsive design works at various breakpoints
- [x] Toast notifications appear for success/error

## User Preferences
- None documented yet

## Notes
- Data persists in browser localStorage (not in a database)
- All three implementations share the same UI/UX design
- Mock authentication system (no real backend API)
- Built as part of HNG Stage 2 Challenge

## Developer
**Joshua Kolawole (King)** - Frontend Developer
Built for HNG Internship Stage 2 Challenge
