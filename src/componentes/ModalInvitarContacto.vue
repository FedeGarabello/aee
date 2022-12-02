<script setup>
const props = defineProps({
  contactos: {
    type: Array,
    required: true,
  },
  jugadores: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <!-- Modal de Invitados -->
  <div
    class="modal fade"
    id="invitarModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="Invitar Contacto"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="h1 modal-title fs-5">Invitá a un contacto</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Listar los contactos  -->
          <div v-for="c in contactos" class="col-12 col-md-6 mx-auto">
            <!-- ver si el c.id está en el array de jugadores -->
            <div v-if="!jugadores.find((j) => j.id === c.id)">
              <div class="card mb-2">
                <div class="card-body d-flex justify-content-between">
                  <div class="d-flex flex-column">
                    <p class="p-0 m-0">{{ c.nombre }} {{ c.apellido }}</p>
                    <p class="p-0 m-0">{{ c.email }}</p>
                  </div>
                  <button
                    @click="agregar(c)"
                    type="button"
                    class="btn btn-aeeok"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
