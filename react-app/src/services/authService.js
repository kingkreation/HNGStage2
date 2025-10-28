const SESSION_KEY = 'ticketapp_session';

// Mock credentials
const DEMO_USER = {
  email: 'demo@ticketapp.test',
  password: 'Password123!'
};

export const authService = {
  // Login user
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
          const session = {
            token: 'mock-token-' + Date.now(),
            user: {
              id: 1,
              name: 'Demo User',
              email: email
            }
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          resolve({ ok: true, data: session });
        } else {
          resolve({ ok: false, message: 'Invalid email or password' });
        }
      }, 500);
    });
  },

  // Signup user
  signup: async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in real app would check against backend
        if (email && password && name) {
          const session = {
            token: 'mock-token-' + Date.now(),
            user: {
              id: Date.now(),
              name: name,
              email: email
            }
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
          resolve({ ok: true, data: session });
        } else {
          resolve({ ok: false, message: 'All fields are required' });
        }
      }, 500);
    });
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Get current session
  getSession: () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  },

  // Validate session
  validateSession: () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) {
      return { ok: false, message: 'Your session has expired — please log in again' };
    }
    try {
      JSON.parse(session);
      return { ok: true };
    } catch {
      return { ok: false, message: 'Your session has expired — please log in again' };
    }
  }
};