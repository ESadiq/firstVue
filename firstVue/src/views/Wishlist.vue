<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { computed } from 'vue';

const store = useCounterStore();
const wishlistItems = computed(() => store.wishlistItems);

// Function to remove an item from the wishlist
const removeFromWishlist = (id: number) => {
  store.removeFromWishlist(id);
};
</script>

<template>
  <div class="wishlist">
    <h2>Your Wishlist</h2>
    <div v-if="wishlistItems.length > 0">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in wishlistItems" :key="product.id">
            <td><img :src="product.image" alt="Product image" /></td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }} USD</td>
            <td><button @click="removeFromWishlist(product.id)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No items in wishlist.</p>
  </div>
</template>

<style>
.wishlist {
  margin-top: 50px;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

table img{
  width: 20%;
}

button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
</style>




