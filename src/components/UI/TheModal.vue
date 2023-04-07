<template>
  <div>
      <div v-if="props.mode == 'confirmation'" class=" bg-white xsm:w-[350px] md:w-[400px] dark:bg-black rounded-md p-8">
        <p class="text-lg">{{ props.action }}</p>
        <p class="mt-2 text-gray-400">{{ props.msg }}</p>
        <div class="flex gap-6 w-full justify-between mt-8">
          <button
            class="p-3 bg-gray-300 hover:bg-gray-400 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 w-full rounded"
            @click="emits('next', 'cancel')">
            Cancel
          </button>
          <button
            class="p-3 bg-red-500 text-white hover:bg-red-600 dark:bg-blue-700 dark:hover:bg-blue-500 w-full rounded"
            @click="emits('next', 'proceed')">
            Proceed
          </button>
        </div>
      </div>
      <div v-else class=" bg-white dark:bg-black rounded-3xl p-8">
        <p class="text-lg">{{ props.action }}</p>
        <p class="mt-2 text-gray-400">{{ props.msg }}</p>
        <div class="flex justify-between mt-8">
          <button
            class="p-3 bg-red-500 text-white hover:bg-red-600 dark:bg-blue-700 dark:hover:bg-blue-500 w-full rounded"
            @click="emits('next', 'okay')">
            Okay
          </button>
        </div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: "confirmation",
    validator(val) {
      return ["confirmation", "info"].includes(val);
    },
  },
  action: {
    type: String,
    default: "The main action",
  },
  msg: {
    type: String,
    default: "Message for your action",
  },
});

const emits = defineEmits(['next']);
</script>

<style lang="postcss" scoped></style>
