<template>
  <div id="app" class="container">
    <div>
      <b-nav id="nav" tabs justified>
        <b-nav-item to="/"><img src="../public/img/Arcapoint.png" alt=""/>Evoker Calculator</b-nav-item>
      </b-nav>
    </div>
    <router-view :props="childProps"/>
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

  .table td {
    vertical-align: middle !important;
  }
</style>

<script>
import Chars from './assets/chars'

export default {
  data: function () {
    return {
      evokers: [],
      inventory: {},
      charData: Chars
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onSave: function () {
      let save = {}
      save.evokers = this.evokers
      save.inventory = this.inventory
      save = JSON.stringify(save)
      localStorage.setItem('save', save)
    },
    onLoad: function () {
      let save = localStorage.getItem('save')
      let loadEvokers = this.evokers
      let loadInventory = this.inventory
      if (save) {
        save = JSON.parse(save)
        loadEvokers = save.evokers || []
        loadInventory = save.inventory || {}
      }
      this.evokers = loadEvokers
      this.inventory = loadInventory
    },
    onEvokerChanged: function (newEvokerList) {
      this.evokers = newEvokerList
      this.onSave()
    },
    onInventoryChanged: function (matId, newItem) {
      this.$set(this.inventory, matId, newItem)
      this.onSave()
    }
  },
  computed: {
    childProps: function () {
      let props = {}
      if (this.$router.currentRoute.name === 'ecalc') {
        props.evokers = this.evokers || []
        props.inventory = this.inventory || {}
        props.triggerEvokerChange = this.onEvokerChanged
        props.triggerInventoryChange = this.onInventoryChanged
      }
      return props
    }
  }
}
</script>
