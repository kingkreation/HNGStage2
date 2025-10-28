<template>
  <main class="auth-page">
    <div class="container">
      <div class="auth-form-wrapper">
        <div class="auth-card">
          <h1>Create Account</h1>
          <p class="auth-subtitle">Join us and start managing your tickets</p>

          <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                :class="{ 'field-error': errors.name }"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                :disabled="loading"
              />
              <div v-if="errors.name" id="name-error" class="error-message" role="alert">
                ⚠️ {{ errors.name }}
              </div>
            </div>

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
                ⚠️ {{ errors.email }}
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
                ⚠️ {{ errors.password }}
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :class="{ 'field-error': errors.confirmPassword }"
                :aria-describedby="errors.confirmPassword ? 'confirmPassword-error' : undefined"
                :disabled="loading"
              />
              <div v-if="errors.confirmPassword" id="confirmPassword-error" class="error-message" role="alert">
                ⚠️ {{ errors.confirmPassword }}
              </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Creating Account...' : 'Sign Up' }}
            </button>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <router-link to="/auth/login">Login</router-link></p>
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
const formData = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const errors = reactive({})
const loading = ref(false)

watch(() => authService.isAuthenticated(), (isAuth) => {
  if (isAuth) {
    router.push('/dashboard')
  }
}, { immediate: true })

const validateForm = () => {
  const newErrors = {}

  if (!formData.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email'
  }

  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
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
  const result = await authService.signup(formData.name, formData.email, formData.password)

  if (result.ok) {
    toastStore.addToast('Account created successfully!', 'success')
    router.push('/dashboard')
  } else {
    toastStore.addToast(result.message || 'Signup failed', 'error')
  }
  loading.value = false
}
</script>

<style scoped src="../styles/auth.css"></style>