<script setup>
defineProps({
    message: {
        type: Object,
    },
    showLink: {
        type: Boolean,
    }
})

</script>

<template>
    <router-link
        v-if="showLink"
        :to="`/usuario/${message.userId}`"
    >{{ message.name }}</router-link>
    <template
        v-else
    >{{ message.name }}</template>
</template>

<style>

</style>
