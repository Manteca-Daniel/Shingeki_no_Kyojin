<template>
  <div class="background-image">
    
  </div>
  <header>
    <h1>
      SHINGEKI NO KYOJIN WORLD
    </h1>
    <nav>
      <router-link :to="{ name: 'home' }">Inicio</router-link>
      <router-link :to="{ name: 'personajes' }">Personajes</router-link>
      <router-link :to="{ name: 'capitulos' }">Capitulos</router-link>
      <router-link :to="{ name: 'bandos' }">Bandos</router-link>
      <router-link :to="{ name: 'curiosidades' }">Curiosidades</router-link>
    </nav>
  </header>
  
  <main>
    <RouterView />
  </main>
</template>

<script setup>
  import './styles.scss'
</script>
