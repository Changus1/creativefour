<template>
<div class="page">
  <img src="/images/banner/lined.jpg" class="photo">
  <h1 class="mainHead">Admin Page</h1>
  
  <details>
    <summary>Add an Animal</summary>
    <div class="add">
      <div class="form">
        <div class="column">
          <input v-model="name" placeholder="Name">
          <div class="check">
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="gender" id="male" value="Male">
              <label for="male">Male</label><br>
            </div>
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="gender" id="female" value="Female">
              <label for="female">Female</label><br>
            </div>
          </div>
          <div class="check">
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="species" id="cat" value="Cat">
              <label for="cat">Cat</label><br>
            </div>
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="species" id="dog" value="Dog">
              <label for="dog">Dog</label><br>
            </div>
          </div>
          <input type="number" v-model="age" placeholder="Age" min="2" max="10">
          <textarea v-model="description" placeholder="Description"></textarea>
        </div>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload()">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2> - {{addItem.name}} was added</h2>
        <img :src="addItem.image" />
      </div>
    </div>
  </details>

  <details>
    <summary>Edit or Delete an Animal</summary>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectAnimal(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <div class="column">
          <input v-model="findItem.name">
          <div class="check">
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="findItem.gender" id="male" value="Male">
              <label for="male">Male</label><br>
            </div>
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="findItem.gender" id="female" value="Female">
              <label for="female">Female</label><br>
            </div>
          </div>
          <div class="check">
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="findItem.species" id="cat" value="Cat">
              <label for="cat">Cat</label><br>
            </div>
            <div class="checkSingle">
              <input class="radio" type="radio" v-model="findItem.species" id="dog" value="Dog">
              <label for="dog">Dog</label><br>
            </div>
          </div>
          <input type="number" v-model="findItem.age" min="2" max="10">
          <textarea v-model="findItem.description"></textarea>
        </div>
        <img :src="findItem.image" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteAnimal(findItem)">Delete</button>
        <button @click="editAnimal(findItem)">Save</button>
      </div>
    </div>
  </details>

  <!-- ********************************************************************************************* -->

  <details>
    <summary>Add New Banner (Home Page)</summary>
    <div class="add">
      <div class="form">
        <div class="column">
          <input v-model="h1" placeholder="Header">
          <textarea v-model="p1" placeholder="Details"></textarea>
          <input v-model="p2" placeholder="Link">
        </div>
        <p></p>
        <input type="file" name="photo" @change="fileChanged2">
        <button @click="upload2()">Upload</button>
      </div>
      <div class="upload" v-if="addItem2">
        <h2> - {{addItem2.h1}} was added</h2>
        <p> - {{addItem2.p1}} </p>
      </div>
    </div>
  </details>

  <details>
    <summary>Edit or Delete a Banner (Home Page)</summary>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle2" placeholder="Search">
        <div class="suggestions" v-if="suggestions2.length > 0">
          <div class="suggestion" v-for="s in suggestions2" :key="s.id" @click="selectBanner(s)">{{s.h1}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem2">
        <div class="column">
          <input v-model="findItem2.h1">
          <textarea v-model="findItem2.p1"></textarea>
          <input v-model="findItem2.p2">
        </div>
        <img :src="findItem2.image" />
      </div>
      <div class="actions" v-if="findItem2">
        <button @click="deleteBanner(findItem2)">Delete</button>
        <button @click="editBanner(findItem2)">Save</button>
      </div>
    </div>
  </details>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'admin',
  data() {
    return {
      name: "",
      gender: "",
      species: "",
      age: "",
      favorite: false,
      description: "",
      file: null,
      addItem: null,
      animals: [],
      findTitle: "",
      findItem: null,
      // Banners
      h1: "",
      p1: "",
      p2: "",
      file2: null,
      addItem2: null,
      banners: [],
      findTitle2: "",
      findItem2: null,
    }
  },
  computed: {
    suggestions() {
      let animals = this.animals.filter(animal => animal.name.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return animals.sort((a, b) => a.name > b.name);
    },

    // Banners
    suggestions2() {
      let banners = this.banners.filter(banner => banner.h1.toLowerCase().startsWith(this.findTitle2.toLowerCase()));
      return banners.sort((a, b) => a.h1 > b.h1);
    }
  },
  created() {
    this.getAnimals();

    // Banners
    this.getBanners();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/animals', {
          name: this.name,
          gender: this.gender,
          species: this.species,
          age: this.age,
          favorite: this.favorite,
          image: r1.data.image,
          description: this.description,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectAnimal(animal) {
      this.findTitle = "";
      this.findItem = animal;
    },
    async deleteAnimal(animal) {
      try {
        await axios.delete("/api/animals/" + animal._id);
        this.findItem = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editAnimal(animal) {
      try {
        await axios.put("/api/animals/" + animal._id, {
          name: this.findItem.name,
          gender: this.findItem.gender,
          species: this.findItem.species,
          age: this.findItem.age,
          favorite: this.findItem.favorite,
          image: this.findItem.image,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    // Banners

    fileChanged2(event) {
      this.file2 = event.target.files[0]
    },
    async upload2() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file2, this.file2.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/banners', {
          h1: this.h1,
          p1: this.p1,
          p2: this.p2,
          image: r1.data.image,
        });
        this.addItem2 = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBanners() {
      try {
        let response = await axios.get("/api/banners");
        this.banners = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectBanner(banner) {
      this.findTitle2 = "";
      this.findItem2 = banner;
    },
    async deleteBanner(banner) {
      try {
        await axios.delete("/api/banners/" + banner._id);
        this.findItem2 = null;
        this.getBanners();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editBanner(banner) {
      try {
        await axios.put("/api/banners/" + banner._id, {
          h1: this.findItem2.h1,
          p1: this.findItem2.p1,
          p2: this.findItem2.p2,
          image: this.findItem2.image,
        });
        this.findItem2 = null;
        this.getBanners();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.mainHead {
    position: absolute;
    top: 160px;
    left: 140px;
    font-size: 48px;
    color: #000;
    font-weight: bold;
}
.photo {
    width: 100%;
    height: 300px;
    object-fit: cover;
    position: relative;
    margin-bottom: 20px;
}
.checkSingle {
  margin-left: 15px;
  width: 70px;
}
.radio {
  margin: 4px;
}
.check {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin: 5px;
  
}
details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: .5em .5em 0;
    margin-left: 50px;
    margin-bottom: 20px;
    margin-right: 50px;
}
summary {
    font-weight: bold;
    margin: -.5em -.5em 0;
    padding: .5em;
}
details[open] {
    padding: .5em;
}
details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: .5em;
}

.column {
  display: flex;
  flex-direction: column;
}

.add,
.edit {
  display: flex;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
.form {
  margin-right: 50px;
}
/* Uploaded images */
.upload h2 {
  margin: 0px;
}
.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}
.suggestion {
  min-height: 20px;
}
.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>