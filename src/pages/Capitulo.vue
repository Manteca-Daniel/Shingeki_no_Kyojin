<template>
    <div class="capitulo-container">
        <div v-if="selectedCapitulo" class="capitulo-titulo">
            Capítulo {{ selectedCapitulo.id }}
        </div>
        <div v-else class="capitulo-cargando">
            Cargando capítulo...
        </div>

        <div class="iframe-container">
            <iframe :src="cap" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="navegacion-container">
            <div class="navegacion-item">
                <router-link
                    v-if="selectedCapitulo"
                    :to="{ name: 'capitulo', params: { id: selectedCapitulo.id - 1 } }"
                >
                    <button class="back" :disabled="selectedCapitulo.id === 1">Anterior Capítulo</button>
                </router-link>
            </div>

            <div class="navegacion-item">
                <router-link :to="{ name: 'capitulos' }">
                    <button class="caps">Lista de episodios</button>
                </router-link>
            </div>

            <div class="navegacion-item">
                <router-link
                    v-if="selectedCapitulo"
                    :to="{ name: 'capitulo', params: { id: selectedCapitulo.id + 1 } }"
                >
                    <button class="next" :disabled="selectedCapitulo.id === 88">Siguiente Capítulo</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const capitulo = ref([]);
const selectedCapitulo = ref(null);
const cap = ref("");

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);

const fetchCapitulo = async () => {
    try {
        const response = await axios.get("/content/caps.json");
        const data = response.data;

        const capituloArray = Object.keys(data).map((key) => ({
            id: parseInt(key, 10),
            ...data[key],
        }));

        capitulo.value = capituloArray;

        const foundCapitulo = capituloArray.find(
            (item) => item.id === parseInt(id.value, 10)
        );
        if (foundCapitulo) {
            selectedCapitulo.value = foundCapitulo;
            cap.value = foundCapitulo.japones;
        } else {
            console.error("Capítulo no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

// Forzar recarga de la página al cambiar de capítulo
watch(() => route.params.id, (newId, oldId) => {
    if (newId !== oldId) {
        window.location.reload(); // Recarga la página completamente
    }
});

onMounted(fetchCapitulo);
</script>


<style scoped>
.capitulo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.capitulo-titulo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.capitulo-cargando {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
}

.iframe-container {
    width: 100%;
    max-width: 800px;
    height: 450px;
    margin-bottom: 20px;
}

.iframe-container iframe {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.navegacion-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
}

.navegacion-item {
    flex: 1;
    text-align: center;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}
</style>
