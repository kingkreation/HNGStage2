# Multi-Framework Ticket Management App

Hey there! I'm Joshua Kolawole (you can call me King), and this is my Stage 2 submission for the HNG Internship. I built the same ticket management application three different ways - with React, Vue.js, and PHP/Twig - to demonstrate how different frameworks can achieve identical functionality and design.

## What This Project Is About

During this internship stage, I challenged myself to not just build one working app, but to build it three times using completely different tech stacks. The goal? Prove that I can adapt to any framework while maintaining consistent quality and user experience. Each version has the exact same features, the same look and feel, and the same attention to detail.

## About Me

I'm a frontend developer passionate about creating clean, accessible web experiences. This project pushed me to really understand the strengths and quirks of different frameworks instead of just sticking to what I'm comfortable with. Some late nights were definitely involved, but seeing all three versions working identically made it worth it!

## Features

All three implementations include:

- A landing page with a clean hero section
- User authentication (login and signup)
- Protected dashboard showing ticket statistics
- Full ticket CRUD - create, edit, and delete
- Form validation that actually helps users
- Toast notifications for feedback
- Mobile-responsive design
- Accessibility features throughout

## The Three Implementations

### React Version (`/react-app`)
**Stack:** React 18 + React Router + Vite

This was my most familiar territory. I used React hooks for state management and kept components nice and modular. The Context API handles toast notifications across the app.

**Running it:**
```bash
cd react-app
npm install
npm run dev
```

### Vue Version (`/vue-app`)
**Stack:** Vue 3 + Composition API + Pinia + Vite

Vue was newer to me, but I really enjoyed working with the Composition API. The reactivity system makes state updates feel natural. I used Pinia for state management, which felt cleaner than Vuex.

**Running it:**
```bash
cd vue-app
npm install
npm run dev
```

### Twig/PHP Version (`/twig-app`)
**Stack:** PHP + Twig 3 + Composer

This one was interesting because it's server-side rendered instead of a SPA. Sessions are handled through PHP's native $_SESSION, and data gets stored in JSON files. It reminded me that not everything needs to be a JavaScript framework.

**Running it:**
```bash
cd twig-app
composer install
php -S localhost:8000 -t public
```

## Deployment

I've set each app up for different deployment platforms:

- **React** → Vercel (configured with `vercel.json` for client-side routing)
- **Vue** → Netlify (has `netlify.toml` ready to go)
- **Twig** → Render (includes Dockerfile and nginx config)

Check out `DEPLOYMENT.md` for detailed deployment instructions for each platform.

## Try It Out

You can explore all three live implementations here:

- **React Version**: https://kinghngstage2.vercel.app
- **Vue.js Version**: https://kinghngstage2.netlify.app
- **PHP/Twig Version**: https://kinghngstage2.onrender.com

All three versions use the same demo credentials:
- **Email:** demo@ticketapp.test
- **Password:** Password123!

Or you can sign up with your own test account - the auth system accepts any signup but validates the demo credentials for login.

## Design System

I kept the design consistent across all three:

**Colors:**
- Primary blue: #3b82f6
- Purple accents: #8b5cf6
- Status colors: Green (#16a34a) for open, Amber (#f59e0b) for in progress, Gray (#6b7280) for closed

**Layout:**
- Max width of 1440px
- Responsive breakpoints at 320px, 768px, and 1024px
- Consistent spacing using CSS variables

**Shared Assets:**
The `/shared-assets` folder has SVG files and design tokens that all three apps reference to keep things consistent.

## Data Structure

Each version stores tickets with the same schema:

```json
{
  "id": 1,
  "title": "Fix login bug",
  "description": "Details about the issue",
  "status": "open",
  "priority": "high",
  "createdAt": 1690000000000,
  "updatedAt": 1690000000000
}
```

**Storage:**
- React & Vue: localStorage
- Twig: JSON files on the server

## What I Learned

Building the same app three times taught me way more than just building it once would have. I got to see firsthand how React's component philosophy differs from Vue's reactive approach, and how server-side rendering with PHP/Twig brings its own advantages (and challenges).

The biggest lesson? Each framework has its place. React felt natural for complex state management, Vue made reactivity incredibly smooth, and Twig reminded me that server-rendered apps can be fast and efficient without all the JavaScript overhead.

## Project Structure

```
├── react-app/           # React implementation
├── vue-app/             # Vue.js implementation  
├── twig-app/            # PHP/Twig implementation
├── shared-assets/       # Common SVGs and design tokens
├── DEPLOYMENT.md        # Deployment guides
└── README.md            # You're reading it!
```

## Testing the Apps

Here's what I manually tested on all three versions:

- Landing page renders correctly with wave SVG background
- Signup creates an account and redirects to dashboard
- Login works with demo credentials
- Dashboard shows accurate ticket counts
- Creating tickets validates all fields
- Editing tickets updates the timestamp
- Deleting tickets shows a confirmation modal first
- Logout clears the session properly
- Protected routes redirect when not logged in
- Everything works on mobile, tablet, and desktop sizes

## Accessibility

I made sure all three versions follow accessibility best practices:

- Semantic HTML throughout
- Proper heading hierarchy (h1, h2, h3 in logical order)
- Form labels properly connected to inputs
- Error messages linked with aria-describedby
- Keyboard navigation works everywhere
- Focus states are visible
- Color contrast meets WCAG AA standards

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari and Chrome on Android)

## Contributing

This is a personal learning project for HNG Stage 2, but if you spot any bugs or have suggestions, feel free to open an issue. Each framework's README has more specific technical details if you're curious about the implementation.

## Acknowledgments

Built as part of the HNG Internship Stage 2 challenge. Thanks to the HNG team for creating assignments that actually push us to learn, not just copy tutorials.

---

**Joshua Kolawole (King)** | Frontend Developer | HNG Stage 2
