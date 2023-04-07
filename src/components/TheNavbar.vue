<template>
    <nav class="flex items-center justify-between h-[7rem]">
        <div class="flex items-center gap-16">
            <div class="brand">
                <router-link to="/" class="brand flex gap-4">
                    <div class="icon w-12 h-12">
                        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect class="w-full h-full" rx="50" fill="#1C1C1C"/>
                            <path d="M39.0932 68C38.7446 68 38.4753 67.8943 38.2852 67.6829C38.0951 67.4362 38 67.1366 38 66.7843V32.2686C38 31.881 38.0951 31.5814 38.2852 31.37C38.4753 31.1233 38.7446 31 39.0932 31H50.6901C54.2706 31 57.1065 31.9338 59.1977 33.8014C61.289 35.6691 62.3346 38.4352 62.3346 42.1C62.3346 44.8134 61.7167 47.0334 60.481 48.76C59.2769 50.4514 57.6293 51.6319 55.538 52.3014L62.8574 66.3614C62.9525 66.5729 63 66.7666 63 66.9429C63 67.2248 62.8891 67.4714 62.6673 67.6829C62.4772 67.8943 62.2554 68 62.0019 68H59.7205C59.1818 68 58.7858 67.8414 58.5323 67.5243C58.2788 67.2071 58.057 66.89 57.8669 66.5729L50.9753 53.1471H42.6578V66.7843C42.6578 67.1366 42.5469 67.4362 42.3251 67.6829C42.135 67.8943 41.8657 68 41.5171 68H39.0932ZM42.6578 48.6543H50.5C52.8764 48.6543 54.6509 48.1081 55.8232 47.0157C56.9955 45.8881 57.5817 44.2319 57.5817 42.0471C57.5817 39.8976 56.9955 38.259 55.8232 37.1314C54.6825 36.0038 52.9081 35.44 50.5 35.44H42.6578V48.6543Z" fill="#0EFF8B"/>
                        </svg>                    
                    </div>
                    <div class="text-black dark:text-white font-bold hidden md:block">
                        <h1>Koch / Rajbongshi</h1>
                        <h2><span class="text-sm">Kamatapuri</span> <span
                                class="bg-gray-200 font-normal text-[0.7rem] py-1 px-2 capitalize ml-2 dark:bg-[#333] dark:text-white rounded-md">admin</span>
                        </h2>
                    </div>
                </router-link>
            </div>
            <ul class="hidden md:flex gap-6">
                <li>
                    <router-link to="#" class="dark:text-white hover:underline">Home</router-link>
                </li>
            </ul>
        </div>
        <ul class="flex items-center gap-20 ml-auto mr-12 md:mx-0">
            <li class="hidden md:flex items-center gap-8">
                <!-- Theme Switcher -->
                <theme-switcher />

                <!-- Language switcher -->
                <language-switcher />
            </li>
            <li v-if="user" class="hidden md:block">
                <div ref="authDropDown" class="relative inline-block text-left">
                    <div @click="authDropdownOpen = !authDropdownOpen" class="flex items-center gap-6 cursor-pointer">
                        <div class="h-8 w-8 rounded-full text-sm flex text-white items-center justify-center" :class="`bg-[#333]`">{{ user.first_name[0] }}{{ user.last_name[0] }}</div>
                        <button type="button" class="dark:text-white"> {{ user.first_name }} {{ user.last_name }} </button>
                    </div>
                    <div v-if="authDropdownOpen" class="absolute right-1/2 translate-x-1/2 z-10 mt-4 min-w-max w-full origin-top-right rounded-md bg-white dark:bg-[#2a2a2a] text-gray-700 px-1 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1" role="none">
                            <router-link @click="authDropdownOpen = !authDropdownOpen" to="#" class="flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-[#3e3e3e] rounded-md px-4 py-2 text-sm">
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>      
                                <span>Profile</span>
                            </router-link>
                            <button @click="logout" class="flex w-full items-center gap-4 hover:bg-gray-100 dark:hover:bg-[#3e3e3e] rounded-md px-4 py-2 text-sm">
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>



        <!-- Mobile -->
        <button @click="sidebar = !sidebar" class="hamburger md:hidden dark:text-white dark:hover:bg-[#333] flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
        </button>

        <!-- Backdrop -->
        <div v-if="sidebar" @click="sidebar = !sidebar" class="fixed inset-0 z-20 flex items-end bg-black bg-opacity-50 md:hidden">
        </div>

        <!-- Mobile Sidebar -->
        <transition name="sidebar">
            <aside v-if="sidebar" class="fixed inset-y-0 z-20 flex-shrink-0 w-[80%] right-0 overflow-y-auto bg-[#ffffff] dark:text-white dark:bg-[#222] md:hidden">
                <button @click="sidebar = !sidebar"
                    class="absolute top-3 left-3 md:hidden z-20 flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#333]">
                    <svg v-if="sidebar" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="pt-20 px-4 h-full relative flex flex-col">

                    <div v-if="user">
                        <!-- Profile -->
                        <div class="flex items-center gap-6">
                            <div class="h-12 w-12 bg-[#333] flex justify-center items-center text-white rounded-full">{{ user.first_name[0] }}{{ user.last_name[0] }}</div>
                            <p>{{ user.first_name }} {{ user.last_name }}</p>
                        </div>
                        <ul class="ml-2">
                            <li class="mt-6">
                                <button @click="logout" class="group py-3 flex items-center gap-6 w-max">
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>                                                             
                                    <span class="group-hover:underline">Logout</span>
                                </button>
                            </li>  
                        </ul>

    
                        <hr class="border-gray-300 dark:border-[#333] my-6" />

                        <DashboardOptions />

                        <hr class="border-gray-300 dark:border-[#333] my-4" />
                    </div>



                    <ul class="ml-2" v-else>
                        <li class="mt-2">
                            <router-link to="/auth/login" class="group py-3 flex items-center gap-6 w-max">
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                                                
                                <span class="group-hover:underline">Login</span>
                            </router-link>
                        </li>
                        <li class="mt-2">
                            <router-link to="/auth/register" class="group py-3 flex items-center gap-6 w-max">
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                                                              
                                <span class="group-hover:underline">Register</span>
                            </router-link>
                        </li>
                    </ul>

                    <div class="flex flex-col justify-between flex-1 pb-4">
                        <div class="flex justify-center mt-6 gap-8">
                            <!-- Language switcher -->
                            <language-switcher />
                        </div>
    
                        <div class="flex justify-center">
                            <!-- Theme Switcher -->
                            <theme-switcher />
                        </div>
                    </div>


                </div>

            </aside>
        </transition>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';

// Variables
const authStore = useAuthStore();
const authDropdownOpen = ref(false)
const sidebar = ref(false)
const authDropDown = ref()
const router = useRouter()

// computed & watchers
onClickOutside(authDropDown, e => authDropdownOpen.value = false)

const user = computed(()=> authStore.getUser)



// functions
async function logout(){
    authDropdownOpen.value = false;
    const res = await authStore.logout()
    if(res.success){
        router.push('/auth/login')
    }
}

</script>

<style lang="postcss" scoped>
.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(500%);
}

.sidebar-enter-active,
.sidebar-leave-active {
    transition: all 0.2s ease-in-out;
}

.sidebar-enter-to,
.sidebar-leave-from {
    transform: translateX(0);
}
</style>