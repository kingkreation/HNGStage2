<template>
  <div class="toast-container" role="region" aria-label="Notifications">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
      role="alert"
    >
      <div class="toast-content">
        {{ toast.message }}
      </div>
      <button
        class="toast-close"
        @click="toastStore.removeToast(toast.id)"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
</script>

<style scoped src="../styles/toast.css"></style>