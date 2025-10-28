# Ticket App - Twig/PHP Implementation

A modern ticket management web application built with Twig templates and PHP, featuring server-side rendering, authentication, dashboard analytics, and complete CRUD operations for ticket management.

## 🚀 Features

- **Landing Page**: Hero section with call-to-action buttons and feature showcase
- **Authentication**: Secure login and signup with session management
- **Dashboard**: Summary statistics of ticket system (total, open, in progress, closed)
- **Ticket Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Form Validation**: Server-side validation with inline error messages
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Server-Side Rendering**: Traditional Twig template engine for dynamic content

## 📋 Tech Stack

- **Language**: PHP 7.4+
- **Templating**: Twig 3.8
- **Package Manager**: Composer
- **Session Management**: PHP $_SESSION
- **Data Storage**: JSON files
- **Styling**: CSS3 with CSS Variables

## 🛠️ Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- Composer
- Web server (Apache, Nginx, or PHP built-in server)

### Installation

1. Navigate to the twig-app directory:
```bash
cd twig-app
```

2. Install dependencies with Composer:
```bash
composer install
```

3. Start the PHP development server:
```bash
php -S localhost:8000 -t public
```

The app will be available at `http://localhost:8000`

### Production Deployment

For production, use a proper web server like Apache or Nginx with PHP-FPM:

```bash
# Nginx configuration
server {
    listen 80;
    server_name example.com;
    root /path/to/twig-app/public;
    index index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

## 🔐 Authentication

### Demo Credentials
- **Email**: `demo@ticketapp.test`
- **Password**: `Password123!`

### How Authentication Works

- Sessions are stored in PHP $_SESSION with key `ticketapp_session`
- Session object structure:
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
- Protected pages check session and redirect unauthenticated users to login
- Logging out destroys the session and clears the session data

## 📝 Ticket Management

### Ticket Data Structure

Tickets are stored in `data/tickets.json`:

```json
{
  "id": 1,
  "title": "Fix login bug",
  "description": "Steps to reproduce...",
  "status": "open",
  "priority": "high",
  "createdAt": 1690000000000,
  "updatedAt": 1690000000000
}
```

### Validation Rules

- **Title**: Required, non-empty string
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, minimum 10 characters if provided
- **Priority**: Optional, must be one of: `low`, `medium`, `high`

### Status Colors

- 🟢 **Open** (Green): `#16a34a`
- 🟡 **In Progress** (Amber): `#f59e0b`
- ⚫ **Closed** (Gray): `#6b7280`

## 🎨 UI Components

### Page Structure
- **Landing Page**: Hero with wave SVG and decorative circles
- **Auth Pages**: Login and signup forms with validation
- **Dashboard**: Statistics cards and quick action links
- **Tickets Page**: List view with filtering and CRUD operations
- **Header/Footer**: Consistent navigation across all pages

### Template Organization
```
templates/
├── base.html          # Base template with header/footer
├── landing.html       # Landing page
├── login.html         # Login form
├── signup.html        # Signup form
├── dashboard.html     # Dashboard with stats
└── tickets.html       # Ticket list and management
```

## 🚀 Deployment

### Deploy to Render

1. Create a `render.yaml` file:
```yaml
services:
  - type: web
    name: ticket-app-twig
    env: php
    buildCommand: composer install
    startCommand: php -S 0.0.0.0:8080 -t public
    staticPublishPath: public
```

2. Connect GitHub repository to Render

### Deploy to Railway

1. Create `Procfile`:
```
web: php -S 0.0.0.0:$PORT -t public
```

2. Connect GitHub and deploy

### Deploy to Heroku

1. Create `Procfile`:
```
web: php -S 0.0.0.0:$PORT -t public
```

2. Deploy with Heroku CLI:
```bash
heroku create
git push heroku main
```

## ♿ Accessibility Features

- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Proper heading hierarchy
- Form labels associated with inputs via `for` attribute
- Error messages displayed inline
- Focus visible styles on interactive elements
- ARIA labels for buttons
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- SVG decorative elements marked with `aria-hidden`

## 📁 Project Structure

```
twig-app/
├── public/
│   ├── index.php          # Router and main entry point
│   ├── styles/            # CSS stylesheets
│   │   ├── index.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── landing.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── tickets.css
│
├── src/
│   ├── AuthService.php       # Authentication logic
│   └── TicketService.php     # Ticket CRUD operations
│
├── templates/
│   ├── base.html           # Base layout template
│   ├── landing.html        # Landing page
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── dashboard.html      # Dashboard
│   └── tickets.html        # Tickets management
│
├── data/
│   └── tickets.json        # Ticket data storage
│
├── composer.json           # PHP dependencies
└── README.md
```

## 🔄 Request Flow

1. **Request arrives** → `public/index.php`
2. **Router matches URL** → Determines which page to render
3. **Service classes process** → AuthService or TicketService handles logic
4. **Twig renders template** → Template receives data and outputs HTML
5. **Response sent** → Client receives rendered HTML

## 🧪 Testing

To manually test the application:

1. Load landing page and verify hero wave and decorative circles
2. Test signup and login flows
3. Verify dashboard displays correct statistics
4. Create, edit, and delete tickets
5. Test form validation with invalid inputs
6. Test responsive design at mobile (320px), tablet (768px), and desktop (1440px)
7. Test keyboard navigation through all interactive elements
8. Verify logout clears session and redirects

## 📝 Notes

- Data is stored in `data/tickets.json` file
- To reset data, delete the `data/tickets.json` file
- Sessions use PHP native $_SESSION
- No external dependencies except Twig
- Server-side rendering means all pages are generated on the server
- Mock authentication allows any signup but requires demo credentials for login

## 🤝 Contributing

This is a learning project for HNG Stage 2. For improvements or issues, please refer to the main repository README.

## 📄 License

This project is part of the HNG Stage 2 challenge.