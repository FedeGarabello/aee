<script setup>
import { ref } from "vue";
import CarResultado from "../componentes/carResultado.vue";
import { getUsersXEmail, getUsersXNombre, getUsersXApellido } from "../services/contacts.js";
// import useAuth from "../composition/useAuth";
// const { user } = useAuth();

const {
    resultados,
    email,
    nombre,
    apellido,
    buscarContactosXEmail,
    buscarContactosXNombre,
    buscarContactosXApellido,
} = useBuscarContacos();


function useBuscarContacos() {

    const email = ref("");
    const nombre = ref("");
    const apellido = ref("");
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

    function buscarContactosXNombre() {
        if(nombre.value != "") {
            getUsersXNombre(nombre)
            .then((data) => {
                console.log('%cContactos.vue line:37 data', 'color: #007acc;', data);
                resultados.value = data;
            })
        }
    }

    function buscarContactosXApellido() {
        if(apellido.value != "") {
            getUsersXApellido(apellido)
            .then((data) => {
                console.log('%cContactos.vue line:37 data', 'color: #007acc;', data);
                resultados.value = data;
            })
        }
    }

    return {
        email,
        nombre,
        apellido,
        resultados,
        buscarContactosXEmail,
        buscarContactosXNombre,
        buscarContactosXApellido,
    }
}

</script>
<template>
    <div class="container">
        <h2>Buscar contactos</h2>
        <div class="hstack gap-3 mb-2">
            <input
                class="form-control me-auto"
                type="text"
                placeholder="Buscar por email"
                aria-label="Buscar por email"
                v-model="email"
            />
            <button type="button" @click="buscarContactosXEmail" class="btn btn-secondary">Buscar</button>
        </div>
        <div class="hstack gap-3 mb-2">
            <input
                class="form-control me-auto"
                type="text"
                placeholder="Buscar por nombre"
                aria-label="Buscar por nombre"
                v-model="nombre"
            />
            <button type="button" @click="buscarContactosXNombre" class="btn btn-secondary">Buscar</button>
        </div>
        <div class="hstack gap-3 mb-2">
            <input
                class="form-control me-auto"
                type="text"
                placeholder="Buscar por apellido"
                aria-label="Buscar por apellido"
                v-model="apellido"
            />
            <button type="button" @click="buscarContactosXApellido" class="btn btn-secondary">Buscar</button>
        </div>

        <div class="container mt-4">
            <div class="row">
                <div class="col-12 col-sm-6 mx-auto" v-for="resultado in resultados" >
                    <CarResultado :resultado="resultado" />
                </div>
            </div>
        </div>
    </div>
</template>
