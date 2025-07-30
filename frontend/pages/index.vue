<template>
  <AnimatedBg>
    <div class="main-landing">
      <div class="glass-card animate-fade-in welcome-card">
        <div class="logo-wrap">
          <svg class="logo-spin" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="#22bdffff" stroke-width="4" fill="#f3e8ff" />
            <path d="M40 20a20 20 0 1 1 0 40a20 20 0 1 1 0-40z" fill="#14b8a6" />
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
        <h1 class="text-5xl font-extrabold text-cyan-700 mb-6 drop-shadow-xl">
          Welcome to <span class="gradient-text">OttoCares</span>!
        </h1>
        <NuxtLink v-if="user" to="/carers" class="glow-btn mt-6">
          <span>Pflegekräfte suchen</span>
        </NuxtLink>
        <div class="flex gap-4 mt-8" v-if="!user">
          <button class="modern-btn" @click="handleLogin">Anmelden</button>
        </div>
      </div>
      <div class="about-card animate-fade-in">
        <div class="about-icon-wrap">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle
              cx="22"
              cy="22"
              r="21"
              stroke="url(#about-gradient)"
              stroke-width="2.5"
              fill="#f0fdfa"
            />
            <path
              d="M22 36s-10.5-8.5-14-14C4 17 3.5 11.5 8 9c4-2.5 8.5 0 10 3C19.5 9 25 6.5 29 9c4.5 2.5 4 8 0 13C32.5 27.5 22 36 22 36z"
              fill="#14b8a6"
              stroke="#38bdf8"
              stroke-width="2"
            />
            <defs>
              <linearGradient
                id="about-gradient"
                x1="0"
                y1="0"
                x2="44"
                y2="44"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#38bdf8" />
                <stop offset="1" stop-color="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 class="about-title">Über uns</h2>
        <p class="about-text">
          <span class="about-highlight">OttoCares</span> ist eine innovative Plattform, die
          Pflegekräfte und Familien zusammenbringt.<br />
          Unser Ziel ist es, die Suche nach qualifizierten Pflegekräften
          <span class="about-highlight">einfach</span>,
          <span class="about-highlight">sicher</span> und
          <span class="about-highlight">menschlich</span> zu gestalten.<br />
          Wir setzen auf <span class="about-highlight">Herz</span>,
          <span class="about-highlight">Vertrauen</span> und
          <span class="about-highlight">moderne Technologie</span>, um die Pflegebranche zu
          unterstützen.
        </p>
      </div>
    </div>
  </AnimatedBg>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { userManager } from '~/src/plugins/cognitoOidc';
const user = ref(null);
const router = useRouter();
onMounted(async () => {
  user.value = await userManager.getUser();
  if (user.value) {
    const role = localStorage.getItem('userRole');
    if (!role) {
      router.push('/neu_pflegekraft');
    }
  }
});
function handleLogin() {
  userManager.signinRedirect();
}
</script>

<style scoped>
/* Removed home-bg, now handled by AnimatedBg */
</style>

<style>
html,
body,
#__nuxt {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
}
.main-landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  padding: 1.5rem 1.2rem 1rem 1.2rem;
  gap: 1.2rem;
  box-sizing: border-box;
  overflow: hidden;
}
.glass-card.welcome-card {
  margin-top: 0;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
}
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
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
}
.about-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1.7rem;
  box-shadow:
    0 8px 32px 0 rgba(56, 189, 248, 0.13),
    0 2px 8px 0 rgba(20, 184, 166, 0.1);
  border: 3px solid transparent;
  background-clip: padding-box;
  position: relative;
  padding: 2.7rem 2.2rem 2.1rem 2.2rem;
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}
.about-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  padding: 2.5px;
  background: linear-gradient(120deg, #38bdf8, #14b8a6 80%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 0;
}
.about-icon-wrap {
  margin-bottom: 1.1rem;
  z-index: 1;
}
.about-title {
  font-size: 2.1rem;
  font-weight: 900;
  color: #14b8a6;
  margin-bottom: 1.1rem;
  letter-spacing: 0.01em;
  z-index: 1;
  text-shadow: 0 2px 8px #38bdf822;
}
.about-text {
  font-size: 1.18rem;
  color: #334155;
  text-align: center;
  line-height: 1.8;
  z-index: 1;
}
.about-highlight {
  color: #14b8a6;
  font-weight: 700;
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.logo-wrap {
  margin-bottom: 1.5rem;
}
.logo-spin {
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
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
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
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  box-shadow:
    0 0 24px 0 #38bdf888,
    0 4px 16px 0 rgba(20, 184, 166, 0.18);
  border: none;
  cursor: pointer;
  transition:
    transform 0.18s,
    box-shadow 0.18s,
    background 0.2s;
  outline: none;
  position: relative;
  overflow: hidden;
}
.glow-btn:hover,
.glow-btn:focus {
  transform: scale(1.08);
  background: linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%);
  box-shadow:
    0 0 36px 0 #14b8a688,
    0 8px 32px 0 rgba(20, 184, 166, 0.28);
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
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 4px 16px 0 rgba(20, 184, 166, 0.18);
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
  box-shadow: 0 8px 32px 0 rgba(20, 184, 166, 0.28);
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
