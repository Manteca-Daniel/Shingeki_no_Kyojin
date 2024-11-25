<template>
    <h1>BANDOS</h1>
    <!-- Buscador -->
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar bando..."
        class="search-bar"
    />

    <!-- Lista de bandos -->
    <ul>
        <li
            v-for="organization in filteredOrganizations"
            :key="organization.id"
        >
            <router-link
                :to="{ name: 'bando', params: { id: organization.id } }"
            >
                <div>
                    <h3>{{ organization.name }}</h3>
                    <img
                        :src="organization.img === 'unknown' ? '/img/Placeholder.png' : organization.img"
                        :alt="organization.name"
                    />
                </div>
            </router-link>
        </li>
    </ul>
    <button
        v-if="currentPage < totalPages"
        @click="loadMoreOrganizations"
    >
        Cargar más
    </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import "../assets/css/bandosComponent.scss";

// Datos y estado
const organizations = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

// Computada para filtrar los bandos en base a la búsqueda
const filteredOrganizations = computed(() => {
    return organizations.value.filter((organization) =>
        organization.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

// Cargar bandos desde la API
const fetchOrganizations = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.attackontitanapi.com/organizations?page=${page}`
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

        organizations.value.push(...data.results);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
};

// Inicializar datos al montar el componente
onMounted(() => {
    fetchOrganizations(currentPage.value);
});

// Cargar más bandos al hacer clic en el botón
const loadMoreOrganizations = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchOrganizations(currentPage.value);
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
