import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToAuthChanges} from "../services/auth.js";

export default function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
    });

    let unsuscribe;
    onMounted(() => {
        unsuscribe = subscribeToAuthChanges(newUserData => {
            user.value = newUserData
        });
    });

    onUnmounted(() => {
        if(typeof unsuscribe !== "function") return
        unsuscribe();
    });

    return {
        user,
    }
}
