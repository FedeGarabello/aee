<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AUTH_ERROR_MESSAGES } from "../services/auth.js";
import { register, login } from "../services/auth.js";
import AlertNotification from "../componentes/AlertNotification.vue";
import useNotification from "../composition/useNotification.js";
import SubmitButton from "../componentes/SubmitButton.vue";

const router = useRouter();
const { user, handleSubmitLogin, inputPassword, ojo } = useLogin();

function useLogin() {
  const ojo = ref(true);
  const user = ref({
    email: "",
    password: "",
  });

  /** Funcionapara cambiar el type entre text y password */
  function inputPassword() {
    const input = document.getElementById("passwordLogin");
    if (input.type === "password") {
      input.type = "text";
      ojo.value = false;
    } else {
      input.type = "password";
      ojo.value = true;
    }
  }

  function handleSubmitLogin() {
    loading.value = true;
    login({ ...user.value })
      .then(() => {
        status.value.type = "success";
        status.value.text = "¡Bienvenido!";
        loading.value = false;
        router.push("/inicio");
      })
      .catch((err) => {
        status.value = {
          type: "danger",
          text: AUTH_ERROR_MESSAGES[err.code] || err.code,
        };
        loading.value = false;
      });
  }

  return {
    user,
    handleSubmitLogin,
    inputPassword,
    ojo,
  };
}

const { form, handleSubmitRegister, handleCloseNotification, loading, status } =
  userRegisterForm();
function userRegisterForm() {
  const form = ref({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const loading = ref(false);
  const { status } = useNotification();

  function closeModal() {
    const modal = document.getElementById("registroModal");
    modal.classList.remove("show");
    // $('#registroModal').modal('hide');
  }

  function handleSubmitRegister() {
    loading.value = true;

    register({ ...form.value })
      .then(() => {
        loading.value = false;
        status.value.type = "success";
        status.value.text = "¡Usuario creado con éxito!";
        router.push("/inicio");
      })
      .catch((err) => {
        loading.value = false;
        status.value = {
          type: "danger",
          text: AUTH_ERROR_MESSAGES[err.code] || err.code,
        };
        // hacer el dismiss del modal
        // closeModal();
      });
  }

  function handleCloseNotification() {
    status.value.text = "";
  }

  return {
    form,
    handleSubmitRegister,
    handleCloseNotification,
    loading,
    status,
  };
}
</script>

<template>
  <header class="d-flex flex-column">
    <div class="h-40">
      <img class="logo_img" src="/img/logo_mobile.png" alt="Armá el Equipo" />
    </div>
    <div class="container h-90 t-15">
      <h1 class="d-none">Armá el Equipo</h1>
      <div class="col-12 card-border p-3">
        <h2 class="text-center h1">Ingresá</h2>
        <AlertNotification
          v-if="status.text !== ''"
          :type="status.type"
          closable
          @close="handleCloseNotification"
          >{{ status.text }}
        </AlertNotification>
        <form
          class="d-flex flex-column"
          @submit.prevent="handleSubmitLogin"
          method="post"
        >
          <div class="form-group mb-2">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="user.email"
              placeholder="Email"
            />
          </div>

          <div class="form-group mb-2">
            <label for="password">Password</label>
            <div class="input-group">
              <input
                type="password"
                class="form-control"
                id="passwordLogin"
                name="password"
                v-model="user.password"
                placeholder="Contraseña"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="inputPassword"
              >
                <i v-if="ojo" class="bi bi-eye-fill"></i>
                <i v-else class="bi bi-eye-slash-fill"></i>
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-aeeok mt-2 btn-aeeok">
            Ingresar
          </button>
        </form>
        <div class="d-grid gap-2 mt-2">
          <button
            class="btn btn-aee btn-block"
            data-bs-toggle="modal"
            data-bs-target="#registroModal"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="registroModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="registroModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title h1" id="registroModalLabel">Registrate</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              action="#"
              method="post"
              @submit.prevent="handleSubmitRegister"
            >
              <div class="form-group mb-2">
                <label for="nombre">Nombre</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  name="nombre"
                  v-model="form.nombre"
                  placeholder="Nombre"
                />
              </div>
              <div class="form-group mb-2">
                <label for="apellido">Apellido</label>
                <input
                  type="text"
                  class="form-control"
                  id="apellido"
                  name="apellido"
                  v-model="form.apellido"
                  placeholder="Apellido"
                />
              </div>
              <div
                class="form-group mb-2"
              >
                <label for="emailRegister">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailRegister"
                  name="email"
                  v-model="form.email"
                  placeholder="Email"
                />
              </div>
              <div
                class="form-group mb-2"
              >
                <label for="password">Contraseña</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="form.password"
                  placeholder="Contraseña"
                />
              </div>

              <div
                class="d-grid gap 2 mt-2 d-flex flex-column justify-content-center align-items-center"
              >
                <div class="col-sm-12">
                  <SubmitButton
                    :loading="loading"
                    data-bs-dismiss="modal"
                    data-bs-target="#my-modal"
                    aria-label="Crear"
                    >Crear</SubmitButton
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
