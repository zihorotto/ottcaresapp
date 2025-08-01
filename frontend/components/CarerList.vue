<template>
  <div class="carer-list">
    <CarerCard v-for="carer in carers" :key="carer.id" :carer="carer" />
  </div>
</template>

<script setup lang="ts">
import CarerCard from './CarerCard.vue';
defineProps<{ carers: any[] }>();
</script>

<style scoped>
/* Responsive carer list layout */
.carer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .carer-list {
    gap: 1.2rem;
    padding: 1.2rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .carer-list {
    gap: 0.7rem;
    padding: 0.5rem 0.1rem;
  }
}
</style>
