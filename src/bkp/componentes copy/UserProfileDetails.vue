<script setup>
defineProps({
    user: {
        type: Object,
    }
})
</script>

<template>
    <dl class="my-3 w-50 m-auto">
        <dt class="text-start">Email</dt>
        <dd>{{ user.email }}</dd>
        <hr />
        <dt class="text-start">Nombre de usuario</dt>
        <dd>
            <template v-if="user.displayName">
                {{ user.displayName }}
            </template>
            <template v-else>
                <span class="fst-italic">No especificado</span>
            </template>
        </dd>
        <hr />
    </dl>
</template>

<style>

</style>
