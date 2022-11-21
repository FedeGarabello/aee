<script setup>
import { defineProps, ref, onUnmounted, onMounted, onBeforeUpdate } from "vue";
import { dateToString } from "../helpers/date.js";
import { getUserProfile } from "../services/user-profiles";

import {
  // sendPrivateMessage,
  subscribeToPrivateChat,
} from "../services/private-chats.js";

const props = defineProps({
  user: {
    type: String,
    default: "",
  },
});

const { messages, chattingUser } = useMessages();

function useMessages() {
  let unsubscribe;
  const messages = ref([]);
  const chattingUser = ref([]);

  onBeforeUpdate(() => {
    getUserProfile(props.user)
    .then((user) => {
      chattingUser.value = user;
    })
    const from = props.user;
    unsubscribe = subscribeToPrivateChat({from}, (data) => {
      messages.value = data;
    })
  }) 
  
  onUnmounted(() => {
    if (typeof unsubscribe !== "function") return;
    unsubscribe();
    if (typeof unsubscribeUser !== "function") return;
    unsubscribeUser();
  });

  return {
    messages,
    chattingUser
  };
}


const {
//   user,
  // chattingUser,
//   message: formMessage,
//   handleSubmit,
} = usePrivateChatForm();

function usePrivateChatForm() {
  
  // const {user: chattingUser, loading} = useUserProfile(props.user);
//   const { user } = useAuth();
//   const message = ref("");

//  function handleSubmit() {
//     sendPrivateMessage({
//       from: user.value.id,
//       text: message.value,
//     });
//     message.value = "";
//  }

  return {
//     user,
    // chattingUser,
//     message,
//     handleSubmit,
  };
}

// const { messages } = usePrivateMessageChat();

// function usePrivateMessageChat() {
</script>

<template>
  <template v-if="!props.user">
    <p class="text-center">Seleccione un usario para ver la conversación</p>
  </template>

  <template v-else>
    <section class="container mb-2">
      <h2 class="visually-hidden">Mensajes</h2>
      <div class="chat mb-2">
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

      <!-- <h2 class="visually-hidden">Enviar mensaje</h2> -->
      <!-- <form action="#" method="post" @submit.prevent="handleSubmit">
        <label for="message" class="visually-hidden">Mensaje</label>
        <textarea
          id="message"
          class="form-control mb-2"
          v-model="formMessage"
        ></textarea>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form> -->
    </section>
  </template>
</template>
