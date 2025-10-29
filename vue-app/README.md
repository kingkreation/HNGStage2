# Ticket App - Vue.js Implementation

This is the Vue 3 version of my ticket management app. I wanted to learn Vue's Composition API properly, so this was a great excuse to dive deep into it. The reactivity system is honestly pretty elegant once you get used to it.

## Features

- Clean landing page with SVG wave animations
- Login and signup with session management
- Dashboard with live ticket statistics
- Full CRUD for managing tickets
- Form validation that feels natural
- Toast notifications using Pinia
- Works great on mobile and desktop
- Built with accessibility in mind

## Tech Stack

- **Vue 3.4.0** - Using Composition API
- **Vue Router 4.2.0** - For routing and navigation guards
- **Pinia 2.1.0** - For managing toast notification state
- **Vite 5.0.0** - Lightning fast dev server and builds
- **CSS3** - With CSS variables matching the other versions

## Getting Started

You'll need Node.js (v14+), then:

```bash
cd vue-app
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Project Structure

I organized everything by feature type:

```
src/
├── components/          # Reusable components
│   ├── Header.vue
│   ├── Footer.vue
│   └── Toast.vue
├── pages/               # Route components
│   ├── Landing.vue
│   ├── Login.vue
│   ├── Signup.vue
│   ├── Dashboard.vue
│   └── Tickets.vue
├── router/              # Vue Router setup
│   └── index.js
├── services/            # Business logic
│   ├── authService.js
│   └── ticketService.js
├── stores/              # Pinia stores
│   └── toastStore.js
└── styles/              # Component styles
```

## Authentication Flow

Sessions are stored in localStorage. The session object:

```json
{
  "token": "mock-token-timestamp",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@ticketapp.test"
  }
}
```

**Test it with:**
- Email: demo@ticketapp.test
- Password: Password123!

I use Vue Router's navigation guards to protect routes. If you try to access the dashboard without logging in, you get redirected to the login page.

## Ticket Data

Tickets live in localStorage under `ticketapp_tickets`. Each one has:

- **id** - Generated incrementally
- **title** - Required field
- **description** - Optional but must be 10+ characters if you add it
- **status** - "open", "in_progress", or "closed"
- **priority** - "low", "medium", or "high"
- **createdAt** - When it was created
- **updatedAt** - Last modification time

## How Validation Works

I use Vue's reactive refs to track form state and errors. Validation happens on blur for most fields and on submit. Error messages appear inline below each field, and the submit button stays disabled until everything's valid.

## Deploying to Netlify

This project is ready to deploy to Netlify. The `netlify.toml` file is already configured with the right build command and publish directory.

**Deploy via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify init
```

Or just connect your GitHub repo to Netlify and it handles everything automatically.

**Deploy via Git:**
1. Push to GitHub
2. Go to Netlify and click "New site from Git"
3. Choose your repo
4. Netlify auto-detects Vite and deploys

The redirects rule in `netlify.toml` ensures Vue Router works correctly in production.

## Using Pinia

I used Pinia for the toast store because it's simpler than Vuex and works great with the Composition API. The toast store handles showing success/error messages across the entire app.

```javascript
import { useToastStore } from '@/stores/toastStore'

const toast = useToastStore()
toast.showToast('Ticket created!', 'success')
```

## Accessibility Features

I made sure this is accessible:

- Semantic HTML elements everywhere
- Keyboard navigation works throughout
- Form labels connected to inputs
- Error messages use aria-describedby
- Proper heading hierarchy
- Focus states are clearly visible
- Good color contrast ratios

## Production Build

To build for production:

```bash
npm run build
```

Creates an optimized bundle in `dist/`. You can preview it locally with:

```bash
npm run preview
```

## What I Learned

Vue's Composition API felt weird at first coming from React, but I grew to really like it. The ref and reactive system makes state management intuitive, and Pinia is way cleaner than Redux ever was.

The router's navigation guards are super handy for protecting routes, and overall Vue felt more batteries-included than React without being as opinionated as Angular.

## Things to Know

- All data is client-side in localStorage
- No backend required
- Clear your browser storage to reset data
- The ticket service module handles all CRUD operations
- Pinia store persists toasts across route changes

## Potential Improvements

If I had more time, I'd add:
- Ticket filtering by status and priority
- Search functionality
- Export tickets to CSV
- Dark mode toggle

But for the scope of this project, it covers all the requirements!

---

One of three implementations for my HNG Stage 2 submission. Check out the React and Twig versions too!
