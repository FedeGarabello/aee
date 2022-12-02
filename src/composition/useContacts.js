import { onMounted, onUnmounted, ref } from 'vue'
import { suscribeToContacts } from '../services/contacts.js'
import useAuth from './useAuth.js'

export default function useContacts() {
    const { user } = useAuth()
    const contactos = ref([]);

    let unsuscribe;
    onMounted(() => {
        unsuscribe = suscribeToContacts(user.value.id, (contacts) => {
            contactos.value = contacts
        })
    })
    
    onUnmounted(() => {
        if(typeof unsuscribe === 'function') {
            unsuscribe();
        }
    });

    return {
        contactos
    }
}