<template>
  <main class="tickets-page">
    <div class="container">
      <div class="tickets-header">
        <h1>Ticket Management</h1>
        <button
          v-if="!editingId"
          class="btn btn-primary"
          @click="startNewTicket"
        >
          + Create New Ticket
        </button>
      </div>

      <div v-if="editingId" class="ticket-form-card">
        <h2>{{ editingId === 'new' ? 'Create New Ticket' : 'Edit Ticket' }}</h2>
        <form @submit.prevent="handleSubmit" novalidate>
          <div class="form-group">
            <label for="title">Title *</label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              :class="{ 'field-error': errors.title }"
              :aria-describedby="errors.title ? 'title-error' : undefined"
              placeholder="Brief description of the issue"
            />
            <div v-if="errors.title" id="title-error" class="error-message" role="alert">
              ⚠️ {{ errors.title }}
            </div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              :class="{ 'field-error': errors.description }"
              :aria-describedby="errors.description ? 'description-error' : undefined"
              placeholder="Detailed description (min 10 characters)"
              rows="4"
            ></textarea>
            <div v-if="errors.description" id="description-error" class="error-message" role="alert">
              ⚠️ {{ errors.description }}
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="status">Status *</label>
              <select
                id="status"
                v-model="formData.status"
                :class="{ 'field-error': errors.status }"
                :aria-describedby="errors.status ? 'status-error' : undefined"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <div v-if="errors.status" id="status-error" class="error-message" role="alert">
                ⚠️ {{ errors.status }}
              </div>
            </div>

            <div class="form-group">
              <label for="priority">Priority</label>
              <select id="priority" v-model="formData.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              {{ editingId === 'new' ? 'Create Ticket' : 'Update Ticket' }}
            </button>
            <button type="button" class="btn btn-outline" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div class="tickets-controls">
        <div class="filter-group">
          <label for="filter">Filter by Status:</label>
          <select id="filter" v-model="filterStatus">
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <p class="tickets-count">{{ filteredTickets.length }} ticket(s)</p>
      </div>

      <div v-if="loading" class="loading">Loading tickets...</div>
      <div v-else-if="filteredTickets.length === 0" class="empty-state">
        <p>No tickets found</p>
      </div>
      <div v-else class="tickets-list">
        <div v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-item">
          <div class="ticket-header">
            <h3>{{ ticket.title }}</h3>
            <span :class="['status-tag', getStatusColor(ticket.status)]">
              {{ ticket.status.replace('_', ' ') }}
            </span>
          </div>
          <p v-if="ticket.description" class="ticket-description">
            {{ ticket.description }}
          </p>
          <div class="ticket-meta">
            <span class="priority">Priority: <strong>{{ ticket.priority }}</strong></span>
            <span class="date">
              Updated: {{ new Date(ticket.updatedAt).toLocaleDateString() }}
            </span>
          </div>
          <div class="ticket-actions">
            <button class="btn btn-secondary" @click="handleEdit(ticket)">
              ✏️ Edit
            </button>
            <button class="btn btn-danger" @click="showDeleteConfirm = ticket.id">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      <div v-if="showDeleteConfirm" class="modal active">
        <div class="modal-content">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-danger" @click="handleDelete">
              Yes, Delete
            </button>
            <button class="btn btn-outline" @click="showDeleteConfirm = null">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/authService'
import { ticketService } from '../services/ticketService'
import { useToastStore } from '../stores/toastStore'

const router = useRouter()
const route = useRoute()
const toastStore = useToastStore()
const tickets = ref([])
const loading = ref(true)
const filterStatus = ref('all')
const editingId = ref(null)
const formData = reactive({ title: '', description: '', status: 'open', priority: 'low' })
const errors = reactive({})
const showDeleteConfirm = ref(null)

const filteredTickets = computed(() =>
  filterStatus.value === 'all'
    ? tickets.value
    : tickets.value.filter(t => t.status === filterStatus.value)
)

onMounted(async () => {
  const session = authService.getSession()
  if (!session) {
    toastStore.addToast('Your session has expired — please log in again', 'error')
    router.push('/auth/login')
    return
  }
  await loadTickets()

  if (route.params.ticketId === 'new') {
    startNewTicket()
  }
})

watch(() => route.params.ticketId, (ticketId) => {
  if (ticketId === 'new') {
    startNewTicket()
  }
})

const loadTickets = async () => {
  loading.value = true
  const result = await ticketService.getAllTickets()
  if (result.ok) {
    tickets.value = result.data
  } else {
    toastStore.addToast(result.message || 'Failed to load tickets', 'error')
  }
  loading.value = false
}

const startNewTicket = () => {
  editingId.value = 'new'
  Object.assign(formData, { title: '', description: '', status: 'open', priority: 'low' })
  Object.assign(errors, {})
}

const handleEdit = (ticket) => {
  editingId.value = ticket.id
  Object.assign(formData, {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority
  })
}

const handleSubmit = async () => {
  let result
  if (editingId.value === 'new') {
    result = await ticketService.createTicket(formData)
  } else {
    result = await ticketService.updateTicket(editingId.value, formData)
  }

  if (result.ok) {
    toastStore.addToast(result.message, 'success')
    editingId.value = null
    Object.assign(formData, { title: '', description: '', status: 'open', priority: 'low' })
    Object.assign(errors, {})
    await loadTickets()
  } else {
    if (result.errors) {
      Object.assign(errors, result.errors)
    } else {
      toastStore.addToast(result.message, 'error')
    }
  }
}

const cancelEdit = () => {
  editingId.value = null
  Object.assign(formData, { title: '', description: '', status: 'open', priority: 'low' })
  Object.assign(errors, {})
}

const handleDelete = async () => {
  const result = await ticketService.deleteTicket(showDeleteConfirm.value)
  if (result.ok) {
    toastStore.addToast(result.message, 'success')
    showDeleteConfirm.value = null
    await loadTickets()
  } else {
    toastStore.addToast(result.message, 'error')
  }
}

const getStatusColor = (status) => {
  const colors = {
    open: 'status-open',
    in_progress: 'status-in-progress',
    closed: 'status-closed'
  }
  return colors[status] || 'status-open'
}
</script>

<style scoped src="../styles/tickets.css"></style>