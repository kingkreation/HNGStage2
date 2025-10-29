<template>
  <main class="auth-page">
    <div class="container">
      <div class="auth-form-wrapper">
        <div class="auth-card">
          <h1>Login</h1>
          <p class="auth-subtitle">Welcome back! Login to your account</p>

          <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                :class="{ 'field-error': errors.email }"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                :disabled="loading"
              />
              <div v-if="errors.email" id="email-error" class="error-message" role="alert">
                {{ errors.email }}
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                :class="{ 'field-error': errors.password }"
                :aria-describedby="errors.password ? 'password-error' : undefined"
                :disabled="loading"
              />
              <div v-if="errors.password" id="password-error" class="error-message" role="alert">
                {{ errors.password }}
              </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? <router-link to="/auth/signup">Sign up</router-link></p>
          </div>

          <div class="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: demo@ticketapp.test</p>
            <p>Password: Password123!</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import { useToastStore } from '../stores/toastStore'

const router = useRouter()
const toastStore = useToastStore()
const formData = reactive({ email: '', password: '' })
const errors = reactive({})
const loading = ref(false)

watch(() => authService.isAuthenticated(), (isAuth) => {
  if (isAuth) {
    router.push('/dashboard')
  }
}, { immediate: true })

const validateForm = () => {
  const newErrors = {}
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email'
  }
  if (!formData.password) {
    newErrors.password = 'Password is required'
  }
  return newErrors
}

const handleSubmit = async () => {
  const newErrors = validateForm()
  Object.assign(errors, newErrors)

  if (Object.keys(newErrors).length > 0) {
    return
  }

  loading.value = true
  const result = await authService.login(formData.email, formData.password)

  if (result.ok) {
    toastStore.addToast('Login successful!', 'success')
    router.push('/dashboard')
  } else {
    toastStore.addToast(result.message || 'Login failed', 'error')
  }
  loading.value = false
}
</script>

<style scoped src="../styles/auth.css"></style>