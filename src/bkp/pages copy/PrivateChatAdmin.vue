<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { dateToString } from "../helpers/date.js";
import useAuth from "../composition/useAuth.js";
import {
  sendPrivateMessageAdmin,
  subscribeToPrivateChat,
} from "../services/private-chats.js";

import { getUserProfile } from "../services/user-profiles";

const { messages, chattingUser } = usePrivateChat();

function usePrivateChat() {
  const route = useRoute();
  const chattingUser = ref({});
  const messages = ref([]);
  let unsubscribe;

  onMounted(async () => {
    await getUserProfile(route.params.id)
    .then((user) => {
      chattingUser.value = user;
      unsubscribe = subscribeToPrivateChat(
        {
          from: chattingUser.value.id,
        },
        (newMessages) => (messages.value = newMessages)
      );
    });
  });

  onUnmounted(() => {
    if (typeof unsubscribe !== "function") return;
    unsubscribe();
  });

  return {
    messages,
    chattingUser,
  };
}

const { user, message: formMessage, handleSubmit, } = usePrivateChatForm();

function usePrivateChatForm() {
  const route = useRoute();
  const { user } = useAuth();
  const message = ref("");

  function handleSubmit() {
    sendPrivateMessageAdmin({
      from: user.value.id,
      to: route.params.id,
      text: message.value,
    });
    message.value = "";
  }

  return {
    user,
    chattingUser,
    message,
    handleSubmit,
  };
}
</script>
<style>
textarea.form-control {
    min-height: calc(1.5em + 0.75rem + 2px);
    border: 1px solid #dee2e6;
}
</style>
<template>
  <section class="container my-4">
    <h1 class="mb-3">
      Chat privado de {{ chattingUser.displayName || chattingUser.email }}
    </h1>

    <h2 class="visually-hidden">Mensajes</h2>

    <div class="chat mb-3">
      <ul>
        <li v-for="message in messages" :key="message.created_at">
          <b>
            ({{ dateToString(message.created_at) }})
            {{
              message.from === chattingUser.id
                ? chattingUser.displayName || chattingUser.email
                : "Administrador"
            }}

            dijo </b
          >:
          <div>{{ message.text }}</div>
        </li>
      </ul>
    </div>

    <h2 class="visually-hidden">Enviar mensaje</h2>
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <label for="message" class="visually-hidden">Mensaje</label>
      <textarea
        id="message"
        class="form-control mb-2"
        v-model="formMessage"
      ></textarea>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </section>
</template>
