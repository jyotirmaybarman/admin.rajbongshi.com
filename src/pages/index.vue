<template>
  <div
    class="flex min-h-[calc(100vh-10rem)] gap-10 h-fit items-stretch justify-between"
  >
    <template v-if="user?.status == 'active'">
      <div class="left hidden md:block md:w-[35%] lg:w-[25%] xl:w-[20%] 2xl:w-[18%] max-w-[250px] bg-gray-50 pt-6 rounded">
        <DashboardOptions class="sticky top-6 left-0 min-w-[240px]"/>
      </div>
      <div class="right md:w-[65%] lg:w-[75%] xl:w-[80%] 2xl:w-[82%] flex-1">
        <router-view />
      </div>
    </template>
    <Teleport v-else to="body">
      <Inactive @logout="logout" />
    </Teleport>
  </div>
</template>

<script setup>
import { useMeta } from "vue-meta";
import { useAuthStore } from "../stores/auth.store";
import { computed } from 'vue';
import { useRouter } from "vue-router";

// variables
const authStore = useAuthStore();
const user = computed(()=> authStore.getUser);
const router = useRouter();

// functions
async function logout(){
  let res = await authStore.logout();
  if(res.success){
    router.push('/auth/login');
  }
}

useMeta({
  title: "Home",
});
</script>

<style lang="postcss" scoped></style>

<route lang="yml">
  meta:
    auth: true
</route>
