<template>
  <div id="app" class="container">
    <div>
      <b-nav id="nav" tabs justified>
        <b-nav-item to="/"><img src="./assets/icons/arcapoint.png"  alt=""/>Evoker Calculator</b-nav-item>
      </b-nav>
    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    color: #2E333E;
  }

  #nav {
    padding-top: 30px;
  }

  #nav a.nav-link {
    color: #84ABA9;
  }

  #nav a.router-link-exact-active{
    color: #68AB6A;
    font-weight: bold;
  }
</style>
