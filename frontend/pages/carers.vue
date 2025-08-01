<template>
  <AnimatedBg>
    <div class="carers-card-list w-full max-w-8xl mx-auto py-10 px-2">
      <div v-if="error" class="error-message text-red-600 text-center text-lg py-4">
        {{ error }}
      </div>
      <CarerList v-else :carers="carers" />
    </div>
  </AnimatedBg>
</template>

<script setup lang="ts">
import AnimatedBg from '~/components/AnimatedBg.vue';
definePageMeta({ layout: 'default' });
import { ref } from 'vue';
import CarerList from '~/components/CarerList.vue';
import { createUserManager, signOutRedirect } from '~/src/plugins/cognitoOidc';
const carers = ref<any[]>([]);
const error = ref<string | null>(null);

function handleLogin() {
  const userManager = createUserManager();
  userManager.signinRedirect();
}
function handleLogout() {
  signOutRedirect();
}

async function fetchCarers() {
  const userManager = createUserManager();
  const user = await userManager.getUser();
  if (!user) return;
  try {
    const res = await fetch('https://16.171.144.204/carers', {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    const allCarers = await res.json();
    if (Array.isArray(allCarers)) {
      carers.value = allCarers;
      error.value = null;
    } else {
      carers.value = [];
      error.value = allCarers.error || 'Ismeretlen hiba történt.';
    }
  } catch (e: any) {
    carers.value = [];
    error.value = e.message || 'Ismeretlen hiba történt.';
  }
}

fetchCarers();
</script>

<style scoped>
/* Responsive card-list container */
.carers-card-list {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  backdrop-filter: blur(4px);
  border: 1px solid #e0f2fe;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
/* Removed carers-bg, now handled by AnimatedBg */
@keyframes bg-diagonal {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
.carers-card {
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  backdrop-filter: blur(4px);
  border: 1px solid #e9d5ff;
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

/* --- Responsive Styles (combined and optimized) --- */
@media (max-width: 900px) {
  .carers-card-list {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
}

@media (max-width: 600px) {
  .carers-card-list {
    padding: 0.5rem 0.1rem;
    max-width: 99vw;
  }
  h1 {
    font-size: 2rem;
  }
}

/* --- Animations --- */
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
