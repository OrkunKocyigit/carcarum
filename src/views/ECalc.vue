<template>
  <div class="ecalc">
    <CharSelector :addEvoker="onEvokerAdded" :filteredEvokers="filterEvokerList"/>
    <EvokerTable v-if="tableVisible" :evokerList="evokers" :removeEvoker="onEvokerRemoved" class="mt-1"/>
  </div>
</template>

<script>
import CharSelector from '../components/CharSelector'
import EvokerTable from '../components/EvokerTable'
export default {
  components: {
    CharSelector: CharSelector,
    EvokerTable: EvokerTable
  },
  data: function () {
    return {
      evokers: []
    }
  },
  mounted () {
    this.onLoad()
  },
  methods: {
    onEvokerAdded: function (evokerId, currentStage) {
      this.evokers.push({ id: evokerId, currentStage: currentStage })
      this.onSave()
    },
    onEvokerRemoved: function (evokerId) {
      for (let i = 0; i < this.evokers.length; i++) {
        if (this.evokers[i].id === evokerId) {
          this.evokers.splice(i, 1)
        }
      }
      this.onSave()
    },
    onSave: function () {
      let save = {}
      save.evokers = this.evokers
      save = JSON.stringify(save)
      localStorage.setItem('save', save)
    },
    onLoad: function () {
      let save = localStorage.getItem('save')
      if (save) {
        save = JSON.parse(save)
        this.evokers = save.evokers
      }
    }
  },
  computed: {
    filterEvokerList: function () {
      return this.evokers.map((x) => (x.id))
    },
    tableVisible: function () {
      return this.evokers.length > 0
    }
  }
}
</script>

<style scoped>

</style>
