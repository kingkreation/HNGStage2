<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>🎫 Ticket App</h1>
        </router-link>

        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav :class="['nav', { active: isMobileMenuOpen }]">
          <router-link to="/" class="nav-link">Home</router-link>

          <template v-if="isAuthenticated">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/tickets" class="nav-link">Tickets</router-link>
          </template>

          <template v-if="isAuthenticated">
            <button class="btn btn-outline nav-btn" @click="handleLogout">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link to="/auth/login" class="btn btn-primary nav-btn">
              Login
            </router-link>
            <router-link to="/auth/signup" class="btn btn-secondary nav-btn">
              Sign Up
            </router-link>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/authService'
import { useToastStore } from '../stores/toastStore'

const router = useRouter()
const route = useRoute()
const toastStore = useToastStore()
const isAuthenticated = ref(authService.isAuthenticated())
const isMobileMenuOpen = ref(false)

watch(() => route.path, () => {
  isAuthenticated.value = authService.isAuthenticated()
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  authService.logout()
  isAuthenticated.value = false
  isMobileMenuOpen.value = false
  toastStore.addToast('Logged out successfully', 'success')
  router.push('/')
}
</script>

<style scoped src="../styles/header.css"></style>