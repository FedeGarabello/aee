<script setup>
import useAuth from "../composition/useAuth";
import useContacts from "../composition/useContacts";

const { user } = useAuth();
const { contactos } = useContacts();

</script>
<template>
    <div class="container">
        <h2 class="text-center">Contactos</h2>
        <router-link to="/buscar-contactos" class="btn btn-dark">Buscar nuevo</router-link>
        
        <div class="container mt-4">
            <div class="row">
                <div class="col-12 col-6 col-sm-4 col-md-3 col-lg-2 mx-auto" v-for="contacto in contactos" >
                    <div class="card mb-2">
                        <div class="card-body d-flex justify-content-between">
                            <p class="card-title
                            h5 pt-2">{{ contacto.nombre}} {{ contacto.apellido}}</p>
                            <button @click="eliminarContacto(user, contacto)" class="btn btn-dark disabled">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
