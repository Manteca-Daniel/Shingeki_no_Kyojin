<template>
    <div>
        <h1>CURIOSIDADES DE SHINGEKI NO KYOJIN</h1>
        <div v-for="curiosidad in curiosidades" :key="index">
            <h3>{{ curiosidad.titulo }}</h3>
            <p>{{ curiosidad.descripcion }}</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import "../assets/css/curiosidadesComponent.scss";

    const curiosidades = ref([]);

    const fetchCuriosidades = async () => {
        try {
            const response = await fetch('/curiosidades.json');
            if (!response.ok) {
                throw new Error('Error al cargar las curiosidades');
            }
            const data = await response.json();
            curiosidades.value = data.curiosidades;
            console.log(curiosidades.value)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    onMounted(fetchCuriosidades);
</script>