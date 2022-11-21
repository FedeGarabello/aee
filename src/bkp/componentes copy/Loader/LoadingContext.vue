<script setup>
import Loader from "./Loader.vue";

defineProps({
    loading: {
        type: Boolean,
        required: true,
    }
});

</script>
<template>
    <slot v-if="!loading" />
    <Loader v-else />
</template>
