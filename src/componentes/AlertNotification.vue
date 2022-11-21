<script setup>
import { computed } from "vue"

const props = defineProps({
    type: {
        type: String,
        default: 'info'
    },
    closable: {
        type: Boolean,
        default: false,
    }
});

defineEmits(['close']);

const messageTypeText = computed(() => {
    switch(props.type) {
        case 'danger':
            return 'Error';

        case 'success':
            return 'Éxito';

        case 'warning':
            return 'Advertencia';

        case 'info':
            return 'Notificación';

        default:
            return '';
    }
});

</script>

<template>
    <div
        :class="['alert', `alert-${type}`, closable ? 'alert-dismissible' : null]"
        role="alert"
    >
        <span class="visually-hidden">{{ messageTypeText }}: </span>
        <slot />
        <button
            v-if="closable"
            type="button"
            class="btn-close"
            aria-label="Cerrar notificación"
            @click="$emit('close')"
        ></button>
    </div>
</template>
