<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Ticket App</h3>
          <p>A modern ticket management system built with React, Vue, and Twig.</p>
        </div>

        <div class="footer-section">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Documentation</a></li>
            <li><a href="/">Support</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Contact</h4>
          <p>Email: support@ticketapp.test</p>
          <p>© {{ currentYear }} Ticket App. All rights reserved.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>Built with ❤️ for HNG Stage 2</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped src="../styles/footer.css"></style>