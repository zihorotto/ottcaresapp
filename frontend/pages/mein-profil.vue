<template>
  <AnimatedBg>
    <h1
      class="neu_pflegekraft-title text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-lg animate-fade-in flex items-center justify-center gap-3"
    >
      Mein Profil
    </h1>
    <div
      class="neu_pflegekraft-card bg-white/80 rounded-2xl shadow-xl px-4 py-6 flex flex-col items-center max-w-md w-full"
    >
      <div v-if="profile && profile.role" class="mb-2 text-base font-semibold text-purple-700">
        Rolle:
        {{ profile.role.charAt(0).toUpperCase() + profile.role.slice(1) }}
      </div>
      <CarerForm :profile="profile" :loading="loading" @created="handleUpdated" />
      <div v-if="success" class="success-msg mt-4 text-green-700 font-bold text-base">
        Erfolgreich aktualisiert!
      </div>
    </div>
  </AnimatedBg>
</template>

<script setup lang="ts">
import AnimatedBg from '~/components/AnimatedBg.vue';
import CarerForm from '~/components/CarerForm.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const success = ref(false);
const profile = ref(null);
const loading = ref(true);

async function fetchProfile() {
  try {
    const { createUserManager } = await import('~/src/plugins/cognitoOidc');
    const userManager = createUserManager();
    const user = await userManager.getUser();
    const idToken = user?.access_token;
    if (!idToken) throw new Error('No access_token');
    const res = await axios.get('/api/carers/me', {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    profile.value = res.data;
  } catch (e) {
    profile.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProfile);

function handleUpdated() {
  success.value = true;
  setTimeout(() => (success.value = false), 2000);
  fetchProfile();
}
</script>
