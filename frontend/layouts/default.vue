<template>
  <div class="main-layout">
    <aside class="sidebar">
      <NuxtLink to="/" class="sidebar-logo">
        <span>OttoCares</span>
      </NuxtLink>
      <nav class="sidebar-nav">
        <template v-if="user">
          <template v-if="hasProfile">
            <NuxtLink to="/mein-profil" class="sidebar-link">Mein Profil</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/neu_pflegekraft" class="sidebar-link">New Pflegekraft</NuxtLink>
          </template>
          <NuxtLink to="/carers" class="sidebar-link">Pflegekräfte</NuxtLink>
        </template>
        <template v-else> </template>
      </nav>
      <div style="flex: 1 1 auto"></div>
      <div v-if="user" class="sidebar-link sidebar-signout-wrap">
        <button class="sidebar-link sidebar-signout-btn" @click="handleLogout">Abmelden</button>
      </div>
    </aside>
    <main class="main-content">
      <slot />
    </main>
    <GlobalChat />
  </div>
</template>

<script setup>
import GlobalChat from '~/components/GlobalChat.vue';
import { ref, onMounted } from 'vue';
import { userManager, signOutRedirect } from '~/src/plugins/cognitoOidc';
const user = ref(null);
const hasProfile = ref(false);
async function checkProfile() {
  try {
    const res = await fetch('/api/carers/me');
    hasProfile.value = res.ok;
  } catch {
    hasProfile.value = false;
  }
}
onMounted(async () => {
  user.value = await userManager.getUser();
  await checkProfile();
  userManager.events.addUserLoaded(async (u) => {
    user.value = u;
    await checkProfile();
  });
  userManager.events.addUserUnloaded(() => {
    user.value = null;
    hasProfile.value = false;
  });
});
function loginWithCognito() {
  userManager.signinRedirect();
}
function handleLogout() {
  signOutRedirect();
}
</script>

<style scoped>
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1rem;
    box-shadow: 0 2px 16px 0 rgba(124, 58, 237, 0.08);
    border-right: none;
    border-bottom: 1px solid #f3e8ff;
  }
  .sidebar-logo {
    margin-bottom: 0;
    font-size: 1.2rem;
  }
  .sidebar-nav {
    flex-direction: row;
    gap: 0.7rem;
    width: auto;
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
