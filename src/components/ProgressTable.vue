<template>
  <div>
    <div class="mb-2">
      <template v-for="p of progressList">
        <h5 :key="p.name + '-label'">
          {{ p.name }} (Current Stage: {{ getStageName(p.currentStage) }},
          Target Stage: {{ getStageName(p.targetStage) }})
        </h5>
        <b-progress
          :key="p.name + '-progress'"
          :max="100"
          class="mb-1 mt-1"
          show-value
        >
          <b-progress-bar :value="p.progress" variant="success" />
          <b-progress-bar :value="100 - p.progress" variant="warning" />
        </b-progress>
      </template>
    </div>
    <MaterialsTable
      :readOnly="true"
      :noToggle="true"
      :mats="matList"
      :inventory="inventory"
    />
  </div>
</template>

<script>
import MaterialsTable from './MaterialsTable'
import Recipes from '../assets/recipes'
import Chars from '../assets/chars'
import stageNameGenerator from '../global'
export default {
  name: 'ProgressTable',
  components: { MaterialsTable },
  props: ['evokers', 'inventory'],
  data: function () {
    return {
      recipes: Recipes,
      chars: Chars
    }
  },
  methods: {
    calculateUpgrade: function (evokerId, startStage, endStage) {
      let mats = []
      // Find requested char data
      const char = this.chars.find(x => x.id === evokerId)
      // Get start recipe
      const startRecipe = this.recipes.find(x => char.startId === x.id)
      if (startRecipe) {
        let recipes = []
        recipes.push(startRecipe)
        // Iterate until next is not defined
        while (Object.prototype.hasOwnProperty.call(recipes[recipes.length - 1], 'next')) {
          const next = this.recipes.find(
            x => recipes[recipes.length - 1].next === x.id
          )
          if (next) {
            recipes.push(next)
          } else {
            break
          }
        }
        recipes = recipes.slice(startStage, endStage)
        mats = recipes.map(x => x.materials).flat()
      }
      return mats
    },
    getStageName: function (stage) {
      return stageNameGenerator(stage, stage, 'en').next().value
    }
  },
  computed: {
    matList: function () {
      const matList = {}
      for (const evoker of this.evokers) {
        const upgradeMats = this.calculateUpgrade(
          evoker.id,
          evoker.currentStage,
          evoker.targetStage
        )
        for (const m of upgradeMats) {
          if (Object.prototype.hasOwnProperty.call(matList, m.id)) {
            matList[m.id] += m.count
          } else {
            matList[m.id] = m.count
          }
        }
      }
      return matList
    },
    progressList: function () {
      const progressList = []
      for (const evoker of this.evokers) {
        const result = {}
        // Find char name
        const char = this.chars.find(x => x.id === evoker.id)
        result.name = char.name
        result.currentStage = evoker.currentStage
        result.targetStage = evoker.targetStage
        // Get Progress %
        if (result.currentStage === result.targetStage) {
          result.progress = 100
        } else {
          let progress = 0
          let length = 0
          const upgradeMats = this.calculateUpgrade(
            evoker.id,
            evoker.currentStage,
            evoker.targetStage
          )
          for (const m of upgradeMats) {
            length++
            if (Object.prototype.hasOwnProperty.call(this.inventory, m.id)) {
              progress += Math.min(
                100,
                parseInt((this.inventory[m.id] * 100) / m.count)
              )
            }
          }
          result.progress = progress / length
        }

        progressList.push(result)
      }
      return progressList
    }
  }
}
</script>

<style scoped></style>
