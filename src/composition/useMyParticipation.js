import {onMounted, onUnmounted, ref} from "vue";
import { myParticipationFn } from "../services/players.js";

import useAuth from "./useAuth.js";
import { useRoute } from "vue-router";

export default function useMyParticipation() {
    const router = useRoute();
    const idE = router.params.idEvento;
    const { user } = useAuth();
    const myParticipation = ref({});
    
    let unsubscribe;
    onMounted(() => {
        unsubscribe = myParticipationFn(idE, user.value.id, newEventData => {
            
            if(newEventData.length > 0) {
                myParticipation.value = newEventData;
            } else {
                myParticipation.value = {};
            }
        });
    })

    onUnmounted(() => {
        if(typeof unsubscribe === 'function') {
            unsubscribe();
        }
    });

    return {
        myParticipation,
    }
}
