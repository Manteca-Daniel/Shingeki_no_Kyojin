<template>
    <h1>TITANES</h1>
    <!-- Buscador -->
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar titán..."
        class="search-bar"
    />

    <!-- Lista de titanes -->
    <ul>
        <li
            v-for="titan in filteredTitans"
            :key="titan.id"
        >
            <router-link
                :to="{ name: 'titan', params: { id: titan.id } }"
            >
                <div>
                    <h3>{{ titan.name }}</h3>
                    <img
                        :src="titan.img === 'unknown' ? '/img/Placeholder.png' : titan.img"
                        :alt="titan.name"
                    />
                </div>
            </router-link>
        </li>
    </ul>
    <button
        v-if="currentPage < totalPages"
        @click="loadMoreTitans"
    >
        Cargar más
    </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import "../assets/css/localicacionesComponent.scss";

// Datos y estado
const titans = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

// Computada para filtrar los titanes en base a la búsqueda
const filteredTitans = computed(() => {
    return titans.value.filter((titan) =>
        titan.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

// Cargar titanes desde la API
const fetchTitans = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.attackontitanapi.com/titans?page=${page}`
        );
        if (!response.ok) {
            throw new Error("No se pudieron obtener los datos");
        }
        const data = await response.json();

        if (page === 1) {
            totalPages.value = data.info.pages;
        }

        data.results.forEach((titan) => {
            if (titan.img) {
                titan.img = titan.img.replace(
                    /(\.png|\.jpg|\.jpeg)(.*)$/,
                    "$1"
                );
            }
        });

        titans.value.push(...data.results);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
};

// Inicializar datos al montar el componente
onMounted(() => {
    fetchTitans(currentPage.value);
});

// Cargar más titanes al hacer clic en el botón
const loadMoreTitans = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchTitans(currentPage.value);
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
