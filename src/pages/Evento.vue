<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { participation } from "../services/players.js";

import useAuth from "../composition/useAuth.js";
import useEvent from "../composition/useEvent.js";
import usePlayers from "../composition/usePlayers.js";
import useMyParticipation from "../composition/useMyParticipation.js";

const { user } = useAuth();
const { evento } = useEvent();
const { jugadores } = usePlayers();
const { myParticipation } = useMyParticipation();

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
        <div class="w-95 container bg-players pt-5 px-5">
            <template v-if="jugadores.length > 0" >
                <div v-for="j, index in jugadores" class="col-12 col-md-6 mx-auto">
                    <p>{{index+1}}) {{ j.nombre }} {{ j.apellido }}</p>
                </div>
            </template>
        </div>
        <div>
            <div class="d-grid gap-2 mt-3 container">
                <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
                    <button @click="go(true)" class="btn btn-aeeok">Voy!</button>
                    <button @click="go(false)" class="btn btn-danger">No voy</button>
                    <button type="button" class="btn btn-warning">Invitar</button>
                </div>
                
            </div>
        </div>
    </section>
</template>
