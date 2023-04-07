<template>
    <div class="welcome h-full flex flex-col dark:bg-[#222] dark:text-white items-center pt-16">
        <h1 class="text-3xl text-center">Welcome <span class="font-bold">{{ name }}</span></h1>
        <p class="mt-4 text-center dark:text-gray-400">Take your control on your own hand and be responsible for your action.</p>
        <p class="mt-8">Here's what you can do next</p>
        <svg class="h-6 w-6 mt-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        </svg>
        <router-link to="/posts/create" class="relative mt-8 text-center w-[80%] sm:w-[70%]  lg:w-[60%] xl:w-[50%] block px-6 py-3 font-medium group">
            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black dark:bg-gray-100 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full bg-white dark:bg-blue-400 border-2 border-black dark:border-0 dark:group-hover:bg-indigo-700 group-hover:bg-black"></span>
            <span class="relative text-black group-hover:text-white">Add New Post</span>
        </router-link>
    </div>
</template>

<script setup>

const name = "Jyotirmay"

</script>

<style lang="postcss" scoped>

</style>
