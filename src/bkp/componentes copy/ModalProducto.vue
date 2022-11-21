<script setup>
import { editProduct } from "../services/precios.js";

const props = defineProps({
  elemento: {
    type: Object,
    required: true,
  },
});


function editProd(){
  editProduct(props.elemento)
}

</script>
<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalElemento"
    tabindex="-1"
    aria-labelledby="modalElementoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="editProd" method="post">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="modalElementoLabel">{{ elemento.titulo }}</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
                  <div class="mb-3">
                      <label for="titulo" class="form-label">Titulo</label>
                      <input type="text" class="form-control" id="titulo" v-model="elemento.titulo">
                  </div>
                  <div class="mb-3">
                      <label for="precio" class="form-label">Precio</label>
                      <input type="number" class="form-control" id="precio" v-model="elemento.precio">
                  </div>
                  <div class="mb-3">
                      <label for="imagen" class="form-label">Imagen</label>
                      <input type="text" class="form-control" id="imagen" v-model="elemento.img">
                  </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Actualizar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
