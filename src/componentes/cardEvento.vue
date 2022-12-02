<script setup>
import { dateToString } from "../helpers/date.js";
defineProps({
    evento: {
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div class="cardAEE">
        <router-link :to="`/evento/${evento.id}`">
            <h3 class="m-0">{{ evento.title }}</h3>
            <p class="m-0">{{ dateToString(evento.date) }}</p>
            <p class="m-0">
            Cantidad de participantes necesarios: {{ evento.cantPlayers }}
            </p>
            <p class="m-0">Cancha: {{ evento.location }}</p>
            <p class="m-0" v-if="evento.state == 1">Se juega</p>
            <p class="m-0" v-else-if="evento.state == 0">Se canceló</p>
        </router-link>
    </div>
</template>
