<template>
  <div class="ecalc">
    <CharSelector :addEvoker="onEvokerAdded" :filteredEvokers="filterEvokerList"/>
    <EvokerTable :evokerList="evokers" class="mt-1"/>
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
  methods: {
    onEvokerAdded: function (evokerId, currentStage) {
      this.evokers.push({ id: evokerId, currentStage: currentStage })
    }
  },
  computed: {
    filterEvokerList: function () {
      return this.evokers.map((x) => (x.id))
    }
  }
}
</script>

<style scoped>

</style>
