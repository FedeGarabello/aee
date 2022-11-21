<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import useAuth from "../composition/useAuth.js";
import { dateToString } from "../helpers/date.js";

import {
  sendPrivateMessage,
  subscribeToPrivateChat,
} from "../services/private-chats.js";

const {
  user,
  chattingUser,
  message: formMessage,
  handleSubmit,
} = usePrivateChatForm();

const { messages } = usePrivateChat();

function usePrivateChatForm() {
  
  const { user } = useAuth();
  const message = ref("");

  function handleSubmit() {
    sendPrivateMessage({
      from: user.value.id,
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

function usePrivateChat() {
  const messages = ref([]);
  const { user } = useAuth();
  let unsubscribe;

  onMounted(async () => {
    unsubscribe = await subscribeToPrivateChat(
      {
        from: user.value.id,
      },
      (newMessages) => (messages.value = newMessages)
    );
  });

  onUnmounted(() => {
    if (typeof unsubscribe !== "function") return;
    unsubscribe();
  });

  return {
    messages,
  };
}
</script>

<template>
  <section class="container my-4">
    <h1 class="mb-3">Chat privado de {{ user.displayName || user.email }}</h1>

    <h2 class="visually-hidden">Mensajes</h2>

    <div class="chat mb-3">
      <ul>
        <li v-for="message in messages" :key="message.created_at">
          <b>
            ({{ dateToString(message.created_at) }})
            {{
              message.from === user.id
                ? user.displayName || user.email
                :'Administrador'
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
