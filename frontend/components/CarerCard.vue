<template>
  <div
    class="carer-card bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center animate-fade-in text-center"
    style="width: 340px; max-width: 420px; min-width: 320px"
  >
    <img
      v-if="carer.profileImageUrl"
      :src="carer.profileImageUrl?.replace(':3001', '')"
      alt="Profile picture"
      class="w-24 h-24 rounded-full mb-3 object-cover border-2 border-purple-200"
    />
    <div
      v-else
      class="w-24 h-24 rounded-full mb-3 bg-purple-100 flex items-center justify-center text-purple-400 text-4xl font-bold"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#e0f2fe" />
        <path d="M20 22c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" fill="#38bdf8" />
        <circle cx="20" cy="15" r="5" fill="#14b8a6" />
      </svg>
    </div>
    <h2 class="text-lg font-bold text-gray-900 mb-1 text-center">
      {{ carer.name }}
    </h2>
    <p class="text-gray-600 mb-1 text-center">{{ carer.city }}</p>
    <p class="text-gray-500 mb-2 text-center">{{ carer.experience }} Jahre Erfahrung</p>
    <p
      :class="carer.available ? 'text-green-600' : 'text-red-600'"
      class="font-semibold mb-2 text-center"
    >
      {{ carer.available ? 'Verfügbar' : 'Nicht verfügbar' }}
    </p>
    <NuxtLink :to="`/carer/${carer._id}`" class="modern-btn small-btn">
      <span>Profil anzeigen</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ carer: any }>();
</script>

<style scoped>
.carer-card {
  transition:
    transform 0.18s,
    box-shadow 0.18s;
  width: 100%;
  max-width: 420px;
  min-width: 320px;

  padding: 1.5rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  background-color: white;
  border-radius: 1rem;
}
.carer-card:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.22);
}
.modern-btn {
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 4px 16px 0 rgba(124, 58, 237, 0.18);
  border: none;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    background 0.2s;
  outline: none;
  position: relative;
  overflow: hidden;
}
.modern-btn:hover,
.modern-btn:focus {
  transform: scale(1.06);
  background: linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%);
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.28);
}
.modern-btn span {
  position: relative;
  z-index: 2;
}
.small-btn {
  font-size: 0.95rem;
  padding: 0.5rem 1.2rem;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.7s ease;
}
</style>
