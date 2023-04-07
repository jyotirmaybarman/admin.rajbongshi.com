<template>
    <button @click="toggleShowPassword">
        <svg v-if="!showPassword" class="h-6 w-6" viewBox="0 0 20 20" fill="none">
            <path d="M1.7417 10.9083C6.30253 5.03584 13.6967 5.03584 18.2575 10.9083" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.8592 7.76504C14.3236 9.2295 14.3236 11.6039 12.8592 13.0683C11.3947 14.5328 9.02034 14.5328 7.55587 13.0683C6.0914 11.6039 6.0914 9.2295 7.55587 7.76504C9.02034 6.30057 11.3947 6.30057 12.8592 7.76504" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 20 20" fill="none">
            <path d="M11.7683 8.23337C12.7441 9.2092 12.7441 10.7934 11.7683 11.7709C10.7924 12.7467 9.20828 12.7467 8.23078 11.7709C7.25494 10.795 7.25494 9.21087 8.23078 8.23337C9.20828 7.25587 10.7916 7.25587 11.7683 8.23337" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 15.8333C6.92417 15.8333 4.13417 14.1741 2.87167 11.5933V11.5933C2.62667 11.0925 2.5 10.5491 2.5 9.99996C2.5 9.45079 2.62667 8.90746 2.87167 8.40663V8.40663C4.13417 5.82579 6.92417 4.16663 10 4.16663C13.0758 4.16663 15.8658 5.82579 17.1283 8.40663V8.40663C17.3733 8.90746 17.5 9.45079 17.5 9.99996" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.6666 13.3334L14.1666 15.8334" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1666 13.3334L16.6666 15.8334" stroke="#6D7885" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

// props & emits
const props = defineProps({
    modelValue:{
        type: Boolean,
        default: false
    }
});

const emits = defineEmits(['update:modelValue'])


// variables
const showPassword = ref(false);

// computed & watchers
watch(() => props.modelValue, (nv)=>{
    showPassword.value = nv
})

// functions

function toggleShowPassword(){
    showPassword.value = !showPassword.value
    emits('update:modelValue', showPassword.value)
}


onMounted(()=>{
    showPassword.value = props.modelValue
})

</script>

<style lang="postcss" scoped>

</style>