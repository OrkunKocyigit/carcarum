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
            <b-button block id="button-calc" variant="secondary">Calculate</b-button>
          </b-form-group>
        </div>
      </b-form>
      <MaterialsTable />
    </div>
  </b-card>
</template>

<script>
import getString from '../translate'
import stageNameGenerator from '../global'
import MaterialsTable from './MaterialsTable'
export default {
  name: 'SummaryTable',
  components: { MaterialsTable },
  props: ['currentStage', 'targetStage', 'char', 'triggerTargetChange'],
  data: function () {
    return {
      hasResult: false
    }
  },
  methods: {
    getTranslation: getString,
    getStageNames: stageNameGenerator,
    onTargetChanged: function (val) {
      this.triggerTargetChange(val)
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
