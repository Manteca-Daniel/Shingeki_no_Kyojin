<template>
    <h1>CAPÍTULOS</h1>
    <ul>
        <li v-for="chapter in chapters" :key="chapter.id">
            {{ chapter.name }}
            <img :src="chapter.img" :alt="chapter.name">
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreChapters">Cargar más</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import '../assets/css/capitulosComponent.scss'

    const chapters = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(1);

    const fetchChapters = async (page = 1) => {
        try {
            const response = await fetch(`https://api.attackontitanapi.com/episodes?page=${page}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos");
            }
            const data = await response.json();

            if (page === 1) {
                totalPages.value = data.info.pages;
            }

            data.results.forEach(chapter => {
                if (chapter.img) {
                    chapter.img = chapter.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
                    console.log("La url de la imagen es esta: ", chapter.img);
                }
            });

            chapters.value.push(...data.results);
            console.log(`Datos cargados de la página ${page}`);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    onMounted(() => {
        fetchChapters(currentPage.value); // Cambié fetchChapter a fetchChapters
    });

    const loadMoreChapters = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            fetchChapters(currentPage.value); // Cambié fetchChapter a fetchChapters
        }
    };
</script>
