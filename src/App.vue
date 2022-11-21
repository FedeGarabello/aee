<script setup>
import useAuth from "./composition/useAuth";
import Menubar from './componentes/menubar.vue';

const { user } = useAuth();
</script>
<template>
  <main class="d-flex flex-column" id="aeeapp">
    <router-view></router-view>
    <Menubar v-if="user.id"></Menubar>
  </main>
</template>
