<template>
  <form
    class="carer-form bg-white/80 rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col gap-5"
    @submit.prevent="handleSubmit"
  >
    <input v-model="form.name" type="text" placeholder="Name" class="form-input" required />
    <input v-model="form.city" type="text" placeholder="Stadt" class="form-input" required />
    <input
      v-model.number="form.experience"
      type="number"
      placeholder="Erfahrung (Jahre)"
      class="form-input"
      required
    />
    <select v-model="form.available" class="form-input" required>
      <option :value="true">Verfügbar</option>
      <option :value="false">Nicht verfügbar</option>
    </select>
    <input v-model="form.email" type="email" placeholder="E-Mail" class="form-input" />
    <input v-model="form.phone" type="text" placeholder="Telefonnummer" class="form-input" />
    <textarea
      v-model="referencesInput"
      placeholder="Referenzen (mit Enter trennen)"
      class="form-input"
      rows="2"
    ></textarea>
    <textarea
      v-model="form.availabilityDetails"
      placeholder="Verfügbarkeit (z.B. Mo-Fr 8-16 Uhr)"
      class="form-input"
      rows="2"
    ></textarea>
    <input ref="fileInput" type="file" accept="image/*" class="form-input" />
    <button type="submit" class="modern-btn save-btn mt-2">Speichern</button>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['created']);
const form = ref({
  name: '',
  city: '',
  experience: 0,
  available: true,
  profileImageUrl: '',
  email: '',
  phone: '',
  references: [],
  availabilityDetails: '',
});
const referencesInput = ref('');
const error = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

async function handleSubmit() {
  error.value = '';
  try {
    const fd = new FormData();
    fd.append('name', form.value.name);
    fd.append('city', form.value.city);
    fd.append('experience', String(form.value.experience));
    fd.append('available', String(form.value.available));
    if (fileInput.value && fileInput.value.files && fileInput.value.files[0]) {
      fd.append('profileImage', fileInput.value.files[0]);
    }
    fd.append('email', form.value.email);
    fd.append('phone', form.value.phone);
    fd.append('availabilityDetails', form.value.availabilityDetails);
    // Referenciák feldolgozása
    const refs = referencesInput.value
      .split(/\r?\n/)
      .map((r) => r.trim())
      .filter((r) => r.length > 0);
    for (const ref of refs) {
      fd.append('references[]', ref);
    }
    const res = await fetch('http://16.171.144.204:3001/api/carers', {
      method: 'POST',
      body: fd,
    });
    if (!res.ok) {
      const data = await res.json();
      error.value = data.error || 'Fehler beim Speichern';
      return;
    }
    emit('created');
    form.value = {
      name: '',
      city: '',
      experience: 0,
      available: true,
      profileImageUrl: '',
      email: '',
      phone: '',
      references: [],
      availabilityDetails: '',
    };
    referencesInput.value = '';
    if (fileInput.value) fileInput.value.value = '';
  } catch (e) {
    error.value = 'Netzwerkfehler';
  }
}
</script>

<style scoped>
.carer-form {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1.1rem;
  box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.1);
  backdrop-filter: blur(2px);
  border: 1px solid #e0f2fe;
  padding: 1.1rem 1.1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.save-btn {
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.7rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px 0 rgba(124, 58, 237, 0.13);
  border: none;
  cursor: pointer;
  transition:
    transform 0.13s,
    box-shadow 0.13s,
    background 0.18s;
  outline: none;
  position: relative;
  overflow: hidden;
  margin-top: 0.7rem;
}
.save-btn:hover,
.save-btn:focus {
  transform: scale(1.05);
  background: linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%);
  box-shadow: 0 4px 16px 0 rgba(124, 58, 237, 0.18);
}
.form-input {
  padding: 0.5rem 0.9rem;
  border-radius: 0.5rem;
  border: 1px solid #38bdf8;
  font-size: 0.98rem;
  outline: none;
  transition: border 0.15s;
}
.form-input:focus {
  border-color: #14b8a6;
}
</style>
