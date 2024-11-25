<template>
  <div class="chapters-container">
    <h1>CAPÍTULOS</h1>
    <Splide class="splide" :options="{
      perPage: 4,
      pagination: false,
      arrows: true,
      gap: '1rem',
      breakpoints: {
        1024: { perPage: 3, gap: '0.5rem' },
        768: { perPage: 2, gap: '0.5rem' },
        480: { perPage: 1, gap: '0.5rem' },
      }
    }" aria-label="CAPÍTULOS">
      <SplideSlide v-for="chapter in chapters" :key="chapter.id">
        <router-link :to="{ name: 'capitulo', params: { id: chapter.id } }">
          <div class="chapter-card">
            <h3 class="chapter-title">{{ chapter.id + ' - ' + chapter.name }}</h3>
            <img :src="chapter.img || '/img/Placeholder.png'" :alt="chapter.name" class="chapter-image" />
          </div>
        </router-link>
      </SplideSlide>

    </Splide>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '../assets/css/capitulosComponent.scss';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/css'; // Importar estilos de Splide

const chapters = ref([]);

// Función para cargar todos los capítulos
const fetchAllChapters = async () => {
  try {
    let page = 1;
    let allChapters = [];
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await fetch(`https://api.attackontitanapi.com/episodes?page=${page}`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();
      data.results.forEach(chapter => {
        if (chapter.img) {
          chapter.img = chapter.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
        }
      });

      allChapters.push(...data.results);

      // Verifica si hay más páginas para cargar
      hasMorePages = page < data.info.pages;
      page++;
    }

    chapters.value = allChapters;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
};

onMounted(() => {
  fetchAllChapters();
});
</script>

<style scoped>
.chapters-container {
  padding: 20px;
}

.splide {
  margin-top: 20px;
}

.chapter-card {
  text-align: center;
  padding: 10px;
}

.chapter-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.chapter-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
