<script setup>
import { ref } from "vue";
import { editEvent } from "../services/events.js";
import useAuth from "../composition/useAuth";
const { user } = useAuth();

const props = defineProps({
    evento: {
        type: Object,
        required: true,
    },
});

const form = ref({
    title: props.evento.title,
    cantPlayers: props.evento.cantPlayers,
    description: props.evento.description,
    // date: props.evento.date,
    location: props.evento.location,
    state: props.evento.state,
});

function handleEditEvent() {
    editEvent(user.value, props.evento.id, form.value)
    .then(() => {
        
    })
    .catch((err) => {
        
    });
}
</script>

<template>
    <div
        class="modal"
        id="editarEventoModal"
        tabindex="-1"
        aria-labelledby="editarEventoModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h3 class="modal-title">Editar Evento</h3>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
            ></button>
            </div>
            <form action="#" @submit.prevent="handleEditEvent">
            <div class="modal-body">
                <div class="mb-3">
                <label for="title" class="form-label">Título</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="Título del evento"
                    v-model="form.title"
                />
                </div>
                <div class="mb-3">
                <label for="description" class="form-label">Participantes</label>
                <input
                    class="form-control"
                    type="number"
                    id="participantes"
                    placeholder="Número de participantes"
                    v-model="form.cantPlayers"
                />
                </div>
                <!-- <div class="mb-3">
                        <label for="date" class="form-label">Fecha y hora</label>
                        <input type="datetime-local" class="form-control" id="date" v-model="form.date"> 
                    </div> -->
                <div class="mb-3">
                <label for="location" class="form-label">Lugar</label>
                <input
                    type="text"
                    class="form-control"
                    id="location"
                    placeholder="Lugar del evento"
                    v-model="form.location"
                />
                </div>
                <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    v-model="form.description"
                ></textarea>
                </div>
                <div class="mb-3">
                <label for="description" class="form-label">Estado</label>
                <select
                    class="form-select"
                    aria-label="Estado del evento"
                    v-model="form.state"
                >
                    <option selected value="1">Se juega</option>
                    <option value="0">Cancelado</option>
                </select>
                </div>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                >
                Cerrar
                </button>
                <button type="submit" class="btn btn-aeeok" data-bs-dismiss="modal">
                Actualizar
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
</template>
