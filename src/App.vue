<script setup>

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="app">
    <div class="links">
      <RouterLink to="/chat">Chat</RouterLink>
      <RouterLink to="/exposicion">Ejemplo</RouterLink>
    </div>

    <RouterView />
  </div>
  <!--
  <h2>Array asincrono</h2>
  <div v-for="element in arrayAsincrono">
    <h1 v-on:click="aumentarContador(element)">{{ element.position }}</h1>
  </div>
  -->
</template>

<style>
  .links{
    display: flex;
    flex-direction: column;
  }

</style>
