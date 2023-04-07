<template>
    <div class="flex flex-col min-h-screen px-4 max-w-[1600px] mx-auto">
        <the-navbar />
        <main class="flex-auto">
            <router-view></router-view>
        </main>
        <the-footer />
    </div>
</template>

<script setup>

</script>

<style lang="postcss" scoped></style>