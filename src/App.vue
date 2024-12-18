<template>
  <div class="background-image"></div>

  <header class="bg-dark bg-opacity-75 text-center py-3">
    <h1 class="text-danger fw-bold">SHINGEKI NO KYOJIN WORLD</h1>
    <nav class="mt-3">
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'home' }">Inicio</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'personajes' }">Personajes</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'capitulos' }">Capítulos</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'bandos' }">Bandos</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'localicaciones' }">Localicaciones</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'titanes' }">Titanes principales</router-link>
      <router-link class="text-white text-decoration-none fw-bold mx-2" :to="{ name: 'curiosidades' }">Curiosidades</router-link>
    </nav>

    
  </header>

  <main class="container my-5 bg-light bg-opacity-75 p-4 rounded shadow">
    <RouterView />
  </main>

  <footer class="bg-dark text-white text-center py-4">
    <h5>Redes Sociales</h5>
    <div class="social-icons-slider">
      <a href="https://www.instagram.com/deitt_mantew7"><i class="fab fa-instagram mx-3 social-icon"></i></a>
      <a href="https://x.com/DeittMantew"><i class="fab fa-twitter mx-3 social-icon"></i></a>
      <a href="https://es-es.facebook.com/people/Daniel-Manteca"><i class="fab fa-facebook mx-3 social-icon"></i></a>
      <a href="https://www.tiktok.com/@d31ttmantew"><i class="fab fa-tiktok mx-3 social-icon"></i></a>
      <a href="https://www.linkedin.com/in/daniel-manteca-garmendia-389b2b2b2/"><i class="fab fa-linkedin mx-3 social-icon"></i></a>
      <a href="https://www.youtube.com/@danielmanteca4007"><i class="fab fa-youtube mx-3 social-icon"></i></a>
    </div>
  </footer>
</template>

<script setup>
import './styles.scss'
</script>
