<template>
    <div class="personaje-detalle">
        <h1>{{ character?.name || 'Cargando...' }}</h1>
        <img :src="character?.img" :alt="character?.name" v-if="character" />

        <div v-if="character">
            <h2>Información General</h2>
            <ul>
                <li><strong>Género:</strong> {{ character.gender }}</li>
                <li><strong>Edad:</strong> {{ character.age || 'Desconocida' }}</li>
                <li><strong>Altura:</strong> {{ character.height }}</li>
                <li><strong>Estado:</strong> {{ character.status }}</li>
                <li><strong>Lugar de nacimiento:</strong> {{ character.birthplace }}</li>
                <li><strong>Residencia:</strong> {{ character.residence }}</li>
                <li><strong>Ocupación:</strong> {{ character.occupation }}</li>
            </ul>

            <h2>Familia</h2>
            <ul v-if="character.relatives.length > 0">
                <li v-for="(relative, index) in character.relatives[0].members" :key="index">
                    <a v-if="isUrl(relative)" :href="relative" target="_blank">Ver miembro (ID en la API)</a>
                    <span v-else>{{ relative }}</span>
                </li>
            </ul>
            <p v-else>No hay información sobre familiares.</p>

            <h2>Grupos</h2>
            <ul>
                <li v-for="group in character.groups" :key="group.name">
                    {{ group.name }}
                    <ul v-if="group.sub_groups && group.sub_groups.length > 0">
                        <li v-for="subGroup in group.sub_groups" :key="subGroup">{{ subGroup }}</li>
                    </ul>
                </li>
            </ul>

            <h2>Especie</h2>
            <p>{{ character.species.join(', ') }}</p>

            <h2>Alias</h2>
            <p v-if="character.alias.length > 0">{{ character.alias.join(', ') }}</p>
            <p v-else>Sin alias conocidos.</p>

            <h2>Episodios</h2>
            <ul>
                <li v-for="(episode, index) in character.episodes" :key="index">
                    <a :href="episode" target="_blank">Episodio {{ index + 1 }}</a>
                </li>
            </ul>
        </div>
        <p v-else>Cargando datos...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const character = ref(null);

// Función para determinar si un texto es una URL
const isUrl = (text) => {
    try {
        new URL(text);
        return true;
    } catch (_) {
        return false;
    }
};

// Función para obtener los datos del personaje
const fetchCharacter = async (id) => {
    try {
        const response = await fetch(`https://api.attackontitanapi.com/characters/${id}`);
        if (!response.ok) {
            throw new Error("No se pudo obtener la información del personaje.");
        }

        // La API devuelve un único personaje
        const data = await response.json();

        // Procesar la URL de la imagen si existe
        if (data.img) {
            data.img = data.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
            console.log("La url de la imagen es esta: ", data.img);
        } else {
            console.log('No hay imagen disponible.');
        }

        // Asignar el personaje procesado al ref
        character.value = data;
    } catch (error) {
        console.error("Error al obtener los datos del personaje:", error);
    }
};

// Carga inicial
onMounted(() => {
    const characterId = route.params.id;
    if (characterId) {
        fetchCharacter(characterId);
    }
});
</script>

<style scoped>
.personaje-detalle {
    text-align: center;
    padding: 20px;
}

.personaje-detalle img {
    max-width: 300px;
    margin: 20px 0;
}

.personaje-detalle h2 {
    margin-top: 20px;
    color: #333;
}

.personaje-detalle ul {
    list-style-type: none;
    padding: 0;
}

.personaje-detalle li {
    margin: 5px 0;
}

.personaje-detalle a {
    color: #007bff;
    text-decoration: none;
}

.personaje-detalle a:hover {
    text-decoration: underline;
}
</style>
