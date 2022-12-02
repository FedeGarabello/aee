<script setup>
import useAuth from '../composition/useAuth';
import { agregarContacto } from '../services/contacts.js';

const { user } = useAuth();

const props = defineProps({
    contacto: {
        type: Object,
        default: '{}'
    },
});

</script>
<template>
    <div class="card mb-2">
        <div class="card-body d-flex justify-content-between">
            <p class="card-title h5 pt-2">{{ contacto.nombre}} {{ contacto.apellido}}</p>
            <button @click="agregarContacto(user, contacto)" class="btn btn-dark">Agregar</button>
        </div>
    </div>
</template>