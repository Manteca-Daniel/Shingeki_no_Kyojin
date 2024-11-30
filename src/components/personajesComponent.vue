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
import axios from "axios";
import "../assets/css/personajesComponent.scss";

const characters = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");
const cancelToken = ref(null);

const filteredCharacters = computed(() => {
    return characters.value.filter((character) =>
        character.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

const fetchCharacters = async (page = 1) => {
    try {
        if (cancelToken.value) {
            cancelToken.value.cancel("Nueva solicitud realizada");
        }

        cancelToken.value = axios.CancelToken.source();

        const response = await axios.get(`https://api.attackontitanapi.com/characters`, {
            params: { page },
            cancelToken: cancelToken.value.token,
        });

        const data = response.data;

        if (page === 1) {
            totalPages.value = data.info.pages;
        }

        data.results.forEach((organization) => {
            if (organization.img) {
                organization.img = organization.img.replace(
                    /(\.png|\.jpg|\.jpeg)(.*)$/i,
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
        if (axios.isCancel(error)) {
            console.log("Solicitud cancelada:", error.message);
        } else {
            console.error("Error al cargar los datos:", error);
        }
    }
};

onBeforeMount(() => {
    console.log("Componente a punto de montarse");

    if (typeof window !== "undefined" && window.someTimer) {
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
    } else {
        console.log("El componente se ha actualizado");
    }
});

onBeforeUnmount(() => {
    console.log("Componente a punto de desmontarse");
    if (cancelToken.value) {
        cancelToken.value.cancel("Componente desmontado");
    }

    if (typeof window !== "undefined" && window.someTimer) {
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
