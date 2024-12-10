<template>
    <div class="curiosidades-container">
        <h1 class="titulo-principal">Curiosidades de Shingeki no Kyojin</h1>
        <div class="curiosidad" v-for="(curiosidad, index) in curiosidades" :key="index">
            <h3 class="curiosidad-titulo">{{ curiosidad.titulo }}</h3>
            <p class="curiosidad-descripcion">{{ curiosidad.descripcion }}</p>
            <img v-if="curiosidad.imagen" :src="curiosidad.imagen"
                :alt="`Curiosidad especial ${index + 1}`" class="curiosidad-imagen" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import "../assets/css/curiosidadesComponent.scss";

const curiosidades = ref([]);

const fetchCuriosidades = async () => {
    try {
        const response = await axios.get('/content/curiosidades.json');
        if (response.status !== 200) {
            throw new Error('Error al cargar las curiosidades');
        }
        curiosidades.value = response.data.curiosidades;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

onMounted(fetchCuriosidades);
</script>
