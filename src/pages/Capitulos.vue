<template>
    <div class="home">
      <CapitulosComponent />
    </div>
</template>
  
<script>
  import CapitulosComponent from '@/components/capitulosComponent.vue';
  
  export default {
    name: 'Capitulos',
    components: {
      CapitulosComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  