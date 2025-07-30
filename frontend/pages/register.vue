<template>
  <div class="register-page">
    <h1>Registrierung</h1>
    <div class="register-role-select">
      <label class="block mb-2 font-semibold">Bitte wählen Sie Ihre Rolle:</label>
      <label class="role-radio">
        <input type="radio" value="patient" v-model="role" /> Patient
      </label>
      <label class="role-radio">
        <input type="radio" value="relative" v-model="role" /> Angehöriger eines Patienten
      </label>
    </div>
    <button class="modern-btn mt-4" :disabled="!role" @click="registerWithCognito">
      Registrierung mit Cognito
    </button>
    <p class="mt-4">Schon ein Konto? <NuxtLink to="/login">Einloggen!</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userManager } from '~/src/plugins/cognitoOidc';

const role = ref('');

function registerWithCognito() {
  if (!role.value) return;
  localStorage.setItem('userRole', role.value);
  userManager.signinRedirect(); // Cognito hosted UI regisztrációhoz
}
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 4rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  padding: 2.5rem 2rem;
  text-align: center;
}
.register-role-select {
  margin: 1.5rem 0 0.5rem 0;
  text-align: left;
}
.role-radio {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.08rem;
  color: #334155;
}
</style>
