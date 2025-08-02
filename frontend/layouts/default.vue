<template>
  <div class="main-layout">
    <!-- Hamburger for mobile -->
    <button class="sidebar-hamburger" @click="sidebarOpen = !sidebarOpen" aria-label="Menü öffnen">
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
    </button>
    <!-- Sidebar as drawer on mobile -->
    <aside
      class="sidebar"
      :class="{ 'sidebar-open': sidebarOpen }"
      @click.self="sidebarOpen = false"
    >
      <NuxtLink to="/" class="sidebar-logo" @click="sidebarOpen = false">
        <span>OttoCares</span>
      </NuxtLink>
      <nav class="sidebar-nav">
        <template v-if="loadingUser">
          <div class="sidebar-loading">Wird synchronisiert...</div>
        </template>
        <template v-else-if="user">
          <template v-if="hasProfile">
            <NuxtLink class="sidebar-link" to="/neu_pflegekraft" @click.capture="sidebarOpen = false">New Pflegekraft</NuxtLink>
            <NuxtLink class="sidebar-link" to="/carers" @click.capture="sidebarOpen = false">Pflegekräfte</NuxtLink>
            <!-- Mein Profil button removed -->
          </template>
          <template v-else>
            <NuxtLink class="sidebar-link" to="/neu_pflegekraft" @click.capture="sidebarOpen = false">New Pflegekraft</NuxtLink>
            <NuxtLink class="sidebar-link" to="/carers" @click.capture="sidebarOpen = false">Pflegekräfte</NuxtLink>
          </template>
        </template>
      </nav>
      <div style="flex: 1 1 auto"></div>
      <div v-if="user && !loadingUser" class="sidebar-link sidebar-signout-wrap">
        <button
          class="sidebar-link sidebar-signout-btn"
          @click="
            handleLogout();
            sidebarOpen = false;
          "
        >
          Abmelden
        </button>
      </div>
    </aside>
    <!-- Overlay for mobile -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
    <main class="main-content">
      <slot />
    </main>
    <GlobalChat v-if="showGlobalChat" />
  </div>
</template>

<script setup>
async function navigateAndClose(path) {
  console.log('Navigating to:', path);
  await router.push(path);
  sidebarOpen.value = false;
}
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GlobalChat from '~/components/GlobalChat.vue';
import { createUserManager, signOutRedirect } from '~/src/plugins/cognitoOidc';

const sidebarOpen = ref(false);
const route = useRoute();
const router = useRouter();
const user = ref(null);
const hasProfile = ref(false);
const loadingUser = ref(true);
let userManager;
const showGlobalChat = ref(false);

// Auto-close sidebar on route change
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false;
  },
);

