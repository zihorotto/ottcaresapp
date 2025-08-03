<template>
  <div class="main-layout">
    <button
      class="sidebar-hamburger"
      @click="sidebarOpen = !sidebarOpen"
      aria-label="Menü öffnen"
    >
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
    </button>

    <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <NuxtLink to="/" class="sidebar-logo" @click="closeSidebar">
        <span>OttoCares</span>
      </NuxtLink>
      <nav class="sidebar-nav">
        <template v-if="loadingUser">
          <div class="sidebar-loading">Wird synchronisiert...</div>
        </template>
        <template v-else-if="user">
          <NuxtLink
            class="sidebar-link"
            to="/neu_pflegekraft"
            @click="closeSidebar"
            >New Pflegekraft</NuxtLink
          >
          <NuxtLink class="sidebar-link" to="/carers" @click="closeSidebar"
            >Pflegekräfte</NuxtLink
          >
        </template>
      </nav>
      <div style="flex: 1 1 auto"></div>
      <div
        v-if="user && !loadingUser"
        class="sidebar-link sidebar-signout-wrap"
      >
        <button class="sidebar-link sidebar-signout-btn" @click="logout">
          Abmelden
        </button>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <main class="main-content">
      <slot />
    </main>
    <GlobalChat v-if="showGlobalChat" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import GlobalChat from "~/components/GlobalChat.vue";
import { createUserManager, signOutRedirect } from "~/src/plugins/cognitoOidc";

const sidebarOpen = ref(false);
const route = useRoute();
const user = ref(null);
const loadingUser = ref(true);
const showGlobalChat = ref(false);
let userManager;

function closeSidebar() {
  sidebarOpen.value = false;
}
function logout() {
  signOutRedirect();
  closeSidebar();
}

watch(
  () => route.fullPath,
  () => closeSidebar()
);

onMounted(async () => {
  userManager = createUserManager();
  user.value = await userManager.getUser();
  loadingUser.value = false;
});
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
    135deg,
    #38bdf8 0%,
    #f3e8ff 50%,
    #14b8a6 100%
  );
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #f3e8ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  box-shadow: 2px 0 16px rgba(124, 58, 237, 0.08);
  z-index: 1002;
  transition: transform 0.25s ease;
}
.sidebar-logo {
  font-size: 2rem;
  font-weight: 900;
  color: #14b8a6;
  text-decoration: none;
  margin-bottom: 2rem;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.sidebar-link {
  font-size: 1.1rem;
  color: #14b8a6;
  font-weight: 600;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 0.7rem;
}
.sidebar-link:hover {
  background: #f3e8ff;
}
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-hamburger {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1.5px solid #e9d5ff;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}
.hamburger-bar {
  width: 26px;
  height: 3px;
  background: #14b8a6;
  border-radius: 2px;
}

.sidebar-overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

@media (max-width: 899px) {
  .sidebar-hamburger {
    display: flex;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    align-items: flex-start;
    padding-top: 3rem;
  }
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  .sidebar-logo {
    margin-left: 1.2rem;
  }
  .sidebar-nav {
    margin-left: 1.2rem;
  }
}

@media (min-width: 900px) {
  .sidebar {
    position: relative;
    transform: none !important;
  }
}
</style>
