import {onMounted, onUnmounted, ref} from "vue";
import { getEvents } from "../services/events.js";
import useAuth from "./useAuth.js";

export default function useMyEvents() {
    const { user } = useAuth();
    const eventos = ref([]);
    const loading = ref(true);
    
    onMounted(() => {
        loading.value = true;
        getEvents(user.value.id, newUserData => {
            eventos.value = newUserData
            loading.value = false;
        });
    });

    return {
        eventos,
        loading
    }
}
