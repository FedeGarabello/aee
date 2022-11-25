<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
// import { suscribeToPlayers, participation } from "../services/players.js";
import { participation } from "../services/players.js";

import useAuth from "../composition/useAuth.js";
import useEvent from "../composition/useEvent.js";
import usePlayers from "../composition/usePlayers.js";

const { user } = useAuth();
const { evento } = useEvent();
const { jugadores } = usePlayers();
const { status, go } = useEvento();

function useEvento() {
    const route = useRoute();
    const idEvento = route.params.idEvento;

    const status = ref({
        success: null,
        message: "",
    });

    function go(state) {
        participation(idEvento, user.value.id, state)
        .then((res) => {
            if (res.success) {
            status.value.success = true;
            status.value.message = "Gran elección!";
            } else {
            status.value.success = true;
            status.value.message = "Lamentamos que no puedas asistir";
            }
        })
        .catch((err) => {
            status.value.success = false;
            status.value.message = "Lamentamos que no puedas asistir";
        });
    }

    return {
        go,
        status,
    };
}
</script>
<template>
    <section class="d-flex flex-column">
        <h2 class="text-center">{{ evento.title }}</h2>
        <div class="w-95 container bg-players pt-4 px-5">
        <div v-for="j in jugadores" class="col-12 col-md-6 mx-auto">
            <p>{{ j.nombre }}</p>
        </div>
        </div>
        <div class="">
        <div class="d-grid gap-2 col-6 mx-auto">
            <button @click="go(true)" class="btn btn-aeeok">Voy!</button>
            <button @click="go(false)" class="btn btn-danger">No voy</button>
        </div>
        </div>
    </section>
</template>
