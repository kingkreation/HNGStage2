# Ticket App - React Implementation

A modern ticket management web application built with React, featuring authentication, dashboard analytics, and complete CRUD operations for ticket management.

## 🚀 Features

- **Landing Page**: Hero section with call-to-action buttons and feature showcase
- **Authentication**: Secure login and signup with session management
- **Dashboard**: Summary statistics of ticket system (total, open, in progress, closed)
- **Ticket Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Form Validation**: Real-time validation with inline error messages
- **Toast Notifications**: Success and error notifications for user feedback
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support

## 📋 Tech Stack

- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.20.0
- **State Management**: React Hooks (useState, useContext)
- **Styling**: CSS3 with CSS Variables
- **Build Tool**: Create React App

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the react-app directory:
```bash
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 🔐 Authentication

### Demo Credentials
- **Email**: `demo@ticketapp.test`
- **Password**: `Password123!`

### How Authentication Works

- Session tokens are stored in localStorage under the key `ticketapp_session`
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
- Protected routes redirect unauthenticated users to the login page
- Logging out clears the session and redirects to the landing page

## 📝 Ticket Management

### Ticket Data Structure

```javascript
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

### Header
- Navigation with responsive mobile menu
- Links to Home, Dashboard, Tickets
- Login/Signup or Logout button based on auth status

### Landing Page
- Hero section with wave SVG background
- Decorative circles
- Feature cards
- Framework showcase
- Call-to-action section

### Auth Pages
- Login form with email and password validation
- Signup form with password confirmation
- Demo credentials displayed
- Error messages with inline display

### Dashboard
- Summary statistics (total, open, in progress, closed tickets)
- Quick action cards
- Create ticket button

### Tickets Page
- List of all tickets with filtering by status
- Inline ticket creation/edit form
- Delete confirmation modal
- Real-time form validation
- Status tags with color coding

### Footer
- Company information
- Quick links
- Copyright notice

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy using Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or connect your GitHub repository to Netlify for automatic deployments.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## ♿ Accessibility Features

- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Proper heading hierarchy
- Form labels associated with inputs via `htmlFor`
- Error messages linked with `aria-describedby`
- Focus visible styles on interactive elements
- ARIA labels for icon buttons and regions
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- SVG decorative elements marked with `aria-hidden`

## 📁 Project Structure

```
react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Toast.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── ToastContext.js
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── Tickets.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── ticketService.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── toast.css
│   │   ├── landing.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── tickets.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 🔄 User Flows

### Landing Page → Login → Dashboard
1. User lands on the landing page
2. Clicks "Login" button
3. Enters demo credentials
4. Redirected to dashboard with session stored
5. Sees ticket statistics

### Create Ticket
1. Click "Create New Ticket" button
2. Fill form: Title (required), Description, Status, Priority
3. Form validates in real-time
4. Submit to add to ticket list
5. Success toast notification

### Edit Ticket
1. Click "Edit" button on a ticket
2. Form pre-fills with ticket data
3. Modify fields and submit
4. Updates ticket and redirects to list
5. Success notification

### Delete Ticket
1. Click "Delete" button on a ticket
2. Confirmation modal appears
3. Confirm deletion
4. Ticket removed from list
5. Success notification

## 🐛 Known Issues

- None currently documented

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

- Data is stored in localStorage and will persist in the browser
- To reset data, clear browser cache or use browser dev tools
- No external API calls - all data operations are local
- Mock authentication allows any signup but requires demo credentials for login

## 🤝 Contributing

This is a learning project for HNG Stage 2. For improvements or issues, please refer to the main repository README.

## 📄 License

This project is part of the HNG Stage 2 challenge.