<template>
    <div v-if="location">
        <h1>{{ location.name === 'unknown' ? 'Desconocido' : location.name }}</h1>
        <img v-if="isUrl(location.img)" :src="location.img" :alt="location.name" />
        <p><strong>Territorio:</strong> {{ location.territory === 'unknown' ? 'Desconocido' : location.territory }}</p>
        <p><strong>Región:</strong> {{ location.region === 'unknown' ? 'Desconocido' : location.region }}</p>
        <p v-if="notableInhabitants.length">
            <strong>Habitantes Notables:</strong> 
            {{ notableInhabitants.length ? notableInhabitants.join(', ') : 'Desconocido' }}
        </p>
        <p v-if="notableFormerInhabitants.length">
            <strong>Antiguos Habitantes Notables:</strong> 
            {{ notableFormerInhabitants.length ? notableFormerInhabitants.join(', ') : 'Desconocido' }}
        </p>
        <p v-if="location.debut">
            <strong>Debut:</strong>
            <router-link :to="{ name: 'capitulo', params: { id: extractId(location.debut) } }">
                Episodio {{ extractId(location.debut) }}
            </router-link>
        </p>
    </div>
    <div v-else>
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

                // Limpiar URL de la imagen
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
