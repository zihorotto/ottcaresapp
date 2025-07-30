<template>
  <div v-if="!minimized" class="chat-container glass-card">
    <div class="chat-header" @click="$emit('minimize')">
      <span class="chat-header-content">
        <svg class="chat-header-icon" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#38bdf8"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
        <span class="chat-header-name">{{ name }}</span>
      </span>
    </div>
    <div class="messages">
      <div v-for="(msg, idx) in messages" :key="idx" class="message">
        {{ msg }}
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="chat-form">
      <input v-model="input" type="text" placeholder="Írj üzenetet..." />
      <button type="submit">Küldés</button>
    </form>
  </div>
  <div v-else class="chat-minimized" @click="$emit('restore')">
    <svg
      class="chat-header-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      style="margin-right: 0.4rem"
    >
      <path
        fill="#14b8a6"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
    <span class="chat-minimized-name">{{ name }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  minimized: Boolean,
  name: String,
  carerId: String,
  userId: String,
});
import { ref, onMounted } from 'vue';
const messages = ref([]);
const input = ref('');
const loading = ref(false);

const API_URL = 'http://16.171.144.204:3001/api/chat';
function getChatUrl() {
  return `${API_URL}/${props.carerId}/${props.userId}`;
}
async function fetchMessages() {
  loading.value = true;
  try {
    const res = await fetch(getChatUrl());
    if (res.ok) {
      const data = await res.json();
      messages.value = data.map((m) => m.message);
    }
  } catch {}
  loading.value = false;
}

async function sendMessage() {
  if (input.value.trim()) {
    try {
      const res = await fetch(getChatUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: props.userId, message: input.value }),
      });
      if (res.ok) {
        const msg = await res.json();
        messages.value.push(msg.message);
        input.value = '';
      }
    } catch {}
  }
}

async function deleteMessages() {
  try {
    const res = await fetch(`${API_URL}/${props.name}`, { method: 'DELETE' });
    if (res.ok) messages.value = [];
  } catch {}
}

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.chat-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #38bdf8;
}
.chat-header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.chat-header-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.chat-header-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #38bdf8;
}
.chat-minimized {
  position: fixed;
  right: 2.2rem;
  bottom: 2.2rem;
  min-width: 120px;
  max-width: 320px;
  height: 48px;
  background: #14b8a6;
  color: #fff;
  border-radius: 9999px;
  box-shadow: 0 4px 16px 0 rgba(124, 58, 237, 0.18);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 1002;
  padding: 0 1.2rem 0 0.8rem;
  gap: 0.5rem;
  transition: background 0.18s;
}
.chat-minimized-name {
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.2rem;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-minimized:hover {
  background: #38bdf8;
}
.messages {
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.message {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}
.chat-form {
  display: flex;
  gap: 0.5rem;
}
input[type='text'] {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.7);
}
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #14b8a6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: #14b8a6;
}
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.18s;
}
.delete-btn:hover {
  opacity: 0.7;
}
</style>
