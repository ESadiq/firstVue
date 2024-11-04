<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { computed } from 'vue';

const store = useCounterStore();
const cartItems = computed(() => store.cartItems);
</script>

<template>
  <div class="orders">
    <h2>Your Orders</h2>
    <div v-if="cartItems.length > 0">
      <div class="order-item" v-for="product in cartItems" :key="product.id">
        <img :src="product.image" alt="Product image" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} USD</p>
      </div>
    </div>
    <p v-else>No items in cart.</p>
  </div>
</template>

<style>
/* Styles for Orders.vue */
</style>


  
  
  

