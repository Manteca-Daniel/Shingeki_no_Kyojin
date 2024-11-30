<template>
    <h1>BANDOS</h1>
    <!-- Buscador -->
    <input type="text" v-model="searchQuery" placeholder="Buscar bando..." class="search-bar" />

    <ul>
        <li v-for="organization in filteredOrganizations" :key="organization.id">
            <router-link :to="{ name: 'bando', params: { id: organization.id } }">
                <div>
                    <h3>{{ organization.name }}</h3>
                    <img :src="organization.img === 'unknown' ? '/img/Placeholder.png' : organization.img"
                        :alt="organization.name" />
                </div>
            </router-link>
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreOrganizations">
        Cargar más
    </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import "../assets/css/bandosComponent.scss";

// Datos y estado
const organizations = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");
const cancelToken = ref(null);

const filteredOrganizations = computed(() => {
    return organizations.value.filter((organization) =>
        organization.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

const fetchOrganizations = async (page = 1) => {
    try {
        if (cancelToken.value) {
            cancelToken.value.cancel("Nueva solicitud realizada");
        }
        cancelToken.value = axios.CancelToken.source();

        const response = await axios.get(
            `https://api.attackontitanapi.com/organizations`,
            {
                params: { page },
                cancelToken: cancelToken.value.token,
            }
        );

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

        organizations.value.push(...data.results);
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Solicitud cancelada:", error.message);
        } else {
            console.error("Error al cargar los datos:", error);
        }
    }
};

onMounted(() => {
    fetchOrganizations(currentPage.value);
});

const loadMoreOrganizations = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchOrganizations(currentPage.value);
    }
};
</script>