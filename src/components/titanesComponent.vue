<template>
    <h1>TITANES</h1>
    <input type="text" v-model="searchQuery" placeholder="Buscar titán..." class="search-bar" />

    <ul>
        <li v-for="titan in filteredTitans" :key="titan.id">
            <router-link :to="{ name: 'titan', params: { id: titan.id } }">
                <div>
                    <h3>{{ titan.name }}</h3>
                    <img :src="titan.img === 'unknown' ? '/img/Placeholder.png' : titan.img" :alt="titan.name" />
                </div>
            </router-link>
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreTitans">
        Cargar más
    </button>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import "../assets/css/localicacionesComponent.scss";

const titans = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

const filteredTitans = computed(() => {
    return titans.value.filter((titan) =>
        titan.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
    );
});

const fetchTitans = async (page = 1) => {
    try {
        const response = await axios.get("https://api.attackontitanapi.com/titans", {
            params: { page },
        });

        const data = response.data;

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

onMounted(() => {
    fetchTitans(currentPage.value);
});

const loadMoreTitans = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchTitans(currentPage.value);
    }
};
</script>