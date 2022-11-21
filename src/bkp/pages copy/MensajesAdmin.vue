<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { subscribeToPrivateChatAdmin } from "../services/private-chats.js";
import ListaUsersMessages from "../componentes/ListaUsersMessages.vue";
// import PrivateMessageChat from "./PrivateMessageChat.vue";

const { messagesUsers, idUsuario, setIdUsuario } = useMessagesUsers();

function useMessagesUsers() {
  let unsuscribe;
  const idUsuario = ref([]);
  const messagesUsers = ref([]);

  function setIdUsuario(id) {
    idUsuario.value = id;
  }

  onMounted(() => {
    unsuscribe = subscribeToPrivateChatAdmin((data) => {
      messagesUsers.value = data;
    });
  }),

  onUnmounted(() => {
    if (typeof unsuscribe !== "function") return;
    unsuscribe();
  });

  return {
    idUsuario,
    setIdUsuario,
    messagesUsers,
  };
}
</script>
<template>
  <div class="container">
    <div class="row">
      <h2 class="text-center my-3">Sala de Chat de los administradores</h2>
      <div class="col-12 col-md-4">
        <h3 class="text-center">Personas</h3>
        <div class="list-group">
          <ListaUsersMessages
            v-for="mensajesUser in messagesUsers"
            :key="mensajesUser.id"
            :user="mensajesUser.users"
            @enviarUserId="setIdUsuario"
          />
        </div>
      </div>
      <div class="col-12 col-md-8">
        <h3 class="text-center">Mensajes</h3>
        <p>Lo comencé a hacer para que cargue a través de un emit que surgía del on-click en el ListaUsersMessages  </p>
        <!-- <PrivateMessageChat :user="idUsuario" /> -->
      </div>
    </div>
  </div>
</template>
