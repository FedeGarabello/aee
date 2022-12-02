<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { addMessage } from "../services/chats.js";
import useAuth from '../composition/useAuth';
import useEvent from '../composition/useEvent';
import useChats from '../composition/useChats';


const { user, usuario } = useAuth();
const { mensajes } = useChats();

const { form, enviarMensaje } = useChat();
function useChat(){
    const { evento } = useEvent();
    const { user, usuario } = useAuth();

    const form = ref({
        message: '',
    });

    function enviarMensaje(){
        addMessage(evento.value.id, usuario.value, form.value)
        .then(() => {
            form.value.message = '';
        })
    }

    return {
        form,
        enviarMensaje
    }
}


</script>
<template>
    <div class="container">
        <h2>Mensajes</h2>
    </div>
    <div class="container">
        <div class="bodyChat overflow-auto">
            <p class="pt-2">Chat del evento </p>
            <hr>
            <div class="container">
                <div class="row" v-for="m in mensajes">
                    <div class="col-12">
                        <div :class="m.id == usuario.id ? 'float-end' : null">
                            <div class="d-flex flex-column">
                                <p class="my-0 text-dark" :class="m.id == usuario.id ? 'text-end' : null"><strong>{{ m.nombre }} {{ m.apellido }}</strong> dijo:</p>
                                <p class="my-0" :class="m.id == usuario.id ? 'text-end' : null">{{ m.message }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mt-3 btn-enviarChat">
        <form @submit.prevent="enviarMensaje" action="#"  method="post">
            <div class="input-group mb-3">
                <input type="text" v-model="form.message" class="form-control" placeholder="Mensaje" aria-label="Mensaje" aria-describedby="BotonEnviar">
                <button class="btn btn-aee" type="submit" id="BotonEnviar">Enviar</button>
            </div>
        </form>
    </div>

</template>