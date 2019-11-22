<template>
  <div id="app">
    <div id="nav">
      <div>
        <img src="./assets/icons/arcapoint.png" /><router-link to="/">Evoker Calculator</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F2E9E4;
}

#nav img {
  vertical-align: middle;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #F2E9E4;
  vertical-align: middle;
}

#nav a.router-link-exact-active {
  color: #C9ADA7;
}
</style>
