const TICKETS_KEY = 'ticketapp_tickets'

const INITIAL_TICKETS = [
  {
    id: 1,
    title: 'Fix login bug',
    description: 'Users unable to login with special characters in password',
    status: 'open',
    priority: 'high',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: 2,
    title: 'Update dashboard UI',
    description: 'Redesign dashboard for better UX',
    status: 'in_progress',
    priority: 'medium',
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: 3,
    title: 'Add dark mode',
    description: 'Implement dark theme option',
    status: 'closed',
    priority: 'low',
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 172800000
  }
]

const initializeTickets = () => {
  if (!localStorage.getItem(TICKETS_KEY)) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(INITIAL_TICKETS))
  }
}

export const ticketService = {
  getAllTickets: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        resolve({ ok: true, data: tickets })
      }, 300)
    })
  },

  getTicketById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        const ticket = tickets.find(t => t.id === parseInt(id))
        if (ticket) {
          resolve({ ok: true, data: ticket })
        } else {
          resolve({ ok: false, message: 'Ticket not found' })
        }
      }, 300)
    })
  },

  createTicket: async (ticketData) => {
    const validation = validateTicket(ticketData)
    if (!validation.ok) {
      return validation
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        const newTicket = {
          id: Math.max(...tickets.map(t => t.id), 0) + 1,
          title: ticketData.title.trim(),
          description: ticketData.description?.trim() || '',
          status: ticketData.status,
          priority: ticketData.priority || 'low',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        tickets.push(newTicket)
        localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
        resolve({ ok: true, data: newTicket, message: 'Ticket created successfully' })
      }, 300)
    })
  },

  updateTicket: async (id, ticketData) => {
    const validation = validateTicket(ticketData)
    if (!validation.ok) {
      return validation
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        const index = tickets.findIndex(t => t.id === parseInt(id))

        if (index === -1) {
          resolve({ ok: false, message: 'Ticket not found' })
          return
        }

        tickets[index] = {
          ...tickets[index],
          title: ticketData.title.trim(),
          description: ticketData.description?.trim() || '',
          status: ticketData.status,
          priority: ticketData.priority || 'low',
          updatedAt: Date.now()
        }
        localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
        resolve({ ok: true, data: tickets[index], message: 'Ticket updated successfully' })
      }, 300)
    })
  },

  deleteTicket: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        const filteredTickets = tickets.filter(t => t.id !== parseInt(id))

        if (filteredTickets.length === tickets.length) {
          resolve({ ok: false, message: 'Ticket not found' })
          return
        }

        localStorage.setItem(TICKETS_KEY, JSON.stringify(filteredTickets))
        resolve({ ok: true, message: 'Ticket deleted successfully' })
      }, 300)
    })
  },

  getStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        initializeTickets()
        const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
        const stats = {
          total: tickets.length,
          open: tickets.filter(t => t.status === 'open').length,
          inProgress: tickets.filter(t => t.status === 'in_progress').length,
          closed: tickets.filter(t => t.status === 'closed').length
        }
        resolve({ ok: true, data: stats })
      }, 200)
    })
  }
}

const validateTicket = (data) => {
  const errors = {}

  if (!data.title || !data.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!data.status) {
    errors.status = 'Status is required'
  } else if (!['open', 'in_progress', 'closed'].includes(data.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed'
  }

  if (data.description && data.description.trim().length > 0 && data.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters'
  }

  if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.priority = 'Priority must be one of: low, medium, high'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: 'Validation failed', errors }
  }

  return { ok: true }
}