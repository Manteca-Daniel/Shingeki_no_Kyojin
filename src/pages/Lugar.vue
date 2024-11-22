<template>
    <div v-if="location" class="location-container">
        <h1 class="location-name">{{ location.name === 'unknown' ? 'Desconocido' : location.name }}</h1>
        <img
            v-if="isUrl(location.img)"
            :src="location.img"
            :alt="location.name"
            class="location-image"
        />
        <p class="location-detail"><strong>Territorio:</strong> {{ location.territory === 'unknown' ? 'Desconocido' : location.territory }}</p>
        <p class="location-detail"><strong>Región:</strong> {{ location.region === 'unknown' ? 'Desconocido' : location.region }}</p>
        <p v-if="notableInhabitants.length" class="location-detail">
            <strong>Habitantes Notables:</strong>
            {{ notableInhabitants.length ? notableInhabitants.join(', ') : 'Desconocido' }}
        </p>
        <p v-if="notableFormerInhabitants.length" class="location-detail">
            <strong>Antiguos Habitantes Notables:</strong>
            {{ notableFormerInhabitants.length ? notableFormerInhabitants.join(', ') : 'Desconocido' }}
        </p>
        <p v-if="location.debut" class="location-detail">
            <strong>Debut:</strong>
            <router-link :to="{ name: 'capitulo', params: { id: extractId(location.debut) } }">
                Episodio {{ extractId(location.debut) }}
            </router-link>
        </p>
    </div>
    <div v-else class="loading-container">
        <p>Cargando datos del lugar...</p>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const location = ref(null);
        const notableInhabitants = ref([]);
        const notableFormerInhabitants = ref([]);

        const isUrl = (text) => {
            try {
                new URL(text);
                return true;
            } catch (_) {
                return false;
            }
        };

        const extractId = (url) => {
            const parts = url.split('/');
            return parts[parts.length - 1];
        };

        const nameCharacter = async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("No se pudo obtener la información del personaje.");
                const data = await response.json();
                return data.name;
            } catch (error) {
                console.error("Error al obtener los datos del personaje:", error);
                return url;
            }
        };

        const fetchLocation = async (id) => {
            try {
                const response = await fetch(`https://api.attackontitanapi.com/locations/${id}`);
                if (!response.ok) throw new Error("No se pudo obtener la información del lugar.");
                const data = await response.json();

                if (data.img) {
                    data.img = data.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
                }
                location.value = data;

                // Resolver habitantes notables
                if (data.notable_inhabitants) {
                    notableInhabitants.value = await Promise.all(
                        data.notable_inhabitants.map((url) => nameCharacter(url))
                    );
                }

                if (data.notable_former_inhabitants) {
                    notableFormerInhabitants.value = await Promise.all(
                        data.notable_former_inhabitants.map((url) => nameCharacter(url))
                    );
                }
            } catch (error) {
                console.error("Error al obtener los datos del lugar:", error);
            }
        };

        onMounted(() => {
            const locationId = route.params.id;
            if (locationId) fetchLocation(locationId);
        });

        return {
            location,
            notableInhabitants,
            notableFormerInhabitants,
            isUrl,
            extractId,
        };
    },
};
</script>

<style scoped>
.location-container {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

.location-name {
    font-size: 24px;
    color: #333;
    margin-bottom: 16px;
    text-align: center;
}

.location-image {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.location-detail {
    font-size: 16px;
    color: #555;
    margin: 8px 0;
}

.location-detail strong {
    color: #222;
}

.loading-container {
    text-align: center;
    font-size: 18px;
    color: #666;
}
</style>

