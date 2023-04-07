<template>
    <div class="flex flex-1 flex-col gap-2 bg-white min-w-max">
        <p class="uppercase font-bold text-center mb-4">Actions</p>
        <button v-if="post?.status == 'draft' && user.role != 'user'" class="p-3 text-white rounded bg-blue-500 hover:bg-blue-600" @click="handleClick('publish')">Publish</button>
        <button v-if="post?.status == 'unpublished' && user.role != 'user'" class="p-3 text-white rounded bg-blue-500 hover:bg-blue-600" @click="handleClick('republish')">Republish</button>
        <button v-if="post?.status == 'published'" class="p-3 bg-white hover:bg-gray-100 rounded border" @click="handleClick('unpublish')">Unpublish</button>
        <button v-if="post?.status == 'unpublished' || post?.status == 'draft'" class="p-3 bg-white hover:bg-gray-100 rounded border" @click="handleClick('edit')">Edit</button>
        <button v-if="post?.status == 'unpublished' || post?.status == 'draft'" class="p-3 bg-white hover:bg-gray-100 rounded border" @click="handleClick('delete')">Delete</button>
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth.store';
import { computed } from 'vue';

// props & emits
const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: null
  },
})
const emits = defineEmits(['action'])

// variables
const authStore = useAuthStore()

// computed & watchers
const user = computed(()=> authStore.getUser)

// functions
function handleClick(action) {
  emits('action', action)
}

// lifecycles


</script>

<style lang="postcss" scoped>

</style>