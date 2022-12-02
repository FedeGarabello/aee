<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { dateLocaleToString } from "../helpers/date";
import tabMenuEvent from "../componentes/tabMenuEvent.vue";

import { participation } from "../services/players.js";

import ModalInviteContacts from "../componentes/ModalInviteContacts.vue";
import ModalEditEvent from "../componentes/ModalEditEvent.vue";
import LoadingContext from "../componentes/LoadingContext.vue";

import useAuth from "../composition/useAuth.js";
import useEvent from "../composition/useEvent.js";
import usePlayers from "../composition/usePlayers.js";
import useContacts from "../composition/useContacts.js";
import TabContent from "../componentes/tabContent.vue";

const { user } = useAuth();
const { evento } = useEvent();
const { jugadores, van, noVan, loading } = usePlayers();
const { contactos } = useContacts();

const { go, } = useEvento();

function useEvento() {
  const route = useRoute();
  const idEvento = route.params.idEvento;

  const titulares = ref([]);
  const suplentes = ref([]);

  function go(state) {
    participation(idEvento, user.value.id, state);
  }

  return {
    go,
  };
}
</script>

<template>
  <section class="d-flex flex-column">
    <LoadingContext :loading="loading">
      <div class="container">
        <h2 class="text-center mb-1">{{ evento.title }}</h2>
        <div
          class="container border border-secondary rounded shadow bg-white p-2 mb-2"
        >
          <p class="m-0">
            <small><b>Día:</b> {{ dateLocaleToString(evento.date) }}</small>
          </p>
          <p class="m-0">
            <small><b>Lugar:</b> {{ evento.location }}</small>
          </p>
          <p class="m-0">
            <small><b>Titulares:</b> {{ evento.cantPlayers }}</small>
          </p>
        </div>
      </div>

      <div class="container">
        <tabMenuEvent></tabMenuEvent>
        <div class="bodyPlayers shadow">
          <div class="tab-content" id="nav-tabContent">
            <TabContent :lista="van" :nav="'titulares'" class="show active"/>
            <TabContent :lista="noVan" :nav="'suplentes'" />
            <TabContent :lista="jugadores" :nav="'todos'" />
          </div>
        </div>
      </div>

      <div>
        <div class="d-grid gap-2 mt-3 container">
          <div
            class="btn-group btn-group-lg"
            role="group"
            aria-label="Botonera de participación"
          >
            <button @click="go(true)" class="btn btn-aeeok">Voy</button>
            <button @click="go(false)" class="btn btn-danger">No voy</button>
          </div>
        </div>
      </div>

      <div class="btn-chat">
        <router-link :to="`/evento/${evento.id}/chat`">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-text-fill" viewBox="0 0 16 16" >
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
          </svg>
        </router-link>
      </div>

      <ModalInviteContacts
        :contactos="contactos"
        :evento="evento"
        :jugadores="jugadores"
      ></ModalInviteContacts>

      <ModalEditEvent :evento="evento"></ModalEditEvent>
    </LoadingContext>
  </section>
</template>
