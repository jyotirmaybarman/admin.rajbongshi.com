<template>
  <ul class="dark:text-white">
    <li class="relative pl-6 py-3">
      <span
        v-if="getCurrentRoute.search(/\/$/) != -1"
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
      <router-link
        class="inline-flex items-center w-full text-sm font-semibold"
        to="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span class="ml-4">Home</span>
      </router-link>
    </li>
    <li class="group relative mt-4 pl-6 py-3">
      <span
        v-if="getCurrentRoute.search('posts') != -1"
        class="absolute inset-y-0 left-0 w-1 h-[50px] bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
      <button
        @click="catOpen = !catOpen"
        class="group flex items-center w-full rounded-lg text-sm font-semibold"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <p class="ml-4 flex">
          <span class="mr-6">Manage Posts</span>
          <svg
            class="h-5 w-5"
            :class="{ 'rotate-180': catOpen }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </p>
      </button>
      <ul
        v-if="catOpen"
        class="overflow-y-auto rounded-lg bg-gray-100 dark:bg-[#292929] p-2 px-4 w-max mt-6"
      >
        <li
          class="relative text-center hover:bg-black hover:text-white dark:hover:bg-indigo-700 rounded-lg"
          :class="{ 'bg-black text-white': getSubMenuActive == 'create' }"
        >
          <router-link
            to="/posts/create"
            class="flex items-center w-full p-3 text-sm font-semibold dark:text-white"
            >Add New Post</router-link
          >
        </li>
        <li
          class="relative text-center hover:bg-black hover:text-white dark:hover:bg-indigo-700 rounded-lg"
          :class="{ 'bg-black text-white': getSubMenuActive == 'published' }"
        >
          <router-link
            to="/posts/published"
            class="flex items-center w-full p-3 text-sm font-semibold dark:text-white"
            >Published Posts</router-link
          >
        </li>
        <li
          class="relative text-center hover:bg-black hover:text-white dark:hover:bg-indigo-700 rounded-lg"
          :class="{ 'bg-black text-white': getSubMenuActive == 'unpublished' }"
        >
          <router-link
            to="/posts/unpublished"
            class="flex items-center w-full p-3 text-sm font-semibold dark:text-white"
            >Unpublished Posts</router-link
          >
        </li>
        <li
          class="relative text-center hover:bg-black hover:text-white dark:hover:bg-indigo-700 rounded-lg"
          :class="{ 'bg-black text-white': getSubMenuActive == 'draft' }"
        >
          <router-link
            to="/posts/drafts"
            class="flex items-center w-full p-3 text-sm font-semibold dark:text-white"
            >Draft Posts</router-link
          >
        </li>
      </ul>
    </li>
    <li v-if="user.role == 'admin'" class="relative mt-4 pl-6 py-3">
      <span
        v-if="getCurrentRoute.search('users') != -1"
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
      <router-link
        class="inline-flex items-center w-full text-sm font-semibold"
        to="/users"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>

        <span class="ml-4">Users</span>
      </router-link>
    </li>
    <li class="relative mt-4 pl-6 py-3">
      <span
        v-if="getCurrentRoute.search('profile') != -1"
        class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
      <router-link
        class="inline-flex items-center w-full text-sm font-semibold"
        to="/my-profile"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="ml-4">My Profile</span>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";

// variables
const catOpen = ref(false);
const route = useRoute();
const authStore = useAuthStore();

// props & emits
const user = computed(()=> authStore.getUser);

// computed

const getCurrentRoute = computed(() => {
  if(route.fullPath.search('posts') != -1) catOpen.value = true;
  else catOpen.value = false;
  return route.fullPath;
});


const getSubMenuActive = computed(() => {
  let str = route.fullPath;
  if(str.search('create') != -1) return "create";
  if(str.search('unpublished') != -1) return "unpublished";
  if(str.search('published') != -1) return "published";
  if(str.search('draft') != -1) return "draft";
  else return false;
});
</script>

<style lang="postcss" scoped></style>
