<template>
    <div class="home">
      <LocalicacionesComponent />
    </div>
</template>
  
<script>
  import LocalicacionesComponent from '@/components/localicacionesComponent.vue';
  
  export default {
    name: 'Localicaciones',
    components: {
        LocalicacionesComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  