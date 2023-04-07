<template>
    <div class="group dropdown relative" ref="Dropdown">
        <button
            v-if="props.mode == 'select'"
            @click.prevent="openDropdown"
            class="group flex w-full justify-between items-center"
            :class="{'cursor-not-allowed': props.disabled, 'px-3 py-[0.4rem]' : props.theme.search('slim') > -1,'px-3 py-3':props.theme.search('slim') == -1,'!p-0' : props.theme.search('trim') > -1}"
        >
            <span v-if="selected" :class="{'text-sm text-black' : props.theme.search('trim') > -1}">{{ selected }}</span>
            <span v-else :class="{'text-sm text-gray-400' : props.theme.search('trim') > -1}">{{ props.placeholder }}</span>
            <svg :class="{ 'rotate-180': open,'stroke-[#909499]':props.theme.search('light') != -1,'stroke-[#000000]':props.theme.search('light') == -1 }" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 5L8 11L2 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </button>

        <div
            v-if="open"
            class="origin-top-right max-h-[300px] overflow-y-auto w-full min-w-[120px] absolute left-1/2 z-10 -translate-x-[50%] mt-2 px-2 py-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <ul class="py-1 flex w-full min-w-44 flex-col gap-2" role="none">
                <li v-if="props.clear" @click="clearFilter"  class="text-gray-700 font-bold cursor-pointer rounded-md hover:text-indigo-600 hover:bg-gray-100 block px-2 py-1 text-sm">
                    {{ props.clear }}
                </li>
                <li v-for="(opt, i) in props.options" :key="i" @click="select(opt.value, i)" class="text-gray-700 font-bold cursor-pointer rounded-md hover:text-indigo-600 hover:bg-gray-100 block px-2 py-1 text-sm">
                    {{ opt.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { onClickOutside } from '@vueuse/core'

const selected = ref(null)
const open = ref(false)

const Dropdown = ref()

onClickOutside(
  Dropdown,
  (event) => {
    open.value = false
  },
)

const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    placeholder:{
        type: String,
        default:"select"
    },  
    mode: {
        type: String,
        validator:(val)=>{
            return ['dropdown','select'].includes(val);
        },
        default:'select'
    },
    modelValue: {
        default: null
    },
    open:{
        type: Boolean,
        default: false
    },
    theme:{
        type: String,
        default: 'normal-light'
    },
    clear:{
        type: String,
        default: null
    },
    disabled:{
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['change','update:modelValue','indexUpdate','clear'])

// functions

function openDropdown(){
    if(props.disabled) return
    open.value = !open.value
}

function select(val, index){
    if(props.disabled) return
    open.value = !open.value
    setSelectedByValue(val)
    emits('update:modelValue', val)
    emits('change', val)
    emits('indexUpdate', index)
}

function clearFilter(){
    if(props.disabled) return
    open.value = !open.value
    emits('clear')
    selected.value = null
    emits('update:modelValue', null)
}

function setSelectedByValue(val){
    if(val == null || val == "") {
        selected.value = null
    }
    props.options.forEach(opt => {
       if(opt.value == val) {
            selected.value = opt.label
       }
    })
}

watch(()=>props.modelValue,(newVal)=>{
    setSelectedByValue(newVal)
})

watch(()=>props.open,(newVal)=>{
    open.value = newVal;
})

onMounted(()=>{
    setSelectedByValue(props.modelValue)
})


</script>

<style lang="postcss" scoped>

</style>