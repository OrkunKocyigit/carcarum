<template>
 <div>
   <b-form>
     <div class="row">
       <b-form-group class="col" id="char-select-group" label="Evoker:" label-for="select-evoker">
         <b-form-select v-model="selectedChar" id="select-evoker">
           <option v-for="char in chars" :value="char.id" :key="char.id">{{char.name}}</option>
         </b-form-select>
       </b-form-group>
       <b-form-group class="col" id="stage-select-group" label="Current Stage:" label-for="select-stage">
         <b-form-select v-model="selectedStage" id="select-stage" :options="stageOptions" />
       </b-form-group>
     </div>
   </b-form>
 </div>
</template>

<script>
import charData from '../assets/chars'
import summonData from '../assets/summons'

export default {
  data: function () {
    return {
      chars: charData,
      summons: summonData,
      selectedChar: 1,
      selectedStage: 0
    }
  },
  computed: {
    stageOptions: function () {
      let stages = []
      // No Summon
      stages.push({ value: 0, text: 'Nothing' })
      // SR Summon
      for (let i = 1; i <= 3; i++) {
        stages.push({ value: i, text: `${i}* SR Summon` })
      }
      // SSR Summon
      for (let i = 3; i <= 5; i++) {
        stages.push({ value: i + 1, text: `${i}* SSR Summon` })
      }
      // SSR Char
      let charMax = this.chars[this.selectedChar].maxStage
      for (let i = 0; i <= charMax; i++) {
        stages.push({ value: i + 7, text: `${i}* SSR Char` })
      }
      return stages
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-top: 1rem;
}
</style>
