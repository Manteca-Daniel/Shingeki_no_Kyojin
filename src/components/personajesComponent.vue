<template>
    <h1>PERSONAJES</h1>
    <ul>
        <li v-for="character in characters" :key="character.id">
            <router-link :to="`/personajes/${character.id}`">
                {{ character.name }}
                <img :src="character.img" :alt="character.name">
            </router-link>
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreCharacters">Cargar más</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import '../assets/css/personajesComponent.scss'

    const characters = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(1);

    const fetchCharacters = async (page = 1) => {
        try {
            const response = await fetch(`https://api.attackontitanapi.com/characters?page=${page}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos");
            }
            const data = await response.json();

            if (page === 1) {
                totalPages.value = data.info.pages;
            }
            
            data.results.forEach(organization => {
                if (organization.img) {
                    organization.img = organization.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
                    console.log("La url de la imagen es esta: ", organization.img);
                }
            });

            characters.value.push(...data.results);
            console.log(`Datos cargados de la página ${page}`);

            if (currentPage.value < totalPages.value) {
                currentPage.value++;
                fetchCharacters(currentPage.value);
            }
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    onMounted(() => {
        fetchCharacters(currentPage.value);
    });

    const loadMoreCharacters = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            fetchCharacters(currentPage.value);
        }
    };
</script>
