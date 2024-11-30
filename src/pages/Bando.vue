<template>
    <div class="container">
        <div v-if="organization" class="card">
            <h1 class="title">{{ organization.name }}</h1>
            <img :src="organization.img" :alt="organization.name" class="image" />
            <p class="info"><strong>Affiliation:</strong> {{ organization.affiliation }}</p>

            <p class="info">
                <strong>Episodio Debut:</strong>
                <router-link :to="{ name: 'capitulo', params: { id: extractId(organization.debut) } }">
                    {{ extractId(organization.debut) }}
                </router-link>
            </p>

            <div v-if="organization.notable_members.length" class="section">
                <h2 class="subtitle">Notable Members</h2>
                <ul class="list">
                    <li v-for="(member, index) in organization.notable_members" :key="member" class="list-item">
                        <router-link :to="{ name: 'personajeDetalle', params: { id: extractId(member) } }">
                            {{ miembro[index] }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div v-if="organization.notable_former_members.length" class="section">
                <h2 class="subtitle">Notable Former Members</h2>
                <ul class="list">
                    <li v-for="formerMember in organization.notable_former_members" :key="formerMember"
                        class="list-item">
                        <a :href="formerMember" target="_blank" class="link">{{ formerMember.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <p v-else class="loading">Loading organization data...</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const organization = ref(null);
const miembro = ref([]);

const fetchOrganization = async (id) => {
    try {
        const response = await axios.get(`https://api.attackontitanapi.com/organizations/${id}`);
        organization.value = response.data;

        if (organization.value && organization.value.img) {
            organization.value.img = organization.value.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
        }

        if (organization.value.notable_members) {
            miembro.value = await Promise.all(
                organization.value.notable_members.map((url) => nameCharacter(url))
            );
        }
    } catch (error) {
        console.error("Error fetching organization:", error);
    }
};

const nameCharacter = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.name || "Nombre no disponible";
    } catch (error) {
        console.error("Error fetching character data:", error);
        return url;
    }
};

const extractId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
};

// Llamar a la API al montar el componente
onMounted(() => {
    const id = route.params.id; // Obtener el parámetro ID de la URL.
    if (id) fetchOrganization(id);
});
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Títulos */
.title {
    font-size: 2em;
    margin-bottom: 10px;
    color: #2c3e50;
}

.subtitle {
    font-size: 1.5em;
    margin: 20px 0 10px;
    color: #34495e;
}

/* Imagen */
.image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 20px 0;
    border: 1px solid #ddd;
}

/* Información */
.info {
    font-size: 1em;
    margin: 10px 0;
}

.link {
    color: #3498db;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

/* Listas */
.list {
    list-style: none;
    padding: 0;
}

.list-item {
    margin: 5px 0;
}

.list-item a {
    color: #3498db;
    text-decoration: none;
}

.list-item a:hover {
    text-decoration: underline;
}
</style>
