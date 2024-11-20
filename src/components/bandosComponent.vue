<template>
    <h1>BANDOS</h1>
    <ul>
        <li v-for="organization in organizations" :key="organization.id">
            {{ organization.name }}
            <img :src="organization.img" :alt="organization.name">
        </li>
    </ul>
    <button v-if="currentPage < totalPages" @click="loadMoreOrganizations">Cargar más</button>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import '../assets/css/bandosComponent.scss'

    const organizations = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(1);

    const fetchOrganizations = async (page = 1) => {
        try {
            const response = await fetch(`https://api.attackontitanapi.com/organizations?page=${page}`);
            if (!response.ok) {
                throw new Error("No se pudieron obtener los datos");
            }
            const data = await response.json();

            if (page === 1) {
                totalPages.value = data.info.pages;
            }

            data.results.forEach(organization => {
                if (organization.img) {
                    organization.img = organization.img.replace(/(\.png|\.jpg|\.jpeg)(.*)$/, '$1');
                    console.log("La url de la imagen es esta: ", organization.img);
                }
            });

            organizations.value.push(...data.results);
            console.log(`Datos cargados de la página ${page}`);
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    };

    onMounted(() => {
        fetchOrganizations(currentPage.value);
    });

    const loadMoreOrganizations = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
            fetchOrganizations(currentPage.value);
        }
    };
</script>
