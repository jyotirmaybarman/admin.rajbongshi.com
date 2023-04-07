<template>
    <button :class="`${props.class}`" class="relative text-black border p-1 rounded border-gray-500 cursor-pointer disabled:cursor-not-allowed" @click="toggleCheck">
        <svg v-if="checked" class="h-full w-full pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </button>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
const props = defineProps({
    class:{
        type: String,
        default: 'h-7 w-7'
    },
    modelValue:{
        type: Boolean,
        default:false
    },
    unchekable:{
        type:Boolean,
        default: false
    },
    checked:{
        type:Boolean,
        default:null
    }
});
const emits = defineEmits(['update:modelValue', 'change'])
const checked = ref(false); 
function toggleCheck(e){
    // console.log(props.unchekable);
    if(!props.unchekable){
        checked.value = !checked.value;
        if(checked.value){
            emits('update:modelValue', true)
            emits('change', true)
        }else{
            emits('update:modelValue', false)
            emits('change', false)
        }
    }
}
watch(()=>props.modelValue,(nv)=>checked.value=nv)
watch(()=>props.checked,(nv)=>checked.value=nv)
onMounted(()=>{
    if(props.modelValue && props.checked == null){
        checked.value = props.modelValue
    }else{
        checked.value = props.checked
    }
})
</script>

<style lang="postcss" scoped>
</style>