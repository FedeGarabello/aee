<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { login, AUTH_ERROR_MESSAGES } from "../services/auth.js";
import AlertNotification from "../componentes/AlertNotification.vue";
import useNotification from "../composition/useNotification";
import SubmitButton from "../componentes/SubmitButton.vue";

const router = useRouter();


const { user, loading, status, handleSubmit , handleCloseNotification} = userLoginForm();

function userLoginForm() {
  const loading = ref(false);
  const user = ref({
    email: "",
    password: "",
  });

  const { status } = useNotification();

  function handleSubmit() {
    loading.value = true;
    login({ ...user.value })
      .then(() => {
        status.value.type = "success";
        status.value.text = "¡Bienvenido!";
        loading.value = false;
        setTimeout(() => router.push("/"), 1000);
      })
      .catch((err) => {
        status.value = {
          type: "danger",
          text: AUTH_ERROR_MESSAGES[err.code] || err.code,
        };
        loading.value = false
      });
  }

  function handleCloseNotification() {
    status.value.text = "";
  }

  return {
    user,
    handleSubmit,
    handleCloseNotification,
    status,
    loading,
  };
}
</script>

<template>
  <section>
    <!-- Login -->
    <div id="login" class="contact pt-4">
      <div class="col-md-6 offset-md-3">
        <h1>Login</h1>
        <p class="mb-4">Por favor, ingrese sus credenciales para ingresar al sistema y poder realizar gestiones administrativas o de consultas</p>
        <AlertNotification
          v-if="status.text !== ''"
          :type="status.type"
          closable
          @close="handleCloseNotification"
        >{{ status.text }}</AlertNotification>
        <form @submit.prevent="handleSubmit" method="post" class="main_form">
          <div class="row">
            <div class="col-sm-12">
            <label for="email" class="text-light">Email</label>
              <input
                class="contactus"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                v-model="user.email"
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
                v-model="user.password"
              />
            </div>
            <div class="col-sm-12">
              <SubmitButton :loading="loading">Ingresar</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- end login -->
  </section>
</template>
