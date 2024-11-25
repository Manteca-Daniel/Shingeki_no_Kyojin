<template>
    <h1>PERSONAJES</h1>
    <input type="text" v-model="searchQuery" placeholder="Buscar personaje..." class="search-bar" />

    <ul>
        <li v-for="character in filteredCharacters" :key="character.id">
            <router-link :to="{ name: 'personajeDetalle', params: { id: character.id } }">
                <div>
                    <h3>{{ character.name }}</h3>
                    <img :src="character.img || '/img/Placeholder.png'" :alt="character.name" />
                </div>
            </router-link>
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreCharacters">
        Cargar más
    </button>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount, onUpdated, onBeforeUnmount } from "vue";
import "../assets/css/personajesComponent.scss";

const characters = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");
const abortController = ref(null);

const filteredCharacters = computed(() => {
    return characters.value.filter((character) =>
        character.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

const fetchCharacters = async (page = 1) => {
    try {
        if (abortController.value) {
            abortController.value.abort();
        }

        abortController.value = new AbortController();

        const response = await fetch(
            `https://api.attackontitanapi.com/characters?page=${page}`,
            { signal: abortController.value.signal }
        );

        if (!response.ok) {
            throw new Error("No se pudieron obtener los datos");
        }

        const data = await response.json();

        if (page === 1) {
            totalPages.value = data.info.pages;
        }

        data.results.forEach((organization) => {
            if (organization.img) {
                organization.img = organization.img.replace(
                    /(\.png|\.jpg|\.jpeg)(.*)$/,
                    "$1"
                );
            }
        });

        characters.value.push(...data.results);

        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            fetchCharacters(currentPage.value);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error("Error al cargar los datos:", error);
        }
    }
};

onBeforeMount(() => {
    console.log("Componente a punto de montarse");

    if (typeof window !== 'undefined' && window.someTimer) {
        clearTimeout(window.someTimer);
    }
});

onMounted(() => {
    console.log("Componente montado");
    fetchCharacters(currentPage.value);
});

onUpdated(() => {
    if (filteredCharacters.value.length === 0 && searchQuery.value !== "") {
        console.log("No se encontraron personajes con la búsqueda: ", searchQuery.value);
    }
    else {
        console.log("El componente se ha actualizado");
    }
});

onBeforeUnmount(() => {
    console.log("Componente a punto de desmontarse");
    if (abortController.value) {
        abortController.value.abort();
    }

    if (typeof window !== 'undefined' && window.someTimer) {
        clearTimeout(window.someTimer);
    }
});

const loadMoreCharacters = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchCharacters(currentPage.value);
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
