import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToAuthChanges} from "../services/auth.js";
import { getUserProfile } from "../services/user-profiles.js";

export default function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
    });

    const usuario = ref({
        id: null,
        nombre: null,
        apellido: null,
        email: null,
        displayName: null,
        photoURL: null,
    });

    let unsuscribe;
    onMounted(() => {
        unsuscribe = subscribeToAuthChanges(newUserData => {
            user.value = newUserData
        });
        getUserProfile(user.value.id).then((userData) => {
            usuario.value = userData;
        });
    });

    onUnmounted(() => {
        if(typeof unsuscribe !== "function") return
        unsuscribe();
    });

    return {
        user,
        usuario,
    }
}
