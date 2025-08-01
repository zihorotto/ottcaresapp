<template>
  <AnimatedBg>
    <div class="profile-card">
      <div class="profile-img-wrap">
        <img
          v-if="carer.profileImageUrl"
          :src="carer.profileImageUrl"
          alt="Profilkép"
          class="profile-img"
        />
        <div v-else class="profile-img profile-img-fallback">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#e0f2fe" />
            <path d="M20 22c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" fill="#38bdf8" />
            <circle cx="20" cy="15" r="5" fill="#14b8a6" />
          </svg>
        </div>
      </div>
      <div class="profile-main-info">
        <h2 class="profile-name">{{ carer.name }}</h2>
        <div class="profile-status-row">
          <span class="profile-city">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#38bdf8"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
              />
            </svg>
            {{ carer.city }}
          </span>
          <span class="profile-experience">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#14b8a6"
                d="M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0-5a10 10 0 1 0 0 20a10 10 0 0 0 0-20z"
              />
            </svg>
            {{ carer.experience }} Jahre Erfahrung
          </span>
          <span :class="carer.available ? 'profile-available' : 'profile-unavailable'">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24">
              <circle :fill="carer.available ? '#14b8a6' : '#ef4444'" cx="12" cy="12" r="8" />
            </svg>
            {{ carer.available ? 'Verfügbar' : 'Nicht verfügbar' }}
          </span>
        </div>
      </div>
      <div class="profile-section">
        <h3 class="profile-section-title">Kontaktdaten</h3>
        <div class="profile-contact-row">
          <span v-if="carer.email" class="profile-contact">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#14b8a6"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13L4 6.01V6h16z"
              />
            </svg>
            <span class="font-mono">{{ carer.email }}</span>
          </span>
          <span v-if="carer.phone" class="profile-contact">
            <svg class="icon" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#14b8a6"
                d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C7.61 21 3 16.39 3 11a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2z"
              />
            </svg>
            <span class="font-mono">{{ carer.phone }}</span>
          </span>
        </div>
      </div>
      <div class="profile-section">
        <h3 class="profile-section-title">Referenzen</h3>
        <ul class="profile-references">
          <li v-for="ref in carer.references" :key="ref" class="profile-reference-item">
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24">
              <path fill="#14b8a6" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            {{ ref }}
          </li>
        </ul>
      </div>
      <div class="profile-section">
        <h3 class="profile-section-title">Verfügbarkeit</h3>
        <p class="profile-availability">{{ carer.availabilityDetails }}</p>
      </div>
      <button
        class="modern-btn chat-btn"
        @click="
          showChat = true;
          minimizedChat = false;
        "
      >
        Nachrichten schreiben
      </button>
      <ChatBox
        v-if="showChat"
        :minimized="minimizedChat"
        :carer-id="route.params.id"
        :user-id="userId"
        :name="carer.name"
        class="chatbox-right"
        @close="showChat = false"
        @minimize="minimizedChat = true"
        @restore="minimizedChat = false"
      />
    </div>
  </AnimatedBg>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AnimatedBg from '~/components/AnimatedBg.vue';
import ChatBox from '~/components/ChatBox.vue';
import { createUserManager } from '~/src/plugins/cognitoOidc';
const route = useRoute();
const carer = ref({
  name: '',
  city: '',
  experience: 0,
  available: false,
  profileImageUrl: '',
  email: '',
  phone: '',
  references: [],
  availabilityDetails: '',
});
const showChat = ref(false);
const minimizedChat = ref(false);
const userId = ref('');

onMounted(async () => {
  // Get current user and token
  const userManager = createUserManager();
  const user = await userManager.getUser();
  userId.value = user?.profile?.email || user?.profile?.sub || 'guest';
  let token = user?.access_token;
  const res = await fetch(
    `/api/carers/${route.params.id}`,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
  carer.value = await res.json();
});
</script>

<style scoped>
/* Responsive profile card */
.profile-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px 0 rgba(194, 206, 230, 0.14);
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  max-width: 420px;
  width: 100%;
  margin: 1.2rem auto 0.8rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .profile-card {
    max-width: 98vw;
    padding: 1rem 0.5rem 0.7rem 0.5rem;
    gap: 0.7rem;
  }
}
@media (max-width: 600px) {
  .profile-card {
    max-width: 99vw;
    padding: 0.7rem 0.1rem 0.5rem 0.1rem;
    gap: 0.5rem;
  }
  .profile-img,
  .profile-img-fallback {
    width: 48px;
    height: 48px;
  }
  .profile-name {
    font-size: 1.05rem;
  }
  .profile-section-title {
    font-size: 0.9rem;
  }
  .chat-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}
.profile-img-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7rem;
}
.profile-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #38bdf8;
  box-shadow: 0 1px 4px 0 rgba(124, 58, 237, 0.08);
}
.profile-img-fallback {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #14b8a6;
}
.profile-main-info {
  text-align: center;
}
.profile-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 0.3rem;
}
.profile-status-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
}
.profile-city,
.profile-experience,
.profile-available,
.profile-unavailable {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.85rem;
  color: #14b8a6;
  background: #e0f2fe;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  font-weight: 600;
}
.profile-available {
  color: #22c55e;
  background: #99f6e4;
}
.profile-unavailable {
  color: #ef4444;
  background: #fca5a5;
}
.icon {
  vertical-align: middle;
  width: 1em;
  height: 1em;
}
.profile-section {
  width: 100%;
  background: #e0f2fe;
  border-radius: 0.7rem;
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.3rem;
  box-shadow: 0 1px 4px 0 rgba(124, 58, 237, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.profile-section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #38bdf8;
  margin-bottom: 0.4rem;
}
.profile-contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
}
.profile-contact {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.85rem;
  color: #14b8a6;
  background: #e0f2fe;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  font-weight: 500;
}
.profile-references {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-reference-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #6d28d9;
  margin-bottom: 0.2rem;
}
.profile-availability {
  font-size: 0.85rem;
  color: #7c3aed;
  background: #ede9fe;
  border-radius: 9999px;
  padding: 0.1rem 0.5rem;
  font-weight: 500;
  display: inline-block;
  text-align: center;
  margin: 0 auto;
}
.chat-btn {
  margin-top: 1rem;
  font-size: 0.95rem;
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, #38bdf8 0%, #14b8a6 100%);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 16px 0 rgba(20, 184, 166, 0.18);
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.chat-btn:hover {
  background: linear-gradient(90deg, #14b8a6 0%, #38bdf8 100%);
  box-shadow: 0 6px 24px 0 rgba(56, 189, 248, 0.22);
}
.chatbox-right {
  position: fixed;
  right: 2.2rem;
  bottom: 2.2rem;
  z-index: 1002;
  box-shadow: 0 6px 24px 0 rgba(56, 189, 248, 0.22);
}
</style>
