<template>
  <b-card>
    <div>
      <b-form>
        <div class="row">
          <b-form-group class="col-lg-4 col-sm-6" id="char-select-group" label="Current Stage:" label-for="select-current">
            <b-form-select v-model="currentStage" id="select-current" disabled>
              <option :value="currentStage">{{getTranslation('stages', 'en', currentStage)}}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group class="col-lg-4 col-sm-6" id="stage-select-group" label="Target Stage:" label-for="select-target">
            <b-form-select v-model="targetStage" id="select-target" :options="upgradeOptions"/>
          </b-form-group>
          <b-form-group class="mt-auto col-lg-2 col-sm-6" id="char-calc-group">
            <b-button id="button-calc" block type="submit" variant="secondary">Calculate</b-button>
          </b-form-group>
          <b-form-group class="mt-auto col-lg-2 col-sm-6" id="char-upgrade-group">
            <b-button id="button-submit" block type="submit" variant="primary">Upgrade</b-button>
          </b-form-group>
        </div>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import getString from '../translate'
import stageNameGenerator from '../global'
export default {
  name: 'SummaryTable',
  props: ['currentStage', 'char'],
  data: function () {
    return {
      targetStage: Math.min(this.currentStage + 1, this.char.maxStage)
    }
  },
  methods: {
    getTranslation: getString,
    getStageNames: stageNameGenerator
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
