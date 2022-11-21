<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { subscribeToServices , eliminarProducto } from "../services/precios.js";
import ModalProductoVue from "../componentes/ModalProducto.vue";
import ModalNuevoProducto from "../componentes/ModalNuevoProducto.vue";

const { servicesList } = usePanelAdmin();

function usePanelAdmin() {
  let unsuscribe;
  const servicesList = ref([]);
  onMounted(() => {
    unsuscribe = subscribeToServices((newServices) => {
      servicesList.value = newServices;
    });
  });

  onUnmounted(() => {
    if (typeof unsuscribe !== "function") return;
    unsuscribe();
  });

  return {
    servicesList,
  };
}

const { elemento, cargarProducto, eliminarP } = useElemento();

function useElemento() {
  const elemento = ref({
    titulo: "",
    caracteristicas: [],
    precio: "",
    img: "",
  });

  function cargarProducto(service) {
    elemento.value = service;
  }

  function eliminarP(idS) {
    eliminarProducto(idS);
  }

  return {
    elemento,
    cargarProducto,
    eliminarP,
  };
}
</script>
<template>
  <section class="container mt-3">
    <h2>Panel de administracion</h2>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in servicesList" :key="service.id">
              <td>{{ service.titulo }}</td>
              <td>$ {{ service.precio }}</td>
              <td class="d-flex">
                <button
                  class="btn btn-primary mx-2"
                  v-on:click="cargarProducto(service)"
                  data-bs-toggle="modal" data-bs-target="#modalElemento"
                >
                  Ver
                </button>
                <form action="#" method="post" @submit.prevent="eliminarP(service.id)">
                  <button  type="submit" class="btn btn-danger">Eliminar</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <ModalProductoVue :elemento="elemento"></ModalProductoVue>
        <!-- Boton para agregar un elemento -->
        <button
          class="btn btn-success"
          data-bs-toggle="modal" data-bs-target="#modalNuevoProducto"
        >
          Agregar
        </button>

        <ModalNuevoProducto></ModalNuevoProducto>

      </div>
    </div>
  </section>
</template>
