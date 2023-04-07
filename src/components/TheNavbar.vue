<template>
    <nav class="flex items-center justify-between h-[7rem]">
        <div class="flex items-center gap-16">
            <div class="brand">
                <router-link to="/" class="brand flex gap-4">
                    <div class="icon w-12 h-12">
                        <svg viewBox="0 0 100 100">
                            <g transform="translate(2615 -1563)">
                                <g transform="translate(-2615 1563)">
                                    <g transform="translate(0 0)">
                                        <rect width="100" height="100" rx="10" fill="#04429d" />
                                    </g>
                                </g>
                                <g transform="translate(-2600.3 1577.2)">
                                    <g transform="translate(0 0)">
                                        <path
                                            d="M310.153,64.307A59.76,59.76,0,0,1,325.7,62.835a32.883,32.883,0,0,1,9.845,2.076,22.884,22.884,0,0,1,9.489,6.511,23.817,23.817,0,0,1,5.253,12.447,31.167,31.167,0,0,1-.641,11.731,40.158,40.158,0,0,1-8.436,15.761A62.025,62.025,0,0,1,320.15,127.3a71.079,71.079,0,0,1-21.145,6.44,54.266,54.266,0,0,1-9.041.545,4.724,4.724,0,0,1-3.09-1.1,5.662,5.662,0,0,1-1-3.383,21.442,21.442,0,0,1,.558-6.7,25.549,25.549,0,0,1,1.238-3.376,165.215,165.215,0,0,1,11.109-20.286c4.883-7.759,10.138-15.276,15.581-22.649a56.459,56.459,0,0,0-8.909,1.727,105.792,105.792,0,0,0-12.883,4.314,28.547,28.547,0,0,0-4.091,2.006,2.03,2.03,0,0,0-.842,1,5.678,5.678,0,0,0,2,.051,65.52,65.52,0,0,1,9.845-1.169,57.538,57.538,0,0,0-6.3,2.113c-2.376.916-4.693,1.975-7.042,2.957a11.018,11.018,0,0,1-3.133.959,2.773,2.773,0,0,1-2.325-.77c-.941-1.208-.705-2.852-.718-4.275.185-3.308.867-6.763,2.949-9.437a14.332,14.332,0,0,1,4.528-3.579,71.216,71.216,0,0,1,9.35-4.338,84.891,84.891,0,0,1,13.362-4.04m5.785,12.121a12.887,12.887,0,0,1,.359,3.517,13.356,13.356,0,0,1-1.953,4.25c-3.977,6.436-8.261,12.68-12.083,19.211-2.072,3.542-3.946,7.193-5.918,10.791a43.168,43.168,0,0,0-2.744,5.441,3.586,3.586,0,0,0-.241,2.663,2.021,2.021,0,0,0,1.085,1.009,12.387,12.387,0,0,0,4.809.689,50.568,50.568,0,0,0,15.565-2.832,62.229,62.229,0,0,0,15.654-7.847,40.363,40.363,0,0,0,11.268-11.427A19.753,19.753,0,0,0,344.754,89.5a13.17,13.17,0,0,0-2.109-6.2,13.843,13.843,0,0,0-5.371-4.627,25.039,25.039,0,0,0-7.754-2.245A69.646,69.646,0,0,0,315.938,76.428Z"
                                            transform="translate(-279.947 -62.78)" fill="#fefefe" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="text-black dark:text-white font-bold hidden md:block">
                        <h1>Developer</h1>
                        <h2>Zilla <span
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