<template>
  <h2 class="text-center">Buscar Evento</h2>
  <div id="map"></div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { ref, onMounted, onUnmounted } from "vue";

onMounted(() => {
  const loader = new Loader({
    apiKey: "AIzaSyBiWYFasZr-zMqkNVbHPJYaqraUHDThLtw",
    version: "weekly",
    // ...additionalOptions,
  });

  loader.load().then(() => {
    const origen = { lat: -34.585494060747045, lng: -58.42119323855182 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: origen,
    });

    const marker = new google.maps.Marker({
      position: origen,
      map: map,
    });
  });
});
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>
