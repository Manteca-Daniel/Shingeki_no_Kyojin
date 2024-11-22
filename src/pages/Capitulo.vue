<template>
    <div class="iframe-container">
        <iframe :src="cap" frameborder="0" allowfullscreen></iframe>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useRoute } from "vue-router";

    const capitulo = ref([]);
    const selectedCapitulo = ref(null);
    const cap = ref('');

    const route = useRoute();
    const id = ref(route.params.id);
    
    const fetchCapitulo = async () => {
        try {
            const response = await fetch('/content/caps.json');
            if (!response.ok) {
            throw new Error('Error al cargar los capítulos');
            }
            const data = await response.json();

            const capituloArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
            }));

            capitulo.value = capituloArray;

            const foundCapitulo = capituloArray.find(item => item.id === id.value.toString());
            if (foundCapitulo) {
                selectedCapitulo.value = foundCapitulo;
                cap.value = foundCapitulo.japones;
            } else {
                console.error("Capítulo no encontrado");
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    
    watch(id, fetchCapitulo);
    
    onMounted(fetchCapitulo);
</script>

<style scoped>
    /* Contenedor responsivo para el iframe */
    .iframe-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* Aspect ratio 16:9 (altura:ancho) */
        height: 0;
        overflow: hidden;
    }

    /* Estilo del iframe */
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* Medidas adicionales para móviles y tablets */
    @media (max-width: 768px) {
        .iframe-container {
            padding-bottom: 56.25%; /* 16:9 */
        }
    }

    @media (max-width: 480px) {
        .iframe-container {
            padding-bottom: 75%; /* Ajuste para pantallas más pequeñas */
        }
    }
</style>
