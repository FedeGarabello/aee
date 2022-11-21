import {onMounted, onUnmounted, ref} from "vue";
import {subscribeToAuthChanges} from "../services/auth.js";

export default function useAuth() {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
    });

    let unsubscribe;
    onMounted(() => {
        unsubscribe = subscribeToAuthChanges(newUserData => {
            user.value = newUserData
        });
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        user,
    }
}
