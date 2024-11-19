<template>
    <div class="home">
      <PersonajesComponent />
    </div>
</template>
  
<script>
  import PersonajesComponent from '@/components/personajesComponent.vue';
  
  export default {
    name: 'Personajes',
    components: {
      PersonajesComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  