<script setup>
import useAuth from "./composition/useAuth";
import Menubar from './componentes/menubar.vue';

const { user } = useAuth();
</script>
<!-- <template>
  <div class="d-flex flex-column justify-content-between vh-100">
    <div>
      <header>
        <nav class="navbar" v-if="user.id !== null">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <h1 class="d-none">Armá el Equipo</h1>
              <img src="img/logo_in.png" alt="Armá el Equipo" class="imgNavbar">
            </a>
          </div>
        </nav>
      </header>
      <main id="aeeapp">
        <router-view></router-view>
      </main>
    </div>
    <div>
      <Menubar v-if="user.id"></Menubar>
    </div>
  </div>
</template> -->

<template>
  <div class="d-flex flex-column justify-content-between ">
    <header>
      <nav class="navbar" v-if="user.id !== null">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <h1 class="d-none">Armá el Equipo</h1>
            <img src="img/logo_in.png" alt="Armá el Equipo" class="imgNavbar">
          </a>
        </div>
      </nav>
    </header>
    <main id="aeeapp">
      <router-view></router-view>
    </main>
  </div>

  <Menubar v-if="user.id"></Menubar>
</template>
