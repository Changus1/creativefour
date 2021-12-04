<template>
<div class='page'>
  <BannerList :banners="banners" />
  
  <img src="/images/whitearrowl.png" class="arrowl" @click="displayPrevious()">
  <img src="/images/whitearrowr.png" class="arrowr" @click="displayNext()">

  <div class="directtop">
    <div class="direct direct-1">
      <p class="directtext">FIND YOUR PERFECT PET</p>
      <h3 class="directtext"><strong><a href="?" style="color: #ffffff;">Adopt</a></strong></h3>
    </div>
    <div class="direct direct-2">
      <p class="directtext">SUPPORT THE CAUSE</p>
      <h3 class="directtext"><strong><a href="?" style="color: #ffffff;">Donate</a></strong></h3>
    </div>
    <div class="direct direct-3">
      <p class="directtext">HAVE QUESTIONS?</p>
      <h3 class="directtext"><strong><a href="?" style="color: #ffffff;">Contact Us</a></strong></h3>
    </div>
  </div>

  <div class="spacer">
    <h1>Animal Spotlight!</h1>
  </div>
  <SingleList />

  <div class="spacer">
    <h1>Recent Articles:</h1>
  </div>
  <div class="articletop">
    <div class="article">
      <img src="/images/articles/puppuccino.jpg" class="articlephoto">
      <div class="articledesc">
        <p><a href="?" class="articletext">How Healthy is a Puppuccino?</a></p>
      </div>
    </div>
    <div class="article">
      <img src="/images/articles/wash.jpg" class="articlephoto">
      <div class="articledesc">
        <p><a href="?" class="articletext">The best way to give a bath.</a></p>
      </div>
    </div>
  </div>
  <div class="articletop">
    <div class="article">
      <img src="/images/articles/stray.jpg" class="articlephoto">
      <div class="articledesc">
        <p><a href="?" class="articletext">What to do when you find a stray.</a></p>
      </div>
    </div>
    <div class="article">
      <img src="/images/articles/kittens.jpg" class="articlephoto">
      <div class="articledesc">
        <p><a href="?" class="articletext">How has the Covid-19 pandemic affected homeless pets?</a></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BannerList from "../components/Banner.vue"
import SingleList from "../components/Spotlight.vue"
export default {
  name: 'Home',
  components: {
    BannerList,
    SingleList,
  },
  data() {
    return {
      banner: 1,
      myTimer: null,
    }
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    banner: function() {
      return this.$root.$data.banners.filter(item => item.id === this.banner);
    }
  },
  computed: {
    banners() {
      return this.$root.$data.banners.filter(item => item.id === this.banner);
    },
  },
  methods: {
    startTimer() {
      this.myTimer = setInterval(() => {
        if (this.banner === 4) {
          this.banner = 1;
        }
        else {
          this.banner += 1;
        }
      }, 6000);
    },
    stopTimer() {
      clearInterval(this.myTimer);
    },
    displayPrevious() {
      if (this.banner === 1) {
        this.banner = 4;
      }
      else {
        this.banner -= 1;
      }
      this.stopTimer();
      this.startTimer();
    },
    displayNext() {
      if (this.banner === 4) {
        this.banner = 1;
      }
      else {
        this.banner += 1;
      }
      this.stopTimer();
      this.startTimer();
    },
  },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Oswald', sans-serif;
}
.spacer h1 {
  color: #4682B4;
}
.directtop {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: #4682B4;
    margin-bottom: 30px;
}
.direct {
    height: 100px;
    width: 100%;
    align-items: center;
}
.directtext {
    margin: 0;
    padding: 0;  
}
.direct-1 {
    display: flex;
    flex-direction: column;
    background-color: #346288;
    justify-content: center;
    align-items: center;
}
.direct-2 {
    display: flex;
    flex-direction: column;
    background-color: #4682B4;
    justify-content: center;
    align-items: center;
}
.direct-3 {
    display: flex;
    flex-direction: column;
    background-color: #57a6e7;
    justify-content: center;
    align-items: center;
}
.directtop p {
  color: #fff;
}
.articletop {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.article {
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 100%;
    align-items: center;
}
.articlephoto {
    width: 90%;
    height: 80%;
    object-fit: cover;
}
.articledesc {
    height: 20%;
    width: 80%;
}
.articletext {
    color: #4682B4;
    font-size: 18px;
}
.arrowl {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 350px;
    left: 45px;
    opacity: 30%;
    transition-duration: 1s;
    transition-property: opacity;
}
.arrowl:hover {
    opacity: 100%;
}
.arrowr {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 350px;
    left: 272px;
    opacity: 30%;
    transition-duration: 1s;
    transition-property: opacity;
}
.arrowr:hover {
    opacity: 100%;
}

@media (min-width: 48em) {
  .page{
    display: block;
  }
  .directtop {
      flex-direction: row;
      justify-content: center;
  }
  .direct {
      width: 25%;
  }
  .articletop {
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
  }
  .article {
      flex-direction: row;
      height: 150px;
      margin: 10px 40px;
  }
  .articlephoto {
      width: 45%;
      height: 100%;
  }
  .articledesc {
      width: 55%;
      height: 100%;
      background-color: rgb(134, 194, 243);
  }
  .articletext {
      color: #0167bb;
      margin: 25px;
  }
  .arrowl {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 200px;
      left: 45px;
  }   
  .arrowr {
      position: absolute;
      width: 100px;
      height: 100px;
      top: 200px;
      left: 1120px;
  }
}
</style>