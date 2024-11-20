<template>
    <iframe :src="cap" frameborder="0" width="640" height="360" allowfullscreen></iframe>
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
  