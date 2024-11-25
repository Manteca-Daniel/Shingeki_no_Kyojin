<template>
  <h1>LUGARES</h1>
  <!-- Buscador -->
  <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar lugar..."
      class="search-bar"
  />

  <!-- Lista de lugares -->
  <ul>
      <li
          v-for="location in filteredLocations"
          :key="location.id"
      >
          <router-link
              :to="{ name: 'lugar', params: { id: location.id } }"
          >
              <div>
                  <h3>{{ location.name }}</h3>
                  <img
                      :src="location.img === 'unknown' ? '/img/Placeholder.png' : location.img"
                      :alt="location.name"
                  />
              </div>
          </router-link>
      </li>
  </ul>
  <button
      v-if="currentPage < totalPages"
      @click="loadMoreLocations"
  >
      Cargar más
  </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import "../assets/css/localicacionesComponent.scss";

// Datos y estado
const locations = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

// Computada para filtrar los lugares en base a la búsqueda
const filteredLocations = computed(() => {
  return locations.value.filter((location) =>
      location.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
  );
});

// Cargar lugares desde la API
const fetchLocations = async (page = 1) => {
  try {
      const response = await fetch(
          `https://api.attackontitanapi.com/locations?page=${page}`
      );
      if (!response.ok) {
          throw new Error("No se pudieron obtener los datos");
      }
      const data = await response.json();

      if (page === 1) {
          totalPages.value = data.info.pages;
      }

      data.results.forEach((location) => {
          if (location.img) {
              location.img = location.img.replace(
                  /(\.png|\.jpg|\.jpeg)(.*)$/,
                  "$1"
              );
          }
      });

      locations.value.push(...data.results);
  } catch (error) {
      console.error("Error al cargar los datos:", error);
  }
};

// Inicializar datos al montar el componente
onMounted(() => {
  fetchLocations(currentPage.value);
});

// Cargar más lugares al hacer clic en el botón
const loadMoreLocations = () => {
  if (currentPage.value < totalPages.value) {
      currentPage.value++;
      fetchLocations(currentPage.value);
  }
};
</script>

<style scoped>
.search-bar {
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
