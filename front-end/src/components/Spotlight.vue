<template>
<div class="spotlightTop">
  <div class="spotlightArea">
    <img class="spotlightPic" :src="spotlight.image">
    <div class="spotlightDetails">  
      <div class="textArea">  
        <h4 class="spotlightText">Name: {{spotlight.name}}</h4>
        <p class="spotlightText">Age: {{spotlight.age}} Years Old</p>
        <p class="spotlightText">{{spotlight.description}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SingleList',
  props: {
    spotlight: Object,
  },
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