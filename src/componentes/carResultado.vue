<script setup>
import useAuth from '../composition/useAuth';

const props = defineProps({
    resultado: {
        type: Object,
        default: '{}'
    },
});

const { user } = useAuth();


</script>
<template>
    <div class="card mb-2">
        <div class="card-body d-flex justify-content-between">
            <p class="card-title h5 pt-2">{{ resultado.nombre}} {{ resultado.apellido}}</p>
            <a href="#" class="btn btn-primary">Agregar</a>
        </div>
    </div>
</template>