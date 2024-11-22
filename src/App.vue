<template>
  <div class="background-image"></div>
  
  <!-- Header -->
  <header class="bg-dark bg-opacity-75 text-center py-3">
    <h1 class="text-danger fw-bold">SHINGEKI NO KYOJIN WORLD</h1>
    <nav class="mt-3">
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'home' }">Inicio</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'personajes' }">Personajes</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'capitulos' }">Capítulos</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'bandos' }">Bandos</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'curiosidades' }">Curiosidades</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'localicaciones' }">Localicaciones</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'titanes' }">Titanes principales</router-link>
    </nav>
  </header>

  <main class="container my-5 bg-light bg-opacity-75 p-4 rounded shadow">
    <RouterView />
  </main>
</template>

<script setup>
import './styles.scss'
</script>
