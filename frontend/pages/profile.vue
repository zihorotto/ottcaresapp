<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
  router.replace('/neu_pflegekraft');
});
</script>

<style scoped>
.profile-page {
  max-width: 400px;
  margin: 4rem auto;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(124, 58, 237, 0.18);
  padding: 2.5rem 2rem;
  text-align: center;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.avatar-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa 0%, #14b8a6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #fff;
  margin-bottom: 0.7rem;
  box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.12);
  overflow: hidden;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile-img-preview {
  margin: 1rem 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(124, 58, 237, 0.12);
}
.profile-step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 1.5rem 0;
}
.profile-step h2 {
  font-size: 1.2rem;
  color: #7c3aed;
  margin-bottom: 0.5rem;
}
.profile-step label {
  font-size: 1.05rem;
  color: #334155;
}
.profile-step textarea {
  width: 100%;
  border-radius: 0.7rem;
  border: 1px solid #a78bfa;
  padding: 0.7rem;
  font-size: 1rem;
  resize: vertical;
}
.profile-diseases {
  margin-top: 1rem;
  text-align: left;
}
.profile-diseases ul {
  margin: 0.3rem 0 0 1rem;
  padding: 0;
}
.profile-diseases li {
  font-size: 1rem;
  color: #334155;
  margin-bottom: 0.2rem;
}
.profile-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #7c3aed;
  margin-bottom: 0.2rem;
}
.profile-email {
  color: #64748b;
  font-size: 1.05rem;
  margin-bottom: 0.2rem;
}

.profile-role-section {
  margin: 1.2rem 0 0.5rem 0;
}
.profile-role-view {
  font-size: 1.08rem;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.role-edit-btn {
  background: none;
  border: none;
  color: #7c3aed;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: 0.3rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.4rem;
  transition: background 0.15s;
}
.role-edit-btn:hover {
  background: #f3e8ff;
}
.profile-role-edit {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}
</style>

/* Modern button style for Anmelden */ .login-btn { display: inline-block; margin-top: 1.2rem;
padding: 0.7rem 2.2rem; background: linear-gradient(90deg, #7c3aed 0%, #14b8a6 100%); color: #fff;
font-size: 1.1rem; font-weight: 600; border: none; border-radius: 2rem; box-shadow: 0 4px 16px 0
rgba(124, 58, 237, 0.13); transition: background 0.2s, transform 0.2s; text-decoration: none; }
.login-btn:hover { background: linear-gradient(90deg, #14b8a6 0%, #7c3aed 100%); transform:
translateY(-2px) scale(1.04); color: #fff; }
