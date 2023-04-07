<template>
  <div>
    <metainfo>
      <template v-slot:title="{ content }">
        {{ content ? `${content} | ${siteName}` : siteName }}
      </template>
    </metainfo>
    <TheModalContainer v-if="loading">
      <Loading class="text-white" />
    </TheModalContainer>
    <router-view v-else></router-view>
    <Notification></Notification>
    <TheError />
  </div>
</template>

<script setup>
import { useAuthStore } from "./stores/auth.store";
import { usePostsStore } from "./stores/posts.store";
import { useUsersStore } from "./stores/users.store";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const postsStore = usePostsStore();
const usersStore = useUsersStore();
const siteName = "ADMIN - Rajbongshi.com";
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  loading.value = true;
  await authStore.refreshAccessToken();
  await authStore.getLoggedInUser()
  let user = authStore.getUser;
  if (user && user.status == 'active') {
    if(user.role == 'admin'){
      await usersStore.fetchAllUsers();
    }
    await postsStore.fetchDraftPosts();
    await postsStore.fetchPublishedPosts();
    await postsStore.fetchUnpublishedPosts();
  }
  loading.value = false;
});
</script>

<style lang="postcss" scoped></style>
