<template>
  <div class="animated-bg">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No script needed, just a wrapper
</script>

<style scoped>
.animated-bg {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #38bdf8 0%, #e0f2fe 40%, #14b8a6 100%);
  background-size: 200% 200%;
  animation: bg-diagonal 16s ease-in-out infinite;
}
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
</style>
