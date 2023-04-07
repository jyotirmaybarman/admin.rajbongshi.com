<template>
  <ul class="inline-flex space-x-2">
    <li v-if="hasFirst()">
      <button
        @click.prevent="changePage(1)"
        class="w-10 h-10 flex justify-center items-center p-3 rounded-2xl"
        :class="
          current == 1
            ? 'text-white bg-[#4090FF]'
            : 'text-[#4090FF] border border-[#CCD3FF]'
        "
      >
        1
      </button>
    </li>
    <li
      v-if="hasFirst()"
      class="w-10 h-10 flex justify-center items-center text-[#4090FF] border border-[#CCD3FF] p-3 rounded-2xl"
    >
      ...
    </li>
    <li v-for="page in pages">
      <button
        @click.prevent="changePage(page)"
        :class="
          current == page
            ? 'text-white bg-[#4090FF]'
            : 'text-[#4090FF] border border-[#CCD3FF]'
        "
        class="w-10 h-10 flex justify-center items-center dark:text-white p-3 rounded-2xl"
      >
        {{ page }}
      </button>
    </li>
    <li
      v-if="hasLast()"
      class="w-10 h-10 flex justify-center items-center text-[#4090FF] border border-[#CCD3FF] p-3 rounded-2xl"
    >
      ...
    </li>
    <li v-if="hasLast()">
      <button
        @click.prevent="changePage(totalPages)"
        class="w-10 h-10 flex justify-center items-center p-3 rounded-2xl"
        :class="
          current == totalPages
            ? 'text-white bg-[#4090FF]'
            : 'text-[#4090FF] border border-[#CCD3FF]'
        "
      >
        {{ totalPages }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  pageRange: {
    type: Number,
    default: 2,
  },
  textBeforeInput: {
    type: String,
    default: "Go to page",
  },
  textAfterInput: {
    type: String,
    default: "Go",
  },
});
const emits = defineEmits(['updatePage'])

// computed

const pages = computed(() => {
  let pages = [];
  for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
    pages.push(i);
  }
  return pages;
});

const rangeStart = computed(() => {
  let start = props.current - props.pageRange;
  return start > 0 ? start : 1;
});

const rangeEnd = computed(() => {
  let end = props.current + props.pageRange;
  return end < totalPages.value ? end : totalPages.value;
});

const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage);
});


// functions

function hasFirst() {
  return rangeStart.value !== 1;
}
function hasLast() {
  return rangeEnd.value < totalPages.value;
}

function changePage(page) {
  if (page > 0 && page <= totalPages.value) {
    emits("updatePage", page);
  }
}
</script>

<style scoped></style>
