<template>
    <div v-if="titan" class="titan-card">
        <h1>{{ titan.name }}</h1>
        <img :src="titan.img" :alt="`Image of ${titan.name}`" />
        <p><strong>Height:</strong> {{ titan.height }}</p>
        <p><strong>Abilities:</strong></p>
        <ul>
            <li v-for="ability in titan.abilities" :key="ability">{{ ability }}</li>
        </ul>
        <p><strong>Allegiance:</strong> {{ titan.allegiance }}</p>

        <p><strong>Current Inheritors:</strong></p>
        <ul>
            <li v-for="(inheritor, index) in currentInheritors" :key="index">
                <router-link :to="{ name: 'personajeDetalle', params: { id: inheritor.id } }">
                    {{ inheritor.name }}
                </router-link>
            </li>
        </ul>

        <p><strong>Former Inheritors:</strong></p>
        <ul>
            <li v-for="(inheritor, index) in formerInheritors" :key="index">
                <router-link :to="{ name: 'personajeDetalle', params: { id: inheritor.id } }">
                    {{ inheritor.name }}
                </router-link>
            </li>
        </ul>
    </div>
    <div v-else class="loading">
        <p>Loading Titan data...</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const titan = ref(null);
const currentInheritors = ref([]);
const formerInheritors = computed(() => titan.value?.former_inheritors || []);
const idCharacter = ref('');

const fetchTitan = async (id) => {
    try {
        const response = await fetch(`https://api.attackontitanapi.com/titans/${id}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Datos recibidos del titán:", data);

        data.img = data.img?.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, "$1");

        data.current_inheritor = Array.isArray(data.current_inheritor)
            ? await Promise.all(data.current_inheritor.map((url) => fetchCharacterNameCurrent(url)))
            : [await fetchCharacterNameCurrent(data.current_inheritor)];

        data.former_inheritors = Array.isArray(data.former_inheritors)
            ? await Promise.all(
                data.former_inheritors.map(async (url) => {
                    const { id, name } = await fetchCharacterNameFormers(url); // Destructure the return object
                    return { id, name };
                })
            )
            : [];

        titan.value = data;
        currentInheritors.value = data.current_inheritor;
    } catch (error) {
        console.error("Error fetching titan data:", error);
    }
};

const fetchCharacterNameCurrent = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching character data.");
        const data = await response.json();
        return { id: data.id, name: data.name || "Unknown" };
    } catch (error) {
        console.error("Error fetching character name:", error);
        return { id: "", name: "Desconocido" };
    }
};

const fetchCharacterNameFormers = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching character data.");
        const data = await response.json();
        return { id: data.id, name: data.name || "Unknown" };
    } catch (error) {
        console.error("Error fetching character name:", error);
        return { id: "", name: "Desconocido" };
    }
};

onMounted(() => {
    const titanId = route.params.id;
    if (titanId) fetchTitan(titanId);
});
</script>

<style scoped>
.titan-card {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.titan-card img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.titan-card ul {
    list-style: none;
    padding: 0;
}

.titan-card a {
    color: #007bff;
    text-decoration: none;
}

.titan-card a:hover {
    text-decoration: underline;
}

.loading {
    text-align: center;
    margin-top: 50px;
}
</style>
