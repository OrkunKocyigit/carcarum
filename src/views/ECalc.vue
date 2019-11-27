<template>
  <div
    class="ecalc">
    <CharSelector
      :addEvoker="onEvokerAdded"
      :filteredEvokers="filterEvokerList"/>
    <EvokerTable
      v-if="tableVisible"
      :evokerList="evokers"
      :removeEvoker="onEvokerRemoved"
      :triggerTargetChange="onTargetChanged"
      :inventory="inventory"
      :triggerInventoryChange="onInventoryChanged"
      class="mt-1"/>
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
      evokers: [],
      inventory: {}
    }
  },
  mounted () {
    this.onLoad()
  },
  methods: {
    onEvokerAdded: function (evokerId, currentStage, targetStage) {
      this.evokers.push({ id: evokerId, currentStage: currentStage, targetStage: targetStage })
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
    onTargetChanged: function (evokerId, newTarget) {
      this.evokers.find((x) => (x.id === evokerId)).targetStage = newTarget
      this.onSave()
    },
    onInventoryChanged: function (matId, newItem) {
      this.inventory[matId] = parseInt(newItem)
      this.onSave()
    },
    onEvokerUpgraded: function (evokerId, newTarget) {

    },
    onSave: function () {
      let save = {}
      save.evokers = this.evokers
      save.inventory = this.inventory
      save = JSON.stringify(save)
      localStorage.setItem('save', save)
    },
    onLoad: function () {
      let save = localStorage.getItem('save')
      if (save) {
        save = JSON.parse(save)
        this.evokers = save.evokers || []
        this.inventory = save.inventory || {}
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
