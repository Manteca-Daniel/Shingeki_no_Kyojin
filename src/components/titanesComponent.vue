<template>
    <h1>TITANES</h1>
    <ul>


        <li v-for="titan in titans" :key="titan.id">
            <router-link :to="{ name: 'titan', params: { id: titan.id } }">
                <div>
                    <h3>{{ titan.name }}</h3>
                    <img :src="titan.img === 'unknown' ? '/img/Placeholder.png' : titan.img" :alt="titan.name">
                </div>
            </router-link>
        </li>


    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreTitans">Cargar más</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '../assets/css/localicacionesComponent.scss'

const titans = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);

const fetchTitans = async (page = 1) => {
    try {
        const response = await fetch(`https://api.attackontitanapi.com/titans?page=${page}`);
        if (!response.ok) {
            throw new Error("No se pudieron obtener los datos");
        }
        const data = await response.json();

        if (page === 1) {
            totalPages.value = data.info.pages;
        }

        data.results.forEach(titan => {
            if (titan.img) {
                titan.img = titan.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
            }
        });

        titans.value.push(...data.results);
        console.log(`Datos cargados de la página ${page}`);
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