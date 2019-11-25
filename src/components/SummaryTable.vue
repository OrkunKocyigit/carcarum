<template>
  <b-card>
    <div>
      <b-form>
        <div class="row">
          <b-form-group class="col-lg-6 col-sm-12" id="char-select-group" label="Current Stage:" label-for="select-current">
            <b-form-select v-model="currentStage" id="select-current" disabled>
              <option :value="currentStage">{{getStageName(currentStage)}}</option>
            </b-form-select>
          </b-form-group>
          <b-form-group class="col-lg-6 col-sm-12" id="stage-select-group" label="Target Stage:" label-for="select-target">
            <b-form-select v-model="targetStage" id="select-target" :options="stageOptions"/>
          </b-form-group>
        </div>
        <b-button block type="submit" variant="secondary">Add Evoker</b-button>
      </b-form>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'SummaryTable',
  props: ['currentStage'],
  data: function () {
    return {
      targetStage: Math.max(this.currentStage + 1, 13)
    }
  },
  methods: {
    getStageName: function (currentStage) {
      let stageName
      if (currentStage === 0) {
        stageName = 'Nothing'
      } else if (currentStage < 5) {
        stageName = `${currentStage - 1}* SR Summon`
      } else if (currentStage < 8) {
        stageName = `${currentStage - 2}* SSR Summon`
      } else if (currentStage < 14) {
        stageName = `${currentStage - 8}* SSR Character`
      } else {
        stageName = 'Unknown'
      }
      return stageName
    }
  }
}
</script>

<style scoped>

</style>
