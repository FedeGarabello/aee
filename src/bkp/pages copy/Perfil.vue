<script setup>
import { RouterLink } from 'vue-router'
import { ref } from "vue";
import { updateUserProfile } from "../services/auth";
import AlertNotification from "../componentes/AlertNotification.vue";
import useAuth from "../composition/useAuth.js";
import useNotification from "../composition/useNotification.js";
import SubmitButton from "../componentes/SubmitButton.vue";
import UserProfileDetails from "../componentes/UserProfileDetails.vue";

const { form, status, loading, handleNotificationClose, handleProfileUpdate } =
  useProfileForm();
const { user } = useAuth();
const { loading: loadingPhoto,  handlePhotoUpdate, handlePhotoChange, photo, photoContent} = userPhotoForm();


function useProfileForm() {
  const form = ref({
    displayName: "",
  });
  const loading = ref(false);
  const { status, close } = useNotification();

  function handleProfileUpdate() {
    loading.value = true;

    updateUserProfile({
      displayName: form.value.displayName,
    })
      .then(() => {
        status.value = {
          type: "success",
          text: "La información del perfil se actualizó correctamente.",
        };
        loading.value = false;
      })
      .catch((err) => {
        status.value = {
          type: "danger",
          text: err,
        };
        loading.value = false;
      });
  }

  return {
    form,
    loading,
    status,
    handleProfileUpdate,
    handleNotificationClose: close,
  };
}





function userPhotoForm(){
  const loading = ref(false);
  const photo = ref(null);
  const photoContent = ref(null);


  function handlePhotoChange(e){
    photo.value = e.target.files[0];
    console.log('%cPerfil.vue line:67 photo', 'color: #007acc;', photo.value);

    const reader = new FileReader();
    reader.addEventListener('load', function() {
      photoContent.value = reader.result;
    });
    reader.readAsDataURL(photo.value);


  }

  async function handlePhotoUpdate() {
        try {
            loading.value = true;
            await updateUserProfile({
                displayName: user.value.displayName,
                photo: photo.value,
            });

            status.value = {
                type: 'success',
                text: 'La imagen de perfil se actualizó correctamente.',
            }
            photoContent.value = null;
        } catch(err) {
            console.error('[MyProfile] Error al subir la imagen de perfil', err);
            status.value = {
                type: 'danger',
                text: 'Ocurrió un error inesperado. La imagen no pudo ser actualizada..',
            }
        }
        loading.value = false;
    }

  return {
    loading,
    photoContent,
    handlePhotoChange,
    handlePhotoUpdate,
  };
}
</script>

<template>
  <section>
    <h1 class="d-none">Perfil</h1>
    <!-- Services  -->
    <div id="service" class="Services pt-3 mt-0">
      <div class="container">
        <AlertNotification
          v-if="status.text !== ''"
          :type="status.type"
          closable
          @close="handleNotificationClose"
          >{{ status.text }}</AlertNotification
        >
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Perfil</h2>
              <router-link
                v-if="user.rol !== 'admin'"
                :to="`/mensajes/${user.id}`"
                class="read_more bg"
                >Mis chats
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col align-self-center">
            <div class="Services-box">
                <img
                v-if="photoContent != null"
                  :src="photoContent || user.photoURL"
                  alt="user"
                />
              
                <i v-else><img src="images/service2.png" alt="#" /></i>
              <p>
                <UserProfileDetails :user="user" />
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <form
            action="#"
            method="post"
            @submit.prevent="handleProfileUpdate"
            class="col-12 col-lg-6"
          >
            <div class="mb-3">
              <label for="displayName" class="form-label text-white"
                >Nombre de usuario</label
              >
              <input
                type="text"
                class="form-control"
                id="displayName"
                :disabled="loading"
                v-model="form.displayName"
              />
            </div>
            <SubmitButton :loading="loading">Actualizar</SubmitButton>
          </form>

          <form
            action="#"
            method="post"
            @submit.prevent="handlePhotoUpdate"
            class="col-12 col-lg-6"
          >
            <div class="mb-3">
              <label for="displayName" class="form-label text-white"
                >Imágen</label
              >
              <input
                type="file"
                class="form-control"
                id="displayName"
                :disabled="loadingPhoto"
                @change="handlePhotoChange"
              />
            </div>
            <SubmitButton :loading="loadingPhoto">Actualizar</SubmitButton>
          </form>
        </div>
      </div>
    </div>
    <!-- end Servicess -->
  </section>
</template>
