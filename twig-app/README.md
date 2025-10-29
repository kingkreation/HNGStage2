# Ticket App - PHP/Twig Implementation

This is the PHP version using Twig templates. After building the React and Vue SPAs, I wanted to see how a traditional server-rendered approach would compare. Turns out, there's something refreshing about server-side rendering that doesn't require a build step!

## Features

- Server-rendered pages with Twig templates
- Session-based authentication using PHP sessions
- Dashboard with ticket statistics
- Full CRUD operations for tickets
- Server-side form validation
- Responsive design
- Works without JavaScript (progressively enhanced)
- Accessible to screen readers

## Tech Stack

- **PHP 7.4+** - Server-side language
- **Twig 3.8** - Template engine for clean separation of logic and views
- **Composer** - Dependency management
- **PHP Sessions** - For authentication state
- **JSON files** - For data storage (keeping it simple)
- **CSS3** - Same styles as React and Vue versions

## Getting Started

You'll need PHP 7.4+ and Composer installed:

```bash
cd twig-app
composer install
php -S localhost:8000 -t public
```

Visit `http://localhost:8000` and you're good to go!

## Live Demo

Check out the live deployment at: https://kinghngstage2.onrender.com

You can also explore the other implementations:
- React version: https://kinghngstage2.vercel.app
- Vue.js version: https://kinghngstage2.netlify.app

## Project Structure

I kept it organized by separating concerns:

```
twig-app/
├── public/              # Web root
│   ├── index.php        # Main entry point and router
│   └── styles/          # CSS files
├── src/                 # PHP classes
│   ├── AuthService.php
│   └── TicketService.php
├── templates/           # Twig templates
│   ├── base.html
│   ├── landing.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   └── tickets.html
└── data/                # JSON data files
    └── tickets.json
```

## How It Works

Unlike the React and Vue versions, this app renders HTML on the server. Each request hits `public/index.php`, which:

1. Routes to the correct page based on the URL
2. Calls the appropriate service (Auth or Ticket)
3. Loads the Twig template
4. Passes data to the template
5. Returns rendered HTML

No client-side JavaScript needed for core functionality!

## Authentication

Sessions are managed through PHP's native `$_SESSION`. The session structure:

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

**Test credentials:**
- Email: demo@ticketapp.test  
- Password: Password123!

## Ticket Storage

Tickets are stored in `data/tickets.json` as a JSON array. Simple but effective for this demo. In production, you'd obviously use a real database.

Each ticket has:
- **id** - Auto-incremented
- **title** - Required
- **description** - Optional, 10+ characters if provided
- **status** - "open", "in_progress", or "closed"
- **priority** - "low", "medium", or "high"
- **createdAt** - Unix timestamp
- **updatedAt** - Unix timestamp

## Form Validation

Validation happens server-side in the `index.php` router:

- Title checked for emptiness
- Description length validated if present
- Status must match allowed values
- Priority must match allowed values

Errors are passed back to the template and displayed inline.

## Deploying to Render

I've set this up to deploy on Render using Docker. The `Dockerfile` packages everything with nginx and PHP-FPM.

**Deploy steps:**

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Select "Docker" as the environment
6. Render will build and deploy automatically

The `Dockerfile` handles:
- Installing PHP and nginx
- Running composer install
- Configuring nginx for PHP
- Starting both nginx and PHP-FPM

The `conf/nginx-site.conf` file sets up nginx to serve PHP files correctly.

## Twig Templates

I use template inheritance to keep things DRY. The `base.html` template has the header, footer, and main structure. All other templates extend it:

```twig
{% extends "base.html" %}

{% block title %}Dashboard{% endblock %}

{% block content %}
    <!-- Page-specific content here -->
{% endblock %}
```

Makes it super easy to maintain consistent layout across pages.

## Accessibility

Same accessibility standards as the React and Vue versions:

- Semantic HTML (header, nav, main, footer)
- Form labels properly connected
- Keyboard navigation friendly
- Logical heading hierarchy
- Good color contrast
- ARIA labels where helpful

## Development Tips

**Clearing data:** Just delete `data/tickets.json` and it'll regenerate

**Checking sessions:** Use browser dev tools to see cookies

**Debugging:** Check PHP error logs or add `var_dump()` in index.php

**Hot reload:** Unfortunately no hot reload like Vite. You'll need to refresh the browser manually.

## What I Learned

Building this version reminded me why server-side rendering is still relevant. No build process, no node_modules folder, just PHP serving HTML. Pages load instantly and work without JavaScript.

Twig's syntax is clean and keeps logic out of templates. Coming from JSX, it felt familiar but less "JavaScript-y". The template inheritance system is really well thought out.

The biggest challenge was managing form state without client-side reactivity. But server-side validation is actually more secure since you can't bypass it with browser dev tools.

## Production Considerations

For a real production app, you'd want to:

- Use a proper database (MySQL, PostgreSQL) instead of JSON files
- Add CSRF protection to forms
- Implement password hashing (bcrypt)
- Use environment variables for config
- Enable OPcache for better PHP performance
- Run behind a production web server (nginx + PHP-FPM)

But for this project's scope, the simple approach works perfectly.

## Known Issues

- No client-side form validation (all server-side)
- Page refreshes on every action (no SPA feel)
- Data stored in JSON files (not ideal for concurrent users)

These are intentional trade-offs to keep the server-rendered approach pure and simple.

---

Part of my HNG Stage 2 submission. Also check out the React and Vue implementations to see the same app with different approaches!
