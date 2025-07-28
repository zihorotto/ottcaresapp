<template>
  <AnimatedBg>
    <div class="glass-card animate-fade-in">
      <div class="logo-wrap">
        <svg
          class="logo-spin"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="#a78bfa"
            stroke-width="4"
            fill="#f3e8ff"
          />
          <path d="M40 20a20 20 0 1 1 0 40a20 20 0 1 1 0-40z" fill="#7c3aed" />
          <text
            x="40"
            y="48"
            text-anchor="middle"
            font-size="2.2rem"
            fill="#fff"
            font-family="Arial"
            font-weight="bold"
          >
            O
          </text>
        </svg>
      </div>
      <h1 class="text-5xl font-extrabold text-purple-700 mb-6 drop-shadow-xl">
        Welcome to <span class="gradient-text">OttoCares</span>!
      </h1>
      <NuxtLink to="/carers" class="glow-btn mt-6">
        <span>View Carers</span>
      </NuxtLink>
    </div>
  </AnimatedBg>
</template>

<script setup>
import AnimatedBg from "~/components/AnimatedBg.vue";
</script>

<style scoped>
/* Removed home-bg, now handled by AnimatedBg */
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  backdrop-filter: blur(8px);
  border: 1.5px solid #e9d5ff;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
}
.logo-wrap {
  margin-bottom: 1.5rem;
}
. . . logo-spin {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.gradient-text {
  background: linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.animate-gradient-text {
  animation: gradient-text-move 2.5s ease-in-out infinite alternate;
}
@keyframes gradient-text-move {
  0% {
    letter-spacing: 0.1rem;
  }
  100% {
    letter-spacing: 0.25rem;
  }
}
.glow-btn {
  background: linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  box-shadow: 0 0 24px 0 #a78bfa88, 0 4px 16px 0 rgba(124, 58, 237, 0.18);
  border: none;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, background 0.2s;
  outline: none;
  position: relative;
  overflow: hidden;
}
.glow-btn:hover,
.glow-btn:focus {
  transform: scale(1.08);
  background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
  box-shadow: 0 0 36px 0 #7c3aed88, 0 8px 32px 0 rgba(124, 58, 237, 0.28);
}
.glow-btn span {
  position: relative;
  z-index: 2;
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
.home-card {
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  backdrop-filter: blur(4px);
  border: 1px solid #e9d5ff;
}
.modern-btn {
  background: linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 4px 16px 0 rgba(124, 58, 237, 0.18);
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
  outline: none;
  position: relative;
  overflow: hidden;
}
.modern-btn:hover,
.modern-btn:focus {
  transform: scale(1.06);
  background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%);
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.28);
}
.modern-btn span {
  position: relative;
  z-index: 2;
}
@media (max-width: 600px) {
  .home-card {
    padding: 2rem 1rem;
    max-width: 98vw;
  }
  .home-bg {
    padding: 0.5rem;
  }
  h1 {
    font-size: 2.2rem;
  }
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
