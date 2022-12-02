<script setup>

import LoadingContext from "../componentes/LoadingContext.vue";
import useMyEvents from "../composition/useMyEvents";
import CardEvento from "../componentes/cardEvento.vue";

const { eventos, loading } = useMyEvents();
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center">Eventos</h2>
        </div>
      </div>
      <LoadingContext :loading="loading">
        <div class="row mb-5">
            <div class="col-12 col-sm-6" v-if="eventos.length > 0"  v-for="evento in eventos" :key="evento.id">
              <CardEvento :evento="evento" :key="evento.id"></CardEvento>
            </div>
            <div v-else>
              <h3 class="text-center mt-4 p-3 shadow">No hay eventos</h3>
            </div>
        </div>
      </LoadingContext>
    </div>
  </section>
</template>
