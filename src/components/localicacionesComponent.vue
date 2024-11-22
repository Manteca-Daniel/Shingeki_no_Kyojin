<template>
    <h1>LUGARES</h1>
    <ul>

      
      <li v-for="location in locations" :key="location.id">
        <router-link :to="{ name: 'lugar', params: { id: location.id } }">
          <div>
            <h3>{{ location.name }}</h3>
            <img :src="location.img === 'unknown' ? '/img/Placeholder.png' : location.img" :alt="location.name">
          </div>
        </router-link>
      </li>


    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreLocations">Cargar más</button>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import '../assets/css/localicacionesComponent.scss'
  
  const locations = ref([]);
  const totalPages = ref(0);
  const currentPage = ref(1);
  
  const fetchLocations = async (page = 1) => {
    try {
      const response = await fetch(`https://api.attackontitanapi.com/locations?page=${page}`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }
      const data = await response.json();
  
      if (page === 1) {
        totalPages.value = data.info.pages;
      }
  
      data.results.forEach(location => {
        if (location.img) {
          location.img = location.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
        }
      });
  
      locations.value.push(...data.results);
      console.log(`Datos cargados de la página ${page}`);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };
  
  onMounted(() => {
    fetchLocations(currentPage.value);
  });
  
  const loadMoreLocations = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchLocations(currentPage.value);
    }
  };
</script>