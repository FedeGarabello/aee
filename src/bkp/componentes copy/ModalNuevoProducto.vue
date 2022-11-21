<script setup>
import { ref, onMounted } from "vue";
import { addPricing } from "../services/precios.js";

const { producto, limpiarForm, agregarProducto } = useFormNuevoProducto();

function useFormNuevoProducto() {
  const producto = ref({
    titulo: "",
    caracteristicas: [
      "50GB de almacenamiento SSD",
      "Dominioinfo",
      "Cuentas de correo",
      "Certificado SSL",
      "Soporte Profesional 24/7",
      "Ancho de banda sin medición",
      "Copia de seguridad semanal",
      "1 Base de datos",
      "Optimizado para WordPress",
      "Migrador a 1 click",
    ],
    precio: 0,
    img: "images/why1.png",
  });

  function limpiarForm() {
    producto.value = {
      titulo: "",
      caracteristicas: [],
      precio: "",
      img: "",
    };
  }

  function agregarProducto() {
    addPricing(producto.value);
    limpiarForm();
  }

  return {
    producto,
    limpiarForm,
    agregarProducto,
  };
}
</script>
<template>
  <div
    class="modal fade"
    id="modalNuevoProducto"
    tabindex="-1"
    aria-labelledby="modalNuevoProductoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalNuevoProductoLabel">
            Nuevo Producto
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form action="#" method="post" @submit.prevent="agregarProducto">
          <div class="modal-body">
            <div class="mb-3">
              <label for="titulo" class="form-label">Titulo</label>
              <input
                type="text"
                class="form-control"
                id="titulo"
                v-model="producto.titulo"
              />
            </div>
            <div class="mb-3">
              <label for="precio" class="form-label">Precio</label>
              <input
                type="number"
                class="form-control"
                id="precio"
                v-model="producto.precio"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="limpiarForm"
            >
              Cerrar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
