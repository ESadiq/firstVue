<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { computed } from 'vue';

const store = useCounterStore();
const wishlistItems = computed(() => store.wishlistItems);
</script>

<template>
  <div class="wishlist">
    <h2>Your Wishlist</h2>
    <div v-if="wishlistItems.length > 0">
      <div class="wishlist-item" v-for="product in wishlistItems" :key="product.id">
        <img :src="product.image" alt="Product image" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }} USD</p>
      </div>
    </div>
    <p v-else>No items in wishlist.</p>
  </div>
</template>

<style>
/* Styles for Wishlist.vue */
</style>


