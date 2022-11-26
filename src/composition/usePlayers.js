import useAuth from "./useAuth.js";
import { useRoute } from "vue-router";
import {ref, onMounted, onUnmounted } from "vue";
import {suscribeToPlayersEventChanges} from "../services/players.js";

export default function usePlayers() {
    const {user} = useAuth();
    const route = useRoute();
    const idE = route.params.idEvento;
    const jugadores = ref([]);

    let unsuscribe;
    onMounted(() => {
        unsuscribe = suscribeToPlayersEventChanges(idE, newEventData => {
            if(newEventData.length > 0) {
                jugadores.value = newEventData;
            } else {
                jugadores.value = [];
            }
        });
    });

    onUnmounted(() => {
        if(typeof unsuscribe !== "function") return
        unsuscribe();
    });

    return {
        jugadores,
    }
}
