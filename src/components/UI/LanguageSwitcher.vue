<template>
    <div v-if="langSwitcherEnabled" ref="langDropDown" class="relative inline-block text-left">
        <div @click="langDropdownOpen = !langDropdownOpen" class="flex items-center gap-6 cursor-pointer">
            <button type="button"
                class="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-[#333]">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
            </button>
        </div>
        <div v-if="langDropdownOpen"
            class="absolute right-1/2 translate-x-1/2 z-10 mt-4 min-w-max w-full origin-top-right rounded-md bg-white dark:bg-[#333] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="p-1" role="none">
                <button @click="changeLocale('en')"
                    class="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#222] dark:hover:text-blue-500 block px-4 py-2 text-sm text-center">English</button>
                <button @click="changeLocale('es')"
                    class="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#222] dark:hover:text-blue-500 block px-4 py-2 text-sm text-center">Spanish</button>
            </div>
        </div>

        <span
            class="absolute -right-2 pointer-events-none -top-2 text-[10px] h-6 w-6 bg-blue-500 text-white rounded-full flex items-center justify-center">{{
                    locale == 'en' ? 'EN' : 'ES'
            }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'



//variables
const { t, locale } = useI18n()
const langDropdownOpen = ref(false)
const langDropDown = ref()
const langSwitcherEnabled = false


// utils
onClickOutside(langDropDown, e => langDropdownOpen.value = false)

// methods
function changeLocale(lang) {
    const allowedLangs = ['en', 'es']
    if (!allowedLangs.includes(lang)) {
        lang = "en"
    }
    locale.value = lang
    localStorage.setItem('locale', lang)
    langDropdownOpen.value = false
}
</script>

<style lang="postcss" scoped>

</style>