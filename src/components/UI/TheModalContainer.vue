<template>
    <teleport to="body">
        <div :class="props.class" class="fixed top-0 left-0 z-50 bg-black bg-opacity-50 w-full h-full flex justify-center items-center">
            <div class="min-h-[525px] overflow-y-auto w-full flex justify-center items-center relative">
                <slot></slot>
            </div>
        </div>
    </teleport>
</template>

<script setup> 
    const props = defineProps({
        class:{
            type:String
        }
    })
</script>
