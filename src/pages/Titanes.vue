<template>
    <div class="home">
      <TitanesComponent />
    </div>
</template>
  
<script>
  import TitanesComponent from '@/components/titanesComponent.vue';
  
  export default {
    name: 'Titanes',
    components: {
        TitanesComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  