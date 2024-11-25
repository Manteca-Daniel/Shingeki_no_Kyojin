<template>
  <div class="home">
    <ShingekiMain />
  </div>
</template>

<script>
// Importa el componente
import ShingekiMain from '@/components/ShingekiMain.vue';

export default {
  name: 'Home',
  components: {
    ShingekiMain,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
</style>
