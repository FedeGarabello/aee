<script setup>
import { ref, onMounted, defineEmits} from "vue";
import { getUserProfile } from "../services/user-profiles";

const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
});

const userId = ref("");
const userProfile = ref({});

onMounted(() => {
  userId.value = Object.getOwnPropertyNames(props.user)[0];
  getUserProfile(userId.value).then((data) => {
    userProfile.value = data;
  });
});
</script>

<template>
  <div class="list-group-item list-group-item-action" >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ userProfile.name }}</h5>

      <router-link class="" :to="`/admin/mensajes/${Object.getOwnPropertyNames(props.user)[0]}`">
        <small>{{ userProfile.email }}</small>
      </router-link>


    </div>
    <p class="mb-1">{{ userProfile.phone }}</p>
  </div>
  <!-- <router-link class="" :to="`/admin/mensajes/${Object.getOwnPropertyNames(props.user)[0]}`">
    {{ userProfile.email }}
  </router-link> -->
</template>