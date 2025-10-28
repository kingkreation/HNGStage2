const SESSION_KEY = 'ticketapp_session'

const DEMO_USER = {
  email: 'demo@ticketapp.test',
  password: 'Password123!'
}

export const authService = {
  login: async (email, password) => {
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
          }
          localStorage.setItem(SESSION_KEY, JSON.stringify(session))
          resolve({ ok: true, data: session })
        } else {
          resolve({ ok: false, message: 'Invalid email or password' })
        }
      }, 500)
    })
  },

  signup: async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password && name) {
          const session = {
            token: 'mock-token-' + Date.now(),
            user: {
              id: Date.now(),
              name: name,
              email: email
            }
          }
          localStorage.setItem(SESSION_KEY, JSON.stringify(session))
          resolve({ ok: true, data: session })
        } else {
          resolve({ ok: false, message: 'All fields are required' })
        }
      }, 500)
    })
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY)
  },

  getSession: () => {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY)
  },

  validateSession: () => {
    const session = localStorage.getItem(SESSION_KEY)
    if (!session) {
      return { ok: false, message: 'Your session has expired — please log in again' }
    }
    try {
      JSON.parse(session)
      return { ok: true }
    } catch {
      return { ok: false, message: 'Your session has expired — please log in again' }
    }
  }
}