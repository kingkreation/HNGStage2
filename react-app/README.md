# Ticket App - React Implementation

This is the React version of my ticket management app. I built it using React 18 with hooks and Vite as the build tool. It was the first version I completed since React is what I'm most comfortable with.

## Features

- Landing page with a wavy SVG hero section
- User authentication with login/signup
- Dashboard showing ticket statistics
- Full CRUD operations for tickets
- Real-time form validation
- Toast notifications for user feedback
- Fully responsive design
- Accessibility features built in

## Tech Stack

- **React 18.2.0** - Using hooks (useState, useContext, useEffect)
- **React Router 6.20.0** - For navigation and protected routes
- **Vite 5.0.0** - Much faster than Create React App
- **Context API** - For toast notifications
- **CSS3** - With CSS variables for theming

## Getting Started

Make sure you have Node.js installed (v14 or higher), then:

```bash
cd react-app
npm install
npm run dev
```

The app will start at `http://localhost:5173`

## Live Demo

Check out the live deployment at: https://kinghngstage2.vercel.app

You can also explore the other implementations:
- Vue.js version: https://kinghngstage2.netlify.app
- PHP/Twig version: https://kinghngstage2.onrender.com

...

## How I Structured It

I kept the components modular and reusable:

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Toast.jsx
│   └── ProtectedRoute.jsx
├── pages/               # Full page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   └── Tickets.jsx
├── services/            # Business logic
│   ├── authService.js
│   └── ticketService.js
├── context/             # React Context for state
│   └── ToastContext.jsx
└── styles/              # Component-specific CSS
```

## Authentication

I use localStorage to persist sessions. The session structure looks like this:

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

**Demo credentials:**
- Email: demo@ticketapp.test
- Password: Password123!

Protected routes check for a valid session and redirect to login if it's missing.

## Ticket Management

Tickets are stored in localStorage under the key `ticketapp_tickets`. Each ticket has:

- **id** - Auto-incremented
- **title** - Required
- **description** - Optional, but must be at least 10 characters if provided
- **status** - Must be "open", "in_progress", or "closed"
- **priority** - Can be "low", "medium", or "high"
- **createdAt** - Timestamp
- **updatedAt** - Updates whenever the ticket is modified

## Form Validation

I added real-time validation so users get immediate feedback:

- Title field validates on blur and shows an error if empty
- Description validates length if provided
- Status and priority use dropdowns to prevent invalid values
- Form submit is disabled until all required fields are valid

## Deploying to Vercel

I've already set this up for Vercel deployment. Just connect your GitHub repo and Vercel will auto-detect Vite and deploy it correctly.

The `vercel.json` file ensures client-side routing works in production by redirecting all requests to `index.html`.

**Quick deploy:**
```bash
npm install -g vercel
vercel --prod
```

You can also deploy to Netlify if you prefer - the `netlify.toml` file is already configured.

## Accessibility

I made sure this app is accessible:

- All interactive elements are keyboard navigable
- Form labels are properly associated with inputs
- Error messages use aria-describedby
- Semantic HTML throughout (header, main, nav, footer)
- Color contrast meets WCAG AA standards
- Focus states are visible

## Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized bundle in the `dist/` directory.

## What I Learned

This was my chance to really solidify my React knowledge. I experimented with Context API for global state (for the toast notifications) and made sure to keep components focused on one responsibility. The hardest part was getting the form validation to feel smooth without being annoying.

Vite was a game changer compared to Create React App - the hot reload is instant and builds are way faster.

## Known Issues

None that I'm aware of! If you find any, let me know.

## Notes

- All data is stored in the browser's localStorage
- To reset everything, just clear your browser storage
- No backend server needed - it's all client-side
- The ticket service handles all CRUD operations through localStorage

---

Part of my HNG Stage 2 submission. Check the main README for the Vue and Twig versions!
