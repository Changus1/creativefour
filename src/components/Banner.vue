<template>
<div>
  <div v-for="banner in banners" :key="banner.id">
    <div v-if="banner.type === 'link'">
      <div class="mainscroll">
        <img class="scrollphoto" :src="'/images/banner/'+banner.image" />
        <div class="scrolldetails">
          <div class="scrolltextarea">
            <h1 class="scrolltext">{{banner.h1}}</h1>
            <p class="scrolltext">{{banner.p1}}</p>
            <p class="scrolltext"><a href="?" class="articletext">{{banner.p2}}</a></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="mainscroll">
        <img class="factbackground" :src="'/images/banner/'+banner.image"/>
        <div class="factdetails">
          <div class="facttextarea">
            <h1 class="facttext">{{banner.h1}}</h1>
            <p class="facttext">{{banner.p1}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BannerList',
  props: {
    banners: Array,
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
.mainscroll {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.scrolldetails {
    width: 100%;
    height: 225px;
    background-color: rgb(85, 85, 85);
    justify-self: center;
}
.scrollphoto {
    width: 100%;
    height: 300px;
    object-fit: cover;
}
.scrolltextarea {
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 20px;
}
.scrolltext {
    color: #fff;
    margin: 5px;
}
.factbackground {
    width: 100%;
    height: 525px;
    filter: blur(4px);
    object-fit: fill;
}
.factdetails {
    position: absolute;
    opacity: 75%;
    width: 100%;
    height: 350px;
    background-color: #4682B4;
    justify-self: center;
}
.facttextarea {
    margin-top: 60px;
    margin-left: 40px;
    margin-right: 20px;
}
.facttext {
    color: #fff;
    margin: 5px;
}
.hidden {
    display: none;
}

@media (min-width: 48em) {
  .mainscroll {
      flex-direction: row;
  }
  .scrollphoto {
      width: 65%;
      height: 400px;
  }
  .scrolldetails {
      width: 35%;
      height: 400px;
  }
  .factbackground {
      height: 400px;
  }
  .facttextarea {
      margin-top: 80px;
      margin-left: 300px;
      margin-right: 300px;
  }
}
</style>