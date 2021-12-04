<template>
<div class="spotlightTop">
  <div class="spotlightArea">
    <img class="spotlightPic" :src="'/images/animals/'+myitem.image">
    <div class="spotlightDetails">  
      <div class="textArea">  
        <h4 class="spotlightText">Name: {{myitem.name}}</h4>
        <p class="spotlightText">Age: {{myitem.age}} Years Old</p>
        <p class="spotlightText">{{myitem.description}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SingleList',
  props: {
    spotlights: Array,
  },
  computed: {
    myitem() {
      let position = Math.floor(Math.random() * (30) + 1);
      let item = this.$root.$data.spotlights.find(element => element.id === position);
      return item;
    }
  }
}
</script>

<style scoped>
  .spotlightArea {
    display: flex;
    flex-direction: column;
    align-self: center;
    height: 300px;
    width: 100%;
    align-items: center;
    margin-bottom: 30px;
  }
  .spotlightPic {
    width: 90%;
    height: 50%;
    object-fit: cover;
    border-radius: 25px;
  }
  .spotlightDetails {
    display: flex;
    flex-direction: column;
    height: 50%;
    width: 80%;
  }
  h1 {
    text-align: center;
    color: #4682B4;
  }
  .spotlightText {
    color: #4682B4;
  }

  @media (min-width: 48em) {
    .spotlightTop {
      display: flex;
      justify-content: center;
    }
    .spotlightArea {
      flex-direction: row;
      width: 90%;
    }
    .spotlightDetails {
      width: 45%;
      height: 100%;
      margin-left: 25px;
      border: 2px solid black;
      border-radius: 25px;
    }
    .spotlightPic {
      width: 50%;
      height: 100%;
    }
    .textArea {
      width: 75%;
      height: 75%;
      margin: 50px;
    }
  }
</style>