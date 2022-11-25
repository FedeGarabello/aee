import useAuth from "./useAuth.js";
import { useRoute } from "vue-router";
import {ref, onMounted, onUnmounted } from "vue";
import {suscribeToEventChanges} from "../services/events.js";

export default function useEvent() {
    const route = useRoute();
    const idE = route.params.idEvento;
    const {user} = useAuth();
    const evento = ref({});

    let unsuscribe;
    onMounted(() => {
        unsuscribe = suscribeToEventChanges(idE, newEventData => {
            evento.value = newEventData;
        });
    });

    onUnmounted(() => {
        if(typeof unsuscribe !== "function") return
        unsuscribe();
    });

    return {
        evento,
    }
}