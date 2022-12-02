<script setup>
import { ref } from "vue";
import useAuth from "../composition/useAuth";
const { user } = useAuth();
console.log('%cPerfil.vue line:5 user.value', 'color: #007acc;', user.value);
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="text-center">Perfil</h2>
            </div>
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                <img :src="user.foto" class="img-fluid" alt="Foto de perfil">
                            </div>
                            <div class="col-12 col-md-8">
                                <h3>{{ user.nombre }} {{ user.apellido }}</h3>
                                <p>{{ user.email }}</p>
                                <p>{{ user.telefono }}</p>
                                <p>{{ user.direccion }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>