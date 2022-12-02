<script setup>
import Loader from "./Loader.vue";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  classTemplate: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button type="submit" class="btn btn-aeeok w-100 send" :disabled="loading">
    <slot v-if="!loading" />
    <Loader v-else />
  </button>
</template>
