<template>
  <nav class="d-flex justify-content-between">
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-titulares-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-titulares"
        type="button"
        role="tab"
        aria-controls="nav-home"
        aria-selected="true"
      >
        Participan
      </button>
      <button
        class="nav-link"
        id="nav-suplentes-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-suplentes"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="false"
      >
        No Van
      </button>
      <button
        class="nav-link"
        id="nav-todos-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-todos"
        type="button"
        role="tab"
        aria-controls="nav-contact"
        aria-selected="false"
      >
        Todos
      </button>
    </div>

    <div class="dropdown">
      <button
        type="button"
        class="btn btn-secondary btn-menu"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-three-dots-vertical"></i>
      </button>

      <ul class="dropdown-menu">
        <li>
          <a
            class="dropdown-item"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#invitarModal"
            >Invitar contacto</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#"  data-bs-toggle="modal" data-bs-target="#editarEventoModal">Editar Evento</a>
        </li>
        <li>
          <a class="dropdown-item disabled" href="#">Compartir evento</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
