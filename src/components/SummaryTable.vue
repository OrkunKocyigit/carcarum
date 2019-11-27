<template>
  <b-card>
    <div>
      <b-form>
        <div class="row">
          <b-form-group class="col-lg-5 col-sm-6" id="char-select-group" label="Current Stage:" label-for="select-current">
            <b-form-select v-model="currentStage" id="select-current" disabled>
              <option :value="currentStage">{{getTranslation('stages', 'en', currentStage)}}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group class="col-lg-5 col-sm-6" id="stage-select-group" label="Target Stage:" label-for="select-target">
            <b-form-select :value="targetStage" id="select-target" :options="upgradeOptions" @change="onTargetChanged"/>
          </b-form-group>
          <b-form-group class="mt-auto col-lg-2 col-sm-12" id="char-calc-group">
            <b-button block id="button-calc" variant="secondary" @click="calculateUpgrade">Calculate</b-button>
          </b-form-group>
        </div>
      </b-form>
      <MaterialsTable v-if="hasResult" :mats="result"/>
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
  props: ['currentStage', 'targetStage', 'char', 'triggerTargetChange'],
  data: function () {
    return {
      hasResult: false,
      result: {},
      recipes: Recipes
    }
  },
  methods: {
    getTranslation: getString,
    getStageNames: stageNameGenerator,
    onTargetChanged: function (val) {
      this.triggerTargetChange(val)
    },
    calculateUpgrade: function () {
      let mats = {}
      // Get start char recipe
      let startRecipe = this.recipes.find((x) => (this.char.startId === x.id))
      if (startRecipe) {
        let recipes = []
        recipes.push(startRecipe)
        // Iterate until next is not defined
        while (recipes[recipes.length - 1].hasOwnProperty('next')) {
          let next = this.recipes.find((x) => (recipes[recipes.length - 1].next === x.id))
          if (next) {
            recipes.push(next)
          } else {
            break
          }
        }
        let materialList = recipes.map((x) => (x.materials)).flat()
        for (let m of materialList) {
          if (mats.hasOwnProperty(m.id)) {
            mats[m.id] += m.count
          } else {
            mats[m.id] = m.count
          }
        }
        this.hasResult = true
      }
      this.result = mats
    }
  },
  computed: {
    upgradeOptions: function () {
      let stages = []
      let generator = stageNameGenerator(this.currentStage + 1, this.char.maxStage, 'en')
      let result = generator.next()
      for (let i = this.currentStage + 1; !result.done; i++) {
        stages.push({ value: i, text: result.value })
        result = generator.next()
      }
      return stages
    }
  }
}
</script>

<style scoped>

</style>
