<template>
  <AnimatedBg>
    <h1
      class="add-carer-title text-5xl font-extrabold text-purple-700 mb-10 drop-shadow-lg animate-fade-in flex items-center justify-center gap-4"
    ></h1>
    <div
      class="add-carer-card bg-white/80 rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center max-w-xl w-full"
    >
      <CarerForm @created="handleCreated" />
      <div
        v-if="success"
        class="success-msg mt-6 text-green-700 font-bold text-lg"
      >
        Successfully saved!
      </div>
    </div>
  </AnimatedBg>
</template>

<script setup lang="ts">
import AnimatedBg from "~/components/AnimatedBg.vue";
import CarerForm from "~/components/CarerForm.vue";
import { ref } from "vue";
const success = ref(false);
function handleCreated() {
  success.value = true;
  setTimeout(() => (success.value = false), 2000);
}
</script>

<style scoped>
/* Removed add-carer-bg, now handled by AnimatedBg */
.add-carer-title {
  font-size: 3.2rem;
  letter-spacing: -1px;
  text-align: center;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}
.confetti-wrapper {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}
.confetti-svg {
  width: 60px;
  height: 30px;
  vertical-align: middle;
  filter: drop-shadow(0 2px 8px #38bdf8);
}
.add-carer-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  backdrop-filter: blur(4px);
  border: 1px solid #e0f2fe;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.success-msg {
  background: #e0ffe0;
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px 0 rgba(34, 197, 94, 0.12);
}
</style>
