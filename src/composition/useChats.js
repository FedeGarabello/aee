import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToChatChanges} from "../services/chats.js";
import { useRouter } from "vue-router";

export default function useChats() {
    const router = useRouter();
    const idEvento = router.currentRoute.value.params.idEvento; 
    const mensajes = ref({});

    let unsuscribe;
    onMounted(async () => {
        unsuscribe = await subscribeToChatChanges(idEvento, (messages) => {
            mensajes.value = messages;
        });
    });

    onUnmounted(() => {
        if(typeof unsuscribe !== "function") return
        unsuscribe();
    });

    return {
        mensajes,
    }
}
