<template>
<div class='page'>
    <img src="/images/banner/contact.jpg" class="photo">
    <h1 class="heading">Favorites</h1>

    <div v-if=favoritesEmpty>
      <h1>You have no current favorites.</h1>
      <p class="contactText black">Browse through the available pets on the adoption page and save any that you would like to come back to.</p>
    </div>
    <div v-else>
      <h1 class="contactText">Current Favorites:</h1>
      <ProductList :products="favorites" v-on:removal="remove($event)"/>
    </div>

    <div class="contactTop">
        <div class="contactItem">
            <h1 class="contactText">Contact Us:</h1>
            <h2 class="contactText">Hours:</h2>
            <p class="contactText">Mon-Fri: 8:00-5:00 PM</p>
            <p class="contactText">Sat: 8:00-8:00 PM</p>
            <p class="contactText">Closed Sundays</p>

            <h2 class="contactText">Contact Info:</h2>
            <p class="contactText">Submit a message on this page or;</p>
            <p class="contactText">email@mycenter.com</p>
            <p class="contactText">801-123-1234</p>
            <p class="contactText">12345 Heritage, Utah 84706</p>
        </div>

        <div class="contactItem">
            <div class="contactForm">
                <form class="pure-form">
                    <div class="formField">
                        <input type="text" placeholder="Name" class="pure-input-1-2 field" required="" />
                        <input type="text" placeholder="Phone Number" class="pure-input-1-2 field" />
                    </div>
                        <input type="email" placeholder="Email" class="pure-input-3-4 field" required="" />
                        <textarea placeholder="Message" class="pure-input-1" required=""></textarea>
                        <div>
                        <button type="submit" class="button-secondary pure-button button field">Send Message</button>
                        </div>
                </form>
            </div>
        </div>
    </div>

    <img src="/images/map.png" class="map">
</div>
</template>

<script>

import ProductList from "../components/FavoriteList.vue";
import axios from 'axios';
export default {
  name: 'Favorites',
  components: {
    ProductList,
  },
  data() {
    return {
      animals: [],
    }
  },
  
  created() {
    this.getAnimals();
  },
  computed: {
    favorites() {
      let animals = this.animals.filter(animal => animal.favorite == true);
      return animals;
    },
    favoritesEmpty() {
      let pets = this.animals.filter(animal => animal.favorite == true);
      let count = pets.length;
      if (count > 0)
        return false;
      else
        return true;
    }
  },
  methods: {
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async remove(id) {
      let myAnimal = this.animals.find(animal => animal._id == id);
      try {
        await axios.put("/api/animals/" + id, {
          name: myAnimal.name,
          gender: myAnimal.gender,
          species: myAnimal.species,
          age: myAnimal.age,
          favorite: false,
          image: myAnimal.image,
          description: myAnimal.description,
        });
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
* {
  color: #4682B4;
}
.map {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border: 2px solid #4682B4;
}
.button-secondary {
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background: #4682B4;
  margin-left: 0!important;
}
.contactForm {
    margin-top: 30px;
}
.contactTop {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
}
.contactItem {
    width: 100%;
}
.contactText {
    color: #4682B4;
    padding: 0;
    margin: 0 0 0 10px;
}
.black {
    color: black;
}
.photo {
    width: 100%;
    height: 300px;
    object-fit: cover;
    position: relative;
}
.heading {
    position: absolute;
    top: 160px;
    left: 20px;
    font-size: 48px;
}
h1 {
  color: #4682B4;
  margin-left: 10px;
}
a {
  color: #4682B4;
}

@media (min-width: 48em) {
    .contactTop {
    flex-direction: row;
    }
    .contactItem {
        width: 50%;
    }
    .heading {
        top: 160px;
        left: 200px;
        font-size: 90px;
    }
    .map {
        margin-top: 10px;
    }
}
</style>