<template>
  <main class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <div>
          <h1>Welcome, {{ user?.name }}! 👋</h1>
          <p>Here's an overview of your ticket system</p>
        </div>
        <router-link to="/tickets/new" class="btn btn-primary">
          + Create Ticket
        </router-link>
      </div>

      <div class="stats-grid" v-if="!loading">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>Total Tickets</h3>
            <p class="stat-number">{{ stats?.total || 0 }}</p>
          </div>
        </div>

        <div class="stat-card stat-open">
          <div class="stat-icon">🟢</div>
          <div class="stat-content">
            <h3>Open</h3>
            <p class="stat-number">{{ stats?.open || 0 }}</p>
          </div>
        </div>

        <div class="stat-card stat-in-progress">
          <div class="stat-icon">🟡</div>
          <div class="stat-content">
            <h3>In Progress</h3>
            <p class="stat-number">{{ stats?.inProgress || 0 }}</p>
          </div>
        </div>

        <div class="stat-card stat-closed">
          <div class="stat-icon">⚫</div>
          <div class="stat-content">
            <h3>Closed</h3>
            <p class="stat-number">{{ stats?.closed || 0 }}</p>
          </div>
        </div>
      </div>

      <div v-else class="loading">Loading...</div>

      <div class="dashboard-section">
        <h2>Quick Actions</h2>
        <div class="action-cards">
          <router-link to="/tickets" class="action-card">
            <div class="action-icon">📋</div>
            <h3>View All Tickets</h3>
            <p>See and manage all your tickets</p>
          </router-link>
          <router-link to="/tickets/new" class="action-card">
            <div class="action-icon">➕</div>
            <h3>Create New Ticket</h3>
            <p>Start a new ticket to track an issue</p>
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