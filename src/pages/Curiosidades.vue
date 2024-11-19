<template>
    <div class="home">
      <CuriosidadesComponent />
    </div>
</template>
  
<script>
  import CuriosidadesComponent from '@/components/curiosidadesComponent.vue';
  
  export default {
    name: 'Curiosidades',
    components: {
      CuriosidadesComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  