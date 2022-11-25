<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { suscribeToContacts, getUsersXEmail } from "../services/contacts.js";
import useAuth from "../composition/useAuth";

const { user } = useAuth();
const {
    resultados,
    email,
    buscarContactosXEmail,
} = useBuscarContacos();




onMounted(() => {
    // suscribeToContacts(user, (data) => {
        
    //     // console.log('%cContactos.vue line:35 data', 'color: #007acc;', data);
    // })
});







function useBuscarContacos() {
    const email = ref("");
    const resultados = ref([]);

    function buscarContactosXEmail() {
        if(email.value != "") {
            getUsersXEmail(email)
            .then((data) => {
                console.log('%cContactos.vue line:37 data', 'color: #007acc;', data);
                resultados.value = data;
            })
        }
    }
    return {
        resultados,
        buscarContactosXEmail,
        email
    }
}

</script>
<template>
    <div class="container">
        <h2>Buscar contactos</h2>
        <div class="hstack gap-3">
            <input
                class="form-control me-auto"
                type="text"
                placeholder="Buscar contacto"
                aria-label="Buscar contacto"
                v-model="email"
            />
            <button type="button" @click="buscarContactosXEmail" class="btn btn-secondary">Buscar</button>
        </div>

        <div class="container mt-4">
            <div class="row">
                <div class="col-12 col-sm-6 mx-auto" v-for="resultado in resultados" >
                    <div class="card">
                        <div class="card-body d-flex justify-content-between">
                            <p class="card-title h5 pt-2">{{ resultado.nombre}} {{ resultado.apellido}}</p>
                            <a href="#" class="btn btn-primary">Agregar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
