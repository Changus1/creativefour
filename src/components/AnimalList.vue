<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="image">
        <img :src="'/images/animals/'+product.image">
      </div>

      <div class="info">
        <h1>Name: {{product.name}}</h1>
        <h2>Gender: {{product.gender}}</h2>
        <h2>Age: {{product.age}} years old</h2>
      </div>
      
      <div v-if="!product.favorite">
      <button v-on:click="favorite(product)" class="auto">Add to Favorites</button>
      </div>
      <div v-else>
        <button class="auto">Added to favorites</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  methods: {
    favorite(pet) {
      pet.favorite = true;
      this.$root.$data.favorites.push(pet);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.product {
  margin: 10px;
  margin-top: 25px;
  width: 200px;
}
.product img {
  border: 2px solid #4682B4;
  height: 250px;
  width: 200px;
  object-fit: cover;
}
img {
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}
.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.info {
  background: #4682B4;
  color: #DCDCDC;
  padding: 10px 30px;
  height: 100px;
}
.info h1 {
  color: #DCDCDC;
  font-size: 16px;
}
.info h2 {
  font-size: 14px;
}
.info p {
  margin: 0px;
  font-size: 10px;
}
.info h5 {
  margin: 0px;
  text-align: right;
}
.price {
  display: flex;
}
button {
  height: 50px;
  width: 100%;
  background: #4682B4;
  color: #DCDCDC;
  border: 1px solid black;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
}
.auto {
  margin-left: auto;
}
h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
</style>