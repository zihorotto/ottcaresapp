<template>
  <div class="login-page">
    <h1>Anmelden</h1>
    <button class="modern-btn" @click="loginWithCognito">Mit Cognito anmelden</button>
    <p class="mt-4">Noch kein Konto? <NuxtLink to="/register">Registrieren!</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import { userManager } from '~/src/plugins/cognitoOidc';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  if (process.client) {
    const url = new URL(window.location.href);
    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      userManager
        .signinRedirectCallback()
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          console.error('OIDC callback error:', err);
          router.push('/');
        });
    }
  }
});

function loginWithCognito() {
  userManager.signinRedirect();
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 4rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  padding: 2.5rem 2rem;
  text-align: center;
}
</style>
