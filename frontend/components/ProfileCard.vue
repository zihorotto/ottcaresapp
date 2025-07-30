<template>
  <div class="profile-card">
    <h2 class="profile-name">{{ carer.name }}</h2>
    <div class="profile-city">{{ carer.city }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ carer: { name: string; city: string } }>();
</script>

<style scoped>
.profile-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 320px;
  margin: 1rem auto;
  text-align: center;
}
.profile-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 0.3rem;
}
.profile-city {
  font-size: 1rem;
  color: #14b8a6;
}
</style>
