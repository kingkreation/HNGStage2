<template>
  <main class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <div>
          <h1>Welcome back, {{ user?.name }}</h1>
          <p>Here's an overview of your ticket system performance</p>
        </div>
        <router-link to="/tickets/new" class="btn btn-primary">
          Create New Ticket
        </router-link>
      </div>

      <div class="stats-grid" v-if="!loading">
        <div class="stat-card">
          <div class="stat-content">
            <h3>Total Tickets</h3>
            <p class="stat-number">{{ stats?.total || 0 }}</p>
            <span class="stat-label">All Issues</span>
          </div>
        </div>

        <div class="stat-card stat-open">
          <div class="stat-content">
            <h3>Open</h3>
            <p class="stat-number">{{ stats?.open || 0 }}</p>
            <span class="stat-label">Need Attention</span>
          </div>
        </div>

        <div class="stat-card stat-in-progress">
          <div class="stat-content">
            <h3>In Progress</h3>
            <p class="stat-number">{{ stats?.inProgress || 0 }}</p>
            <span class="stat-label">Being Worked On</span>
          </div>
        </div>

        <div class="stat-card stat-closed">
          <div class="stat-content">
            <h3>Closed</h3>
            <p class="stat-number">{{ stats?.closed || 0 }}</p>
            <span class="stat-label">Resolved</span>
          </div>
        </div>
      </div>

      <div v-else class="loading">Loading...</div>

      <div class="dashboard-section">
        <h2>Quick Actions</h2>
        <div class="action-cards">
          <router-link to="/tickets" class="action-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            <h3>View All Tickets</h3>
            <p>Browse and manage your existing tickets</p>
          </router-link>
          <router-link to="/tickets/new" class="action-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 4v16m8-8H4"></path>
            </svg>
            <h3>Create New Ticket</h3>
            <p>Report a new issue or request</p>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import { ticketService } from '../services/ticketService'
import { useToastStore } from '../stores/toastStore'

const router = useRouter()
const toastStore = useToastStore()
const user = ref(null)
const stats = reactive({})
const loading = ref(true)

onMounted(async () => {
  const session = authService.getSession()
  if (!session) {
    toastStore.addToast('Your session has expired — please log in again', 'error')
    router.push('/auth/login')
    return
  }
  user.value = session.user
  await loadStats()
})

const loadStats = async () => {
  loading.value = true
  const result = await ticketService.getStats()
  if (result.ok) {
    Object.assign(stats, result.data)
  } else {
    toastStore.addToast(result.message || 'Failed to load statistics', 'error')
  }
  loading.value = false
}
</script>

<style scoped src="../styles/dashboard.css"></style>