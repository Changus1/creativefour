<template>
<div class='page'>
      <img src="/images/banner/donate.jpg" class="photo">
      <h1 class="adoptheading">Adopt</h1>

      <div v-if="noFilter">
        <div class="adopttop">
          <div class="adopt adopt-1">
            <h3 class="adopttext"><strong>Adoption Process</strong></h3>
            <p class="adopttext">In order to adopt from this facility, there is an application packet and questionnaire.</p>
          </div>
          <div class="adopt adopt-2">
            <h3 class="adopttext"><strong>Adoption Fees</strong></h3>
            <p class="adopttext">Dogs: ~$200-$300</p>
            <p class="adopttext">Cats: ~$100-$150</p>
          </div>
          <div class="adopt adopt-3">
            <h3 class="adopttext"><strong>Post-Adoption</strong></h3>
            <p class="adopttext">We understand that adoption can be a difficult process for owners and pets. We offer followup consultations and accept all returning animals regardless of time passed.</p>
          </div>
        </div>
      
        <div class="findlinktop">
          <div class="linkbody">
            <img src="/images/cat.jpg" class="pic">
            <p class="findlinktext"><a @click="selectSpecies('Cat')" href="#">Find a cat</a></p>
          </div>
          <div class="linkbody">
            <img src="/images/gold.jpg" class="pic">
            <p class="findlinktext"><a @click="selectSpecies('Dog')" href="#">Find a dog</a></p>
          </div>
        </div>

        <h1 class="spacer">Browse Online or Come In-person For A Visit!</h1>
        <img src="/images/banner/pup.jpg" class="spacerpic">
      </div>

      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a @click="deselectAll('Male')" href="#" class="pure-menu-link">Show all animals</a></li>
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a @click="deselectSpecies()" href="#" id="menuLink1" class="pure-menu-link">Species:</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item"><a @click="selectSpecies('Dog')" href="#" class="pure-menu-link">Dog</a></li>
              <li class="pure-menu-item"><a @click="selectSpecies('Cat')" href="#" class="pure-menu-link">Cat</a></li>
            </ul>
          </li>
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a @click="deselectGender()" href="#" id="menuLink2" class="pure-menu-link">Gender:</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item"><a @click="selectGender('Male')" href="#" class="pure-menu-link">Male</a></li>          
              <li class="pure-menu-item"><a @click="selectGender('Female')" href="#" class="pure-menu-link">Female</a></li>
            </ul>
          </li>
          <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
            <a @click="deselectAge()" href="#" id="menuLink2" class="pure-menu-link">Age:</a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item"><a @click="selectAge('4')" href="#" class="pure-menu-link">2-4</a></li>          
              <li class="pure-menu-item"><a @click="selectAge('7')" href="#" class="pure-menu-link">5-7</a></li>
              <li class="pure-menu-item"><a @click="selectAge('10')" href="#" class="pure-menu-link">8-10</a></li>            
            </ul>
          </li>
        </ul>
      </div>    
      
      <div class="filterString">
        <h6>{{filterString}}</h6>
        <p>{{filterSubstring}}</p>
      </div>

      <ProductList :products="products" />
</div>
</template>

