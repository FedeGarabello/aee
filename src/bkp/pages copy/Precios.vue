<script setup>
const props = defineProps({
  precio: {
    type: Object,
  },
});
</script>
<template>
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
      <div  class="why-box">
        <i><img :src="`${ precio.img }`" alt="#" /></i>
        <h2 class="h3">{{ precio.titulo }}</h2>
        <ul>
          <li v-for="item in precio.caracteristicas" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
</template>
