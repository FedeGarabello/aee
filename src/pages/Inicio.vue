<script setup>
import { dateToString } from "../helpers/date.js";
import useMyEvents from "../composition/useMyEvents";

const { eventos } = useMyEvents();
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">Eventos</h2>
        </div>
      </div>
      <div class="row mx-2">
        <div class="col-12 col-md-6 cardAEE" v-for="evento in eventos" :key="evento.id">
          <!-- TODO: Pasar a componente -->
          <router-link class="link-light" :to="`/evento/${evento.id}`">
            <p>{{ evento.title }}</p>
            <p>{{ dateToString(evento.date) }}</p>
            <p>
              Cantidad de participantes necesarios: {{ evento.cantPlayers }}
            </p>
            <p>Cancha: {{ evento.location }}</p>
            <p v-if="evento.state == 1">Se juega</p>
            <p v-else-if="evento.state == 0">Se canceló</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
