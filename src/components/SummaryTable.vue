<template>
  <b-card>
    <div>
      <b-form>
        <div class="row">
          <b-form-group
            class="col-lg-6 col-sm-12"
            id="char-select-group"
            label="Current Stage:"
            label-for="select-current"
          >
            <b-form-select v-model="currentStage" id="select-current" disabled>
              <option :value="currentStage">
                {{ getTranslation("stages", "en", currentStage) }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            class="col-lg-6 col-sm-12"
            id="stage-select-group"
            label="Target Stage:"
            label-for="select-target"
          >
            <b-form-select
              :value="targetStage"
              id="select-target"
              :options="upgradeOptions"
              @change="onTargetChanged"
            />
          </b-form-group>
        </div>
      </b-form>
      <MaterialsTable
        :mats="result"
        :inventory="inventory"
        :triggerInventoryChange="triggerInventoryChange"
        :triggerEvokerUpgrade="onEvokerUpgrade"
      />
    </div>
  </b-card>
</template>

<script>
import getString from '../translate'
import stageNameGenerator from '../global'
import MaterialsTable from './MaterialsTable'
import Recipes from '../assets/recipes'
export default {
  name: 'SummaryTable',
  components: { MaterialsTable },
  props: [
    'currentStage',
    'targetStage',
    'char',
    'triggerTargetChange',
    'inventory',
    'triggerInventoryChange',
    'triggerEvokerUpgrade'
  ],
  data: function () {
    return {
      result: {},
      recipes: Recipes
    }
  },
  mounted () {
    this.calculateUpgrade()
  },
  methods: {
    getTranslation: getString,
    getStageNames: stageNameGenerator,
    onTargetChanged: function (val) {
      this.triggerTargetChange(val)
    },
    calculateUpgrade: function () {
      const mats = {}
      // Get start char recipe
      const startRecipe = this.recipes.find(x => this.char.startId === x.id)
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
        recipes = recipes.slice(this.currentStage, this.targetStage)
        const materialList = recipes.map(x => x.materials).flat()
        for (const m of materialList) {
          if (Object.prototype.hasOwnProperty.call(mats, m.id)) {
            mats[m.id] += m.count
          } else {
            mats[m.id] = m.count
          }
        }
      }
      this.result = mats
    },
    onEvokerUpgrade: function (cost) {
      this.triggerEvokerUpgrade(this.char.id, this.targetStage, cost)
    }
  },
  computed: {
    upgradeOptions: function () {
      const stages = []
      const generator = stageNameGenerator(
        this.currentStage + 1,
        this.char.maxStage,
        'en'
      )
      let result = generator.next()
      for (let i = this.currentStage + 1; !result.done; i++) {
        stages.push({ value: i, text: result.value })
        result = generator.next()
      }
      return stages
    }
  },
  watch: {
    targetStage: function () {
      this.calculateUpgrade()
    }
  }
}
</script>

<style scoped></style>
