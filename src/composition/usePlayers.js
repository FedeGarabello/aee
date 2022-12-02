import useAuth from "./useAuth.js";
import { useRoute } from "vue-router";
import {ref, onMounted, onUnmounted } from "vue";
import {suscribeToPlayersEventChanges} from "../services/players.js";

export default function usePlayers() {
    const {user} = useAuth();
    const route = useRoute();
    const loading = ref(true);

    const idE = route.params.idEvento;
    const jugadores = ref([]);

    const van = ref([]);
    const noVan = ref([]);
    
    function separarTitulares(jugadores) {
        loading.value = true;
        van.value = jugadores.filter((jugador) => jugador.go);
        noVan.value = jugadores.filter((jugador) => !jugador.go);
        loading.value = false;
    }

    let unsuscribe;
    onMounted(async () => {
        unsuscribe = suscribeToPlayersEventChanges(idE, newEventData => {
            if(newEventData.length > 0) {
                jugadores.value = newEventData;
                separarTitulares(jugadores.value);
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
        van, 
        noVan,
        loading
    }
}
