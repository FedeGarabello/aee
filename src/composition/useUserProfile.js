import {onMounted, ref} from "vue";
import {getUserProfile} from "../services/user-profiles.js";

export default function useUserProfile(userId) {
    console.log('%cuseUserProfile.js line:5 idU', 'color: #007acc;', userId);
    const user = ref({
        id: '',
        email: '',
        displayName: '',
        photoURL: '',
    });
    const loading = ref(true);

    onMounted(async () => {
        user.value = await getUserProfile(userId);
        loading.value = false;
    });

    return {
        user,
        loading,
    }
}
