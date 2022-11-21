<script setup>
import { onMounted, ref } from "vue";
import { getPricing } from "../services/precios";
import Precios from "./Precios.vue";
import LoadingContext from "../componentes/Loader/LoadingContext.vue";

const { precios, loading } = usePricing();
function usePricing() {
  const precios = ref([]);
  const loading = ref(true);

  onMounted(() => {
    getPricing().then((prices) => {
      prices.forEach((doc) => {
        precios.value.push(doc.data());
      });
      loading.value = false;
    });
  });

  return {
    precios,
    loading,
  };
}
</script>

<template>
  <div id="why" class="why mt-4">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="titlepage">
            <h1 class="h2">Nuestros precios</h1>
            <p>
              Cononcé nuestros planes y elegí el que más se ajuste a tu medida.
              Si tenes más consultas, podes comunicarte con un asesor en el link
              debajo de cada plan.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <template v-if="loading" class="text-center">
          <LoadingContext :loading="loading" />
        </template>
        <template v-else>
          <Precios
            v-for="precio in precios"
            :precio="precio"
            :key="precio.titulo"
          />
        </template>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer">
      <div class="copyright">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <p>
                © 2022 All Rights Reserved.
                <a href="#" class="mx-4">Marino - Garabello</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.copyright {
  background: #0c0f38;
  color: white !important;
}
</style>
