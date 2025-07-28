<template>
  <div>
    <div
      v-for="(chat, idx) in chats"
      :key="chat.name"
      class="chatbox-right"
      :style="{ right: `calc(2.2rem + ${idx * 340}px)` }"
    >
      <ChatBox
        :minimized="!chat.active"
        :name="chat.name"
        @restore="activateChat(idx)"
        @minimize="deactivateChat(idx)"
      />
      <button class="close-btn" @click="closeChat(idx)" title="Bezárás">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ChatBox from "~/components/ChatBox.vue";
const chats = ref([]);

function closeChat(idx) {
  chats.value.splice(idx, 1);
}
function getChats() {
  const keys = Object.keys(localStorage).filter((k) =>
    k.startsWith("carer-chat-")
  );
  let chatList = [];
  let idx = 0;
  for (const key of keys) {
    try {
      const saved = localStorage.getItem(key);
      const messages = JSON.parse(saved);
      // Only show if there are actual messages (not empty)
      if (
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.some((m) => m && m.length > 0)
      ) {
        chatList.push({
          name: key.replace("carer-chat-", ""),
          index: idx++,
          active: false,
        });
      }
    } catch {}
  }
  chats.value = chatList;
}

function activateChat(idx) {
  chats.value.forEach((c, i) => (c.active = i === idx));
}
function deactivateChat(idx) {
  chats.value[idx].active = false;
}

onMounted(() => {
  getChats();
});
</script>

<style scoped>
.chatbox-right {
  position: fixed;
  bottom: 2.2rem;
  z-index: 1002;
  display: flex;
  align-items: flex-end;
}

.close-btn {
  background: #fff;
  border: 1px solid #e0f2fe;
  color: #ef4444;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-bottom: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(124,58,237,0.08);
  transition: background 0.18s, color 0.18s;
}
.close-btn:hover {
  background: #ef4444;
  color: #fff;
}
</style>
