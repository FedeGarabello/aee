import {onMounted, onUnmounted, ref} from "vue";
import { getEvents } from "../services/events.js";
import useAuth from "./useAuth.js";

export default function useMyEvents() {
    const { user } = useAuth();
    const eventos = ref([]);
    
    onMounted(() => {
        getEvents(user.value.id, newUserData => {
            eventos.value = newUserData
        });
    });

    return {
        eventos,
    }
}
