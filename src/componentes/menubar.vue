<script setup>
import {ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { logout } from "../services/auth.js";
import { newEvent } from "../eventos/eventos.js";
import useAuth from "../composition/useAuth";

const { user } = useAuth();
const router = useRouter();

const { logOff } = useProfile();
function useProfile() {
  function logOff() {
    logout();
    router.push('/');
  }
  return {
    logOff,
  };
}

const { form, handlNewEvent } = useNewEvent();
function useNewEvent() {
  const status = ref({
    type: "",
    message: "",
  })
  const loader = ref(false);
  const form = ref({
    title: "",
    cantPlayers: 0,
    description: "",
    date: "",
    location: "",
    // image: "",
    state: 1

  });
  function handlNewEvent() {
    loader.value = true;
    newEvent(user.value, form.value)
      .then((res) => {
        status.value = {
          type: "success",
          message: "Evento creado con exito",
        };
        form.value = {
          title: "",
          cantPlayers: 0,
          description: "",
          date: "",
          location: "",
          // image: "",
          state: 1
        }
        loader.value = false;
      })
      .catch((err) => {
        status.value = {
          type: "error",
          message: "Error al crear el evento",
        };
        loader.value = false;
      });
  }
  return {
    form,
    handlNewEvent,
  };
}
</script>
<style></style>
<template>
  <footer class="d-flex flex-row justify-content-around">
    <button class="btn btn-dark my-3"><i class="bi bi-list-ul"></i></button>
    <button class="btn btn-dark my-3"><i class="bi bi-search"></i></button>
    <button
      class="btn btn-aeeok my-3"
      data-bs-toggle="modal"
      data-bs-target="#modalNewEvent"
    >
      +
    </button>
    <button class="btn btn-dark my-3"><i class="bi bi-people-fill"></i></button>
    <button class="btn btn-dark my-3" @click="logOff">
      <i class="bi bi-person-circle"></i>
    </button>
  </footer>

  <div
    class="modal fade"
    id="modalNewEvent"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Crear evento"
    aria-hidden="true"
  >
    <form action="#" @submit.prevent="handlNewEvent">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-1" id="modalNewEvent">Nuevo Evento</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <div class="conteiner">
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
                <label for="description" class="form-label"
                  >Participantes</label
                >
                <input
                  class="form-control"
                  type="number"
                  id="participantes"
                  placeholder="Número de participantes"
                  v-model="form.cantPlayers"
                />
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Fecha y hora</label>
                <input 
                  type="datetime-local" 
                  class="form-control" 
                  id="date"
                  v-model="form.date"
                />
              </div>
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
                  placeholder="Descripción del evento"
                  v-model="form.description"
                ></textarea>
              </div>
              <!-- <div class="mb-3">
                <label for="image" class="form-label">Imagen</label>
                <input 
                  class="form-control" 
                  type="file" 
                  id="image"
                />
              </div> -->
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-aee" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button type="submit" class="btn btn-aeeok" data-bs-dismiss="modal">Crear</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
