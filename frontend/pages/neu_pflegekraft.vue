<template>
  <AnimatedBg>
    <h1
      class="neu_pflegekraft-title text-3xl font-extrabold text-purple-700 mb-6 drop-shadow-lg animate-fade-in flex items-center justify-center gap-3"
    >
      Neues Pflegekraft-Profil anlegen
    </h1>
    <div
      class="neu_pflegekraft-card bg-white/80 rounded-2xl shadow-xl px-4 py-6 flex flex-col items-center max-w-md w-full"
    >
      <CarerForm @created="handleCreated" />
      <div v-if="success" class="success-msg mt-4 text-green-700 font-bold text-base">
        Erfolgreich gespeichert!
      </div>
    </div>
  </AnimatedBg>
</template>

<script setup lang="ts">
import AnimatedBg from '~/components/AnimatedBg.vue';
import CarerForm from '~/components/CarerForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const success = ref(false);
const router = useRouter();

function handleCreated() {
  success.value = true;
  setTimeout(() => {
    success.value = false;
    router.push('/mein-profil');
  }, 1200);
}
</script>

<style scoped>
.neu_pflegekraft-title {
  font-size: 2.1rem;
  letter-spacing: -0.5px;
  text-align: center;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}
.neu_pflegekraft-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px 0 rgba(124, 58, 237, 0.13);
  backdrop-filter: blur(2px);
  border: 1px solid #e0f2fe;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
}
.success-msg {
  background: #e0ffe0;
  border-radius: 0.7rem;
  padding: 0.7rem 1.2rem;
  box-shadow: 0 2px 8px 0 rgba(34, 197, 94, 0.1);
}
</style>
