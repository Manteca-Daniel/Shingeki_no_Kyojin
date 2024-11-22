<template>
    <div class="personaje-detalle">
        <h1 class="nombre">{{ character?.name || 'Cargando...' }}</h1>
        <img :src="character?.img" :alt="character?.name" v-if="character" class="imagen-personaje" />

        <div v-if="character" class="detalles-contenedor">
            <section>
                <h2>Información General</h2>
                <ul class="info-lista">
                    <li><strong>Género:</strong> {{ character.gender }}</li>
                    <li><strong>Edad:</strong> {{ character.age || 'Desconocida' }}</li>
                    <li><strong>Altura:</strong> {{ character.height }}</li>
                    <li><strong>Estado:</strong> {{ character.status }}</li>
                    <li><strong>Lugar de nacimiento:</strong> {{ character.birthplace }}</li>
                    <li><strong>Residencia:</strong> {{ character.residence }}</li>
                    <li><strong>Ocupación:</strong> {{ character.occupation }}</li>
                </ul>
            </section>

            <section>
                <h2>Familia</h2>
                <ul v-if="character.relatives.length > 0" class="familia-lista">
                    <li v-for="(relative, index) in character.relatives[0].members" :key="index">
                        <a v-if="isUrl(relative)" :href="relative" target="_blank">Ver miembro (ID en la API)</a>
                        <span v-else>{{ relative }}</span>
                    </li>
                </ul>
                <p v-else>No hay información sobre familiares.</p>
            </section>

            <section>
                <h2>Grupos</h2>
                <ul class="grupos-lista">
                    <li v-for="group in character.groups" :key="group.name">
                        {{ group.name }}
                        <ul v-if="group.sub_groups && group.sub_groups.length > 0">
                            <li v-for="subGroup in group.sub_groups" :key="subGroup">{{ subGroup }}</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section>
                <h2>Especie</h2>
                <p>{{ character.species.join(', ') }}</p>
            </section>

            <section>
                <h2>Alias</h2>
                <p v-if="character.alias.length > 0">{{ character.alias.join(', ') }}</p>
                <p v-else>Sin alias conocidos.</p>
            </section>

            <section>
                <h2>Episodios</h2>
                <ul class="episodios-lista">
                    <li v-for="(episode, index) in character.episodes" :key="index">
                        <router-link :to="{ name: 'capitulo', params: { id: index+1 } }">
                            Episodio {{ index + 1 }}
                        </router-link>
                    </li>
                </ul>
            </section>
        </div>
        <p v-else>Cargando datos...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const character = ref(null);

const isUrl = (text) => {
    try {
        new URL(text);
        return true;
    } catch (_) {
        return false;
    }
};

const fetchCharacter = async (id) => {
    try {
        const response = await fetch(`https://api.attackontitanapi.com/characters/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del personaje.");
        const data = await response.json();
        if (data.img) {
            data.img = data.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
        }
        character.value = data;
    } catch (error) {
        console.error("Error al obtener los datos del personaje:", error);
    }
};

onMounted(() => {
    const characterId = route.params.id;
    if (characterId) fetchCharacter(characterId);
});
</script>

<style scoped>
.personaje-detalle {
    font-family: 'Arial', sans-serif;
    text-align: center;
    padding: 20px;
    color: #444;
}

.nombre {
    font-size: 2em;
    color: #2c3e50;
    margin-bottom: 15px;
}

.imagen-personaje {
    max-width: 35%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.detalles-contenedor section {
    margin-bottom: 25px;
    text-align: left;
}

.detalles-contenedor h2 {
    color: #2980b9;
    font-size: 1.5em;
    margin-bottom: 10px;
}

.info-lista,
.familia-lista,
.grupos-lista,
.episodios-lista {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.info-lista li,
.familia-lista li,
.grupos-lista li,
.episodios-lista li {
    margin: 5px 0;
    font-size: 1em;
}

a {
    color: #e74c3c;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

p {
    font-size: 1em;
    color: #555;
}
</style>
