<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { computed } from 'vue';

const store = useCounterStore();
const cartItems = computed(() => store.cartItems);

// Computed property for calculating total price
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Function to remove an item from the cart
const removeFromCart = (id: number) => {
  store.removeFromCart(id);
};
</script>

<template>
  <div class="orders">
    <h2>Your Orders</h2>
    <div v-if="cartItems.length > 0">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartItems" :key="product.id">
            <td><img :src="product.image" alt="Product image" /></td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }} USD</td>
            <td>{{ product.quantity }}</td>
            <td>{{ (product.price * product.quantity).toFixed(2) }} USD</td>
            <td><button @click="removeFromCart(product.id)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <p class="total-price">Total Price: {{ totalPrice.toFixed(2) }} USD</p>
    </div>
    <p v-else>No items in cart.</p>
  </div>
</template>

<style>
.orders {
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

.total-price {
  margin-top: 10px;
  font-weight: bold;
  text-align: right;
}

button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}
</style>






  
  
  

