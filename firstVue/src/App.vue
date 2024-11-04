<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('vue')
import Header from './components/Header.vue';
import { RouterView } from "vue-router"

</script>




<template>
  <div class="rectangle17">
    <Header />
    <main>
      <RouterView/>
    </main>
    
  </div>
   
</template>