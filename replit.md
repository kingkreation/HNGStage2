# Multi-Framework Ticket Management App

## Overview

This is a multi-framework ticket management application built for HNG Stage 2. I created three complete implementations using React, Vue.js, and PHP/Twig to demonstrate framework versatility while maintaining identical functionality and design.

## Current State

- **Active in Replit**: Vue.js implementation (running on port 5000)
- **Status**: Production-ready and configured for deployment
- **Last Updated**: October 29, 2025

## Purpose

Learning project for HNG Stage 2 demonstrating how to build the same application across different technology stacks. Each version has identical features, UI/UX, and accessibility standards.

## Recent Changes

### October 29, 2025 - Deployment Ready
- Added deployment configurations for all three apps
- Created `vercel.json` for React app deployment to Vercel
- Verified and updated `netlify.toml` for Vue app deployment to Netlify
- Created `Dockerfile`, `nginx-site.conf`, and `.dockerignore` for Twig app deployment to Render
- Humanized all documentation to remove AI-sounding language
- Removed unnecessary files from repository
- Created comprehensive `DEPLOYMENT.md` guide with step-by-step instructions
- Repository is now submission-ready

### October 28, 2025 - Modernization Update
- Removed all emojis and replaced with professional SVG icons across all frameworks
- Humanized all text content for better professional tone
- Modernized UI with improved gradients, hover effects, and smooth animations
- Migrated React from Create React App to Vite 5.0
- Configured both Vue and React apps to run on port 5000 with Replit proxy support
- Updated all Twig templates with SVG icons and modern CSS
- Achieved complete design parity across all three frameworks

## Project Structure

```
/
├── react-app/           # React 18 + Vite implementation
│   ├── vercel.json      # Vercel deployment config (NEW)
│   ├── netlify.toml     # Alternative Netlify config
│   └── vite.config.js   # Configured for Replit
├── vue-app/             # Vue 3 + Composition API (ACTIVE)
│   ├── netlify.toml     # Netlify deployment config
│   └── vite.config.js   # Configured for Replit
├── twig-app/            # PHP + Twig implementation
│   ├── Dockerfile       # Docker config for Render (NEW)
│   ├── conf/            # nginx configuration (NEW)
│   ├── .dockerignore    # Docker ignore rules (NEW)
│   └── composer.json
├── shared-assets/       # Common SVG assets and design tokens
├── DEPLOYMENT.md        # Comprehensive deployment guide (NEW)
├── README.md            # Main project documentation (UPDATED)
└── replit.md            # This file
```

## Tech Stack (Vue.js - Active Implementation)

- **Framework**: Vue 3.4.0 with Composition API
- **Routing**: Vue Router 4.2.0
- **State Management**: Pinia 2.1.0
- **Build Tool**: Vite 5.0.0
- **Styling**: CSS3 with CSS Variables
- **Storage**: localStorage (client-side)

## Features

All three implementations include:

1. **Landing Page**: Hero section with wavy SVG background and decorative circles
2. **Authentication**: Login/signup with session management
3. **Dashboard**: Ticket statistics (total, open, in progress, closed)
4. **Ticket Management**: Full CRUD operations with validation
5. **Toast Notifications**: Success/error feedback
6. **Responsive Design**: Works on mobile (320px) to desktop (1440px)
7. **Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels

## Demo Credentials

- **Email**: demo@ticketapp.test
- **Password**: Password123!

## Development in Replit

### Active Workflow

- **Name**: Vue Ticket App
- **Command**: `cd vue-app && npm run dev`
- **Port**: 5000
- **URL**: Available in Replit webview

### Running Different Versions

To switch to a different implementation:

**React:**
```bash
cd react-app && npm install && npm run dev
```

**Twig:**
```bash
cd twig-app && composer install && php -S 0.0.0.0:5000 -t public
```

## Deployment Configuration

Each app is configured for its recommended platform:

### React → Vercel
- `vercel.json` configured for client-side routing
- Build command: `npm run build`
- Output directory: `dist`

### Vue → Netlify
- `netlify.toml` configured with redirects
- Build command: `npm run build`
- Publish directory: `dist`

### Twig → Render
- `Dockerfile` with nginx and PHP-FPM
- `conf/nginx-site.conf` for web server config
- Composer dependencies pre-installed

See `DEPLOYMENT.md` for detailed deployment instructions.

## Replit-Specific Configuration

### Vite Setup (React & Vue)

Both apps are configured for Replit's environment:
- **Host**: `0.0.0.0` (required for Replit)
- **Port**: 5000 (standard Replit web port)
- **HMR**: WebSocket over WSS on port 443 for hot module replacement

### Environment

- **Node.js**: 20.x
- **Package Manager**: npm
- **No Docker**: Using native Nix environment

## Data Structure

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

## Validation Rules

- **Title**: Required, non-empty
- **Status**: Required, one of [open, in_progress, closed]
- **Description**: Optional, min 10 characters if provided
- **Priority**: Optional, one of [low, medium, high]

## Accessibility Compliance

All implementations include:
- Semantic HTML elements
- Proper heading hierarchy
- Form labels with `for` attributes
- Error messages with `aria-describedby`
- Keyboard navigation support
- Focus visible styles
- WCAG AA color contrast
- ARIA labels for interactive elements

## Testing Checklist

- [x] Landing page displays correctly with wave SVG
- [x] Signup flow creates account and redirects to dashboard
- [x] Login with demo credentials works
- [x] Dashboard shows accurate ticket statistics
- [x] Create ticket form validates all fields
- [x] Edit ticket updates data and timestamp
- [x] Delete ticket shows confirmation modal
- [x] Logout clears session properly
- [x] Protected routes redirect when not authenticated
- [x] Responsive design works at all breakpoints
- [x] Toast notifications appear for all actions
- [x] Deployment configs created for all platforms

## Notes

- Data persists in browser localStorage (React/Vue) or JSON files (Twig)
- All three implementations share identical UI/UX
- Mock authentication system (no real backend API)
- Built for HNG Stage 2 Challenge

## Developer

**Joshua Kolawole (King)** - Frontend Developer  
HNG Internship Stage 2 Submission

## Repository Status

✓ Clean and professional  
✓ All documentation humanized  
✓ Deployment configurations ready  
✓ Comprehensive deployment guide included  
✓ Ready for submission