async function checkProfile() {
  try {
    const userManager = createUserManager();
    const user = await userManager.getUser();
    const idToken = user?.access_token;
    if (!idToken) {
      hasProfile.value = false;
      return;
    }
    const res = await fetch('/api/carers/me', {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    hasProfile.value = res.ok;
  } catch {
    hasProfile.value = false;
  }
}

onMounted(async () => {
  userManager = createUserManager();
  loadingUser.value = true;
  user.value = await userManager.getUser();
  await checkProfile();
  loadingUser.value = false;
  userManager.events.addUserLoaded(async (u) => {
    user.value = u;
    loadingUser.value = true;
    await checkProfile();
    loadingUser.value = false;
  });
  userManager.events.addUserUnloaded(() => {
    user.value = null;
    hasProfile.value = false;
  });

  // Check if there are any chats in localStorage for GlobalChat
  const keys = Object.keys(localStorage).filter((k) => k.startsWith('carer-chat-'));
  let hasChats = false;
  for (const key of keys) {
    try {
      const saved = localStorage.getItem(key);
      const messages = JSON.parse(saved);
      if (
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.some((m) => m && m.length > 0)
      ) {
        hasChats = true;
        break;
      }
    } catch {}
  }
  showGlobalChat.value = hasChats;
});

function loginWithCognito() {
  userManager.signinRedirect();
}
function handleLogout() {
  signOutRedirect();
}
</script>

<style scoped>
.sidebar-loading {
  font-size: 1.1rem;
  color: #7c3aed;
  font-weight: 600;
  padding: 0.7rem 1.2rem;
  text-align: center;
}
.sidebar-hamburger {
  display: none;
  position: fixed;
  top: 1.2rem;
  left: 1.2rem;
  z-index: 1001;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1.5px solid #e9d5ff;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px 0 rgba(124, 58, 237, 0.08);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 0;
  cursor: pointer;
}
.hamburger-bar {
  width: 26px;
  height: 4px;
  background: #14b8a6;
  border-radius: 2px;
  display: block;
}
.sidebar-overlay {
  display: none;
}
@media (max-width: 900px) {
  .sidebar-hamburger {
    display: flex;
  }
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1002;
    transform: translateX(-100%);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 2px 0 16px 0 rgba(124, 58, 237, 0.13);
    flex-direction: column;
    align-items: flex-start;
    padding-top: 2.2rem;
  }
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  .sidebar-logo {
    align-self: flex-start;
    margin-bottom: 2.2rem;
    margin-left: 1.2rem;
  }
  .sidebar-nav {
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    align-items: flex-start;
    margin-left: 1.2rem;
  }
  .sidebar-link {
    width: 100%;
    text-align: left;
  }
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.18);
    z-index: 1000;
  }
  .main-content {
    min-height: 100vh;
  }
}
.main-layout {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #38bdf8 0%, #f3e8ff 50%, #14b8a6 100%);
}
.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #f3e8ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  box-shadow: 2px 0 16px 0 rgba(124, 58, 237, 0.08);
  z-index: 10;
}
.sidebar-logo {
  font-size: 2rem;
  font-weight: 900;
  color: #14b8a6;
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: color 0.2s;
}
.sidebar-logo:hover {
  color: #38bdf8;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}
.sidebar-link {
  font-size: 1.1rem;
  color: #14b8a6;
  font-weight: 600;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 0.7rem;
  transition:
    background 0.18s,
    color 0.18s;
}
.sidebar-link:hover,
.sidebar-link:focus {
  background: #f3e8ff;
  color: #14b8a6;
}
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
@media (max-width: 900px) {
  .sidebar {
    width: 70px;
    padding: 1rem 0.2rem 1rem 0.2rem;
  }
  .sidebar-logo {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
  .sidebar-link {
    font-size: 0.95rem;
    padding: 0.5rem 0.7rem;
  }
}
@media (max-width: 600px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100vw;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0.7rem 1rem 1rem 1rem;
    box-shadow: 0 2px 16px 0 rgba(124, 58, 237, 0.08);
    border-right: none;
    border-bottom: 1px solid #f3e8ff;
    min-height: 100vh;
  }
  .sidebar-logo {
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    margin-left: 0;
  }
  .sidebar-nav {
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    align-items: flex-start;
    margin-left: 0;
  }
  .sidebar-link {
    width: 100%;
    text-align: left;
  }
  .sidebar-signout-wrap {
    width: 100%;
    margin-top: auto;
    display: flex;
    justify-content: center;
    padding-top: 1.2rem;
    padding-bottom: 0.5rem;
  }
  .main-content {
    min-height: calc(100vh - 60px);
  }
}
</style>

.signout-fixed { position: fixed; top: 1.5rem; right: 2.5rem; z-index: 2000; } .signout-btn {
padding: 0.5rem 1.5rem; font-size: 1rem; border-radius: 2rem; background: linear-gradient(90deg,
#38bdf8 0%, #14b8a6 100%); color: #fff; font-weight: 600; border: none; box-shadow: 0 2px 8px 0
rgba(20, 184, 166, 0.13); transition: background 0.2s, transform 0.2s; } .signout-btn:hover {
background: linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%); transform: translateY(-2px)
scale(1.04); color: #fff; } .sidebar-signout { margin-top: auto; width: 100%; display: flex;
justify-content: center; padding-top: 2rem; } .sidebar-signout-btn { width: 100%; text-align:
center; background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%); color: #fff; font-weight: 600;
border: none; border-radius: 0.7rem; box-shadow: 0 2px 8px 0 rgba(20, 184, 166, 0.13); transition:
background 0.2s, transform 0.2s; margin-bottom: 0.5rem; } .sidebar-signout-btn:hover { background:
linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%); color: #fff; transform: translateY(-2px)
scale(1.04); }


