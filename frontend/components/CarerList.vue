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
.carer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}
</style>
