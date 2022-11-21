<script setup>
import {ref } from "vue";
import { useRouter } from "vue-router";
import { AUTH_ERROR_MESSAGES } from "../services/auth.js";
import { register } from "../services/auth.js";
import AlertNotification from "../componentes/AlertNotification.vue";
import useNotification from "../composition/useNotification.js";
import SubmitButton from "../componentes/SubmitButton.vue";

const router = useRouter();

const { form, handleSubmit, handleCloseNotification, loading, status } = userRegisterForm();

function userRegisterForm() {
  const form = ref({
    email: "",
    password: "",
    rol: "",
  });

  const loading = ref(false);
  const { status } = useNotification();

  function handleSubmit() {
    loading.value = true;

    register({ ...form.value })
      .then(() => {
        loading.value = false;
        status.value.type = "success";
        status.value.text = "¡Usuario creado con éxito!";
        setTimeout(() => router.push("/login"), 1000);
      })
      .catch((err) => {
        loading.value = false;
        status.value = {
          type: "danger",
          text: AUTH_ERROR_MESSAGES[err.code] || err.code,
        };
      });
  }

  function handleCloseNotification() {
    status.value.text = "";
  }

  return {
    form,
    handleSubmit,
    handleCloseNotification,
    loading,
    status,
  };
}
</script>

<template>
  <section>
    <AlertNotification
      v-if="status.text !== ''"
      :type="status.type"
      closable
      @close="handleCloseNotification"
      >{{ status.text }}</AlertNotification
    >
    <!-- Registro -->
    <div id="login" class="contact pt-4">
      <div class="container mb-4">
        <h2>Creá tu usuario para disfrutar de las funcionalidades</h2>
        <p>Ingresá tu email y una password, seguido de tu rol para probar la herramienta</p>
      </div>
      <div class="col-md-6 offset-md-3">
        <form action="#" method="post" @submit.prevent="handleSubmit" class="main_form">
          <div class="row">
            <div class="col-sm-12">
              <label for="email" class="text-light">Email</label>
              <input
                type="email"
                name="email"
                class="contactus"
                id="email"
                :disabled="loading"
                v-model="form.email"
                placeholder="Email"
              />
            </div>
            <div class="col-sm-12">
              <label for="password" class="text-light">Password</label>
              <input
                type="password"
                class="contactus"
                name="password"
                id="password"
                placeholder="Password"
                :disabled="loading"
                v-model="form.password"
              />
            </div>
            <div class="col-sm-12">
              <label for="rol" class="text-light">Rol</label>
              <select
                class="contactus"
                name="rol"
                id="rol"
                placeholder="Seleccione el Rol"
                :disabled="loading"
                v-model="form.rol"
                required
              >
                <option value="user" selected>User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="col-sm-12">
              <SubmitButton :loading="loading">Crear</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- end login -->
  </section>
</template>