<script>
import ProductList from "../components/AnimalList.vue"
export default {
  name: 'Adopt',
  components: {
    ProductList,
  },
  data() {
    return {
      species: '',
      gender: '',
      age1: '',
      age2: '',
      age3: '',
    }
  },
  computed: {
    noFilter() {
      if (this.species != '' || this.gender != '' || this.age1 != '' || this.age2 != '' || this.age3 != '') {
        return false;
      }
      else {
        return true;
      }
    },
    filterString() {
      let string = 'Now Showing: ';
      if (this.species === '' && this.gender === '' && this.age3 === '') {
        return string += 'All Animals'
      }
      else {
        if (this.species != '') {
          string += '-' + this.species + 's ';
        }
        if (this.gender != '') {
          string += '-' + this.gender + 's ';
        }
        if (this.age3 != '') {
          string += '-' + this.age1 + '-' + this.age3 + ' Years Old'
        }
        return string;
      }
    },
    filterSubstring() {
      if (this.species != '' || this.gender != '' || this.age3 != '') {
        return '*Click "Species", "Gender", Or "Age" to deselect individual options';
      }
      return '';
    },
    products() {
      if (this.species === '' && this.gender === '' && this.age2 === '') {
        return this.$root.$data.products;
      }
      else if (this.species != '' && this.gender != '' && this.age2 != '') {
       let filter = this.$root.$data.products.filter(product => product.species === this.species && product.gender === this.gender);
       return filter.filter(element => element.age === this.age1 || element.age === this.age2 || element.age === this.age3);
      }
      else {
        if (this.species != '') {
          if (this.gender != '') {
            return this.$root.$data.products.filter(product => product.species === this.species && product.gender === this.gender);
          }
          else if (this.age3 != '') {
            let filter = this.$root.$data.products.filter(product => product.species === this.species);
            return filter.filter(element => element.age === this.age1 || element.age === this.age2 || element.age === this.age3);
          }
          else {
            return this.$root.$data.products.filter(product => product.species === this.species);
          }
        }
        else if (this.gender != '') {
          if (this.age3 != '') {
            let filter = this.$root.$data.products.filter(product => product.gender === this.gender);
            return filter.filter(element => element.age === this.age1 || element.age === this.age2 || element.age === this.age3);
          }
          else {
            return this.$root.$data.products.filter(product => product.gender === this.gender);
          }
        }
        else {
          return this.$root.$data.products.filter(element => element.age === this.age1 || element.age === this.age2 || element.age === this.age3);
        }
      }
    }
  },
  methods: {
    deselectSpecies() {
      this.species = '';
    },
    deselectGender() {
      this.gender = '';
    },
    deselectAge() {
      this.age1 = '';
      this.age2 = '';
      this.age3 = '';
    },
    deselectAll() {
      this.species = '';
      this.gender = '';
      this.age1 = '';
      this.age2 = '';
      this.age3 = '';
    },
    selectSpecies(species) {
      if (species === this.species) {
        this.species = '';
      }
      else {
        this.species = species;    
      }
    },
    selectGender(gender) {
      if (gender === this.gender) {
        this.gender = '';
      }
      else {
        this.gender = gender;
      }
    }, 
    selectAge(age) {
      if (age === this.age2) {
        this.age1 = '';
        this.age2 = '';
        this.age3 = '';
      }
      else {
        this.age3 = parseInt(age);
        this.age2 = parseInt(age) - 1;
        this.age1 = parseInt(age) - 2;
      }
    },
  }
}
</script>

<style scoped>
* {
  color: #FFFFFF;
}
h6 {
  margin-left: 15px;
  color: #4682B4;
}
.filterString p {
  margin-left: 15px;
  color: #4682B4;
  font-size: 12px;
}
.filterString {
  display: flex;
  flex-direction: column;
}
.photo {
    width: 100%;
    height: 300px;
    object-fit: cover;
    position: relative;
}
.adoptheading {
    position: absolute;
    top: 160px;
    left: 30px;
    font-size: 48px;
    color: #000;
    font-weight: bold;
}
.adopttop {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: #4682B4;
    margin-bottom: 30px;
}
.adopt {
    height: 250px;
    width: 100%;
    align-items: center;
}
.adopttext {
    margin: 0;
    padding: 0;
    text-align: center;   
}
.adopt-1 {
    display: flex;
    flex-direction: column;
    background-color: #346288;
    justify-content: center;
    align-items: center;
}
.adopt-2 {
    display: flex;
    flex-direction: column;
    background-color: #4682B4;
    justify-content: center;
    align-items: center;
}
.adopt-3 {
    display: flex;
    flex-direction: column;
    background-color: #57a6e7;
    justify-content: center;
    align-items: center;
}
.findlinktop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%;
}
.linkbody {
    width: 100%;
    height: 300px;
}
.pic {
    width: 100%;
    height: 80%;
    object-fit: cover;
}
.findlinktext {
    color: #57a6e7;
    text-align: center;
}
.spacerpic {
    width: 100%;
    height: 400px;
    object-fit: cover;
}
h1 {
  color: #4682B4;
}
a {
  color: #4682B4;
}
.spacer {
  margin: 0;
}

@media (min-width: 48em) {
    .adopttop {
        flex-direction: row;
        justify-content: center;
    }
    .adopt {
        width: 25%;
    }
    .adoptheading {
        top: 150px;
        left: 170px;
        font-size: 90px;
    }
    .findlinktop {
        flex-direction: row;
    }
    .linkbody {
        width: 50%;
        height: 300px;
        margin: 5px;
    }
    .findlinktext {
        font-size: 24px;
    }
}
</style>