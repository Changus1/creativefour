<template>
<div id="app">
  <div id="menu">
    <div id="brand">
      <router-link to="/">
        <h1>Save A Life</h1>
      </router-link>
    </div>
    <div id="side">
      <router-link to="/adopt">
        <div class="menu-item">
          <p>Adopt</p>
        </div>
      </router-link>
      <router-link to="/favorites">
        <div class="menu-item">
          <p>Favorites</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
  <div class="subscribeTop"> 
    <div class="subscribeSpace">
      <h5 class="subscribeText">Stay connected</h5>
      <h1 class="subscribeText">Subscribe to our weekly newsletter for updates to available pets and local events.</h1>
    </div>
    <div class="subscribeSpace">
      <form class="pure-form">
        <div class="formField">
          <input type="text" placeholder="First Name" class="pure-input-rounded pure-input-1-3 first field" required="" />
          <input type="text" placeholder="Last Name" class="pure-input-rounded pure-input-1-3 field" />
        </div>
        <input type="email" placeholder="Email" class="pure-input-rounded pure-input-2-3 first field" required="" />
        <div>
          <button type="submit" class="pure-button button first field">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
  <div class="footer">
    <h3>https://github.com/Changus1/creativeiii.git</h3>
  </div>
</div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Oswald', sans-serif;
}
#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "phone brand side";
  background-color: #4682B4;
}
#menu a {
  color: #DCDCDC;
}
#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}
#brand h1 {
  font-family: 'Galada', cursive;
}
#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}
#side img {
  width: 50px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}
.menu-item p {
  font-family: 'Galada', cursive;
}
.footer {
  display: flex;
  background-color: #4682B4;
  text-align: center;
  height: 40px;
  color: #DCDCDC;
  align-content: center;
  justify-content: center;
}
.spacer {
    width: 100%;
    height: 80px;
    text-align: center;
    align-self: center;
}
.subscribeTop {
  display: flex;
  flex-direction: row;
  background-color: rgb(216, 210, 210);
  justify-content: center;
  align-content: center;
}
.subscribeSpace {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-content: center;
}
.subscribeText {
  color: #4682B4;
  padding: 10px 25px;
  margin: 0;
}
.formField {
  display: flex;
  flex-direction: row;
}
.button {
  border-radius: 25px;
}
.field {
  margin: 1px;
}
.first {
  margin-left: 45px;
}

@media (max-width: 48em) {
  .subscribeTop {
    flex-direction: column;
  }
  .subscribeSpace {
    width: 100%;
  }
  .button {
    margin-left: 46px!important;
    margin-top: 1px!important;
    margin-bottom: 15px!important;
  }
  .footer h3 {
    font-size: 18px;
  }
  #brand {
    grid-area: span phone / span 2;
  }
  .menu-item {
    margin-right: 10px;
  }
}
</style>