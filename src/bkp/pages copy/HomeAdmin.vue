<script>
import { routerLink } from 'vue-router';

export default {
  name: "HomeAdmin",
};
</script>

<template>
  <!-- Banner -->
  <section class="banner_main">
    <div class="container">
      <div class="row d_flex">
        <div class="col-md-5">
          <div class="text-bg">
            <h1>
              Admin<br />
              Web Hosting
            </h1>
            <span>Panel</span>
            <p>Administrá los servicios de contratación desde aquí.</p>
            <router-link class="read_more" to="/admin/mensajes">Mensajes</router-link>
            <router-link class="read_more" to="/admin/panel">Panel</router-link>
          </div>
        </div>
        <div class="col-md-7">
          <div class="text-img">
            <figure><img src="images/img.png" /></figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
