<template>
    <div class="home">
      <BandosComponent />
    </div>
</template>
  
<script>
  import BandosComponent from '@/components/bandosComponent.vue';
  
  export default {
    name: 'Bandos',
    components: {
      BandosComponent,
    },
  };
</script>
  
<style scoped>
  .home {
    text-align: center;
    padding: 20px;
  }
</style>
  