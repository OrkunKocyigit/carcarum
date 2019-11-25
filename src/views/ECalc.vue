<template>
  <div class="ecalc">
    <CharSelector :addEvoker="onEvokerAdded" :filteredEvokers="filterEvokerList"/>
  </div>
</template>

<script>
import CharSelector from '../components/CharSelector'
export default {
  components: {
    CharSelector: CharSelector
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
