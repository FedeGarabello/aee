<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { dateToString } from "../helpers/date.js";
import useAuth from "../composition/useAuth.js";
import { suscribeToEvents } from "../eventos/eventos";

const { user } = useAuth();
const eventos = ref([]);

let unsubscribe;

onMounted(async () => {
  unsubscribe = await suscribeToEvents(
    {
      idU: user.value.id,
    },
    (events) => (eventos.value = events)
  );
});

onUnmounted(() => {
  if (typeof unsubscribe !== "function") return;
  unsubscribe();
});
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center">Eventos</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div v-for="evento in eventos" :key="evento.id">
                    <p>{{ evento.title }}</p>
                    <p>{{ dateToString(evento.date) }}</p>
                    <p>Cantidad de participantes necesarios: {{ evento.cantPlayers }} </p>
                    <p>Cancha: {{ evento.location }}</p>
                    <p v-if="evento.state == 1">Se juega</p>
                    <p v-else-if="evento.state == 0">Se canceló</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
