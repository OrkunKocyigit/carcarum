<template>
  <div class="ecalc">
    <CharSelector
      :addEvoker="onEvokerAdded"
      :filteredEvokers="filterEvokerList"
    />
    <b-button v-b-toggle.e-summary block class="mt-2 mb-2" variant="secondary">
      Show Overall Progress
    </b-button>
    <b-collapse id="e-summary">
      <b-card>
        <ProgressTable :evokers="evokers" :inventory="inventory" />
      </b-card>
    </b-collapse>
    <EvokerTable
      v-if="tableVisible"
      :evokerList="evokers"
      :removeEvoker="onEvokerRemoved"
      :triggerTargetChange="onTargetChanged"
      :inventory="inventory"
      :triggerInventoryChange="props.triggerInventoryChange"
      :triggerEvokerUpgrade="onEvokerUpgraded"
    />
  </div>
</template>

<script>
import CharSelector from '../components/CharSelector'
import EvokerTable from '../components/EvokerTable'
import ProgressTable from '../components/ProgressTable'
import Chars from '../assets/chars'
export default {
  components: {
    CharSelector: CharSelector,
    EvokerTable: EvokerTable,
    ProgressTable: ProgressTable
  },
  props: ['props'],
  data: function () {
    return {
      evokers: this.props.evokers,
      inventory: this.props.inventory,
      charData: Chars
    }
  },
  methods: {
    onEvokerAdded: function (evokerId, currentStage) {
      const newEvokerList = this.evokers
      const nextTarget = Math.min(
        this.charData.find(x => x.id === evokerId).maxStage,
        currentStage + 1
      )
      newEvokerList.push({
        id: evokerId,
        currentStage: currentStage,
        targetStage: nextTarget
      })
      this.props.triggerEvokerChange(newEvokerList)
    },
    onEvokerRemoved: function (evokerId) {
      const newEvokerList = this.evokers
      newEvokerList.splice(
        newEvokerList.indexOf(newEvokerList.find(x => x.id === evokerId)),
        1
      )
      this.props.triggerEvokerChange(newEvokerList)
    },
    onTargetChanged: function (evokerId, newTarget) {
      const newEvokerList = this.evokers
      newEvokerList.find(x => x.id === evokerId).targetStage = newTarget
      this.props.triggerEvokerChange(newEvokerList)
    },
    onEvokerUpgraded: function (evokerId, newTarget, cost) {
      const newEvokerList = this.evokers
      const evokerIndex = newEvokerList.indexOf(
        newEvokerList.find(x => x.id === evokerId)
      )
      newEvokerList[evokerIndex].currentStage = newTarget
      newEvokerList[evokerIndex].targetStage = Math.min(
        this.charData.find(x => x.id === evokerId).maxStage,
        newTarget + 1
      )
      this.props.triggerEvokerChange(newEvokerList)
      const matIds = Object.keys(cost).map(x => parseInt(x, 10))
      for (const matId of matIds) {
        this.props.triggerInventoryChange(
          matId,
          this.inventory[matId] - cost[matId]
        )
      }
    }
  },
  computed: {
    filterEvokerList: function () {
      return this.evokers.map(x => x.id)
    },
    tableVisible: function () {
      return this.evokers.length > 0
    }
  }
}
</script>

<style scoped></style>
