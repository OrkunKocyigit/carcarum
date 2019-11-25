<template>
 <div>
   <b-form @submit="onEvokerAdded">
     <div class="row">
       <b-form-group class="col-lg-6 col-sm-12" id="char-select-group" label="Evoker:" label-for="select-evoker">
         <b-form-select v-model="selectedChar" id="select-evoker" :disabled="haveAll">
           <option v-for="char in filteredChars" :value="char.id" :key="char.id">{{char.name}}</option>
         </b-form-select>
       </b-form-group>
       <b-form-group class="col-lg-6 col-sm-12" id="stage-select-group" label="Current Stage:" label-for="select-stage">
         <b-form-select v-model="selectedStage" id="select-stage" :options="stageOptions" :disabled="haveAll" />
       </b-form-group>
     </div>
     <b-button block type="submit" variant="secondary">Add Evoker</b-button>
   </b-form>
 </div>
</template>

<script>
import charData from '../assets/chars'
import summonData from '../assets/summons'

export default {
  props: ['addEvoker', 'filteredEvokers'],
  data: function () {
    return {
      chars: charData,
      summons: summonData,
      selectedChar: 1,
      selectedStage: 0,
      haveAll: false
    }
  },
  computed: {
    stageOptions: function () {
      let stages = []
      if (this.filteredChars.length > 0) {
        // No Summon
        stages.push({ value: 0, text: 'Nothing' })
        // SR Summon
        for (let i = 0; i <= 3; i++) {
          stages.push({ value: i + 1, text: `${i}* SR Summon` })
        }
        // SSR Summon
        for (let i = 3; i <= 5; i++) {
          stages.push({ value: i + 2, text: `${i}* SSR Summon` })
        }
        // SSR Char
        let charMax = this.filteredChars.filter((x) => (x.id === this.selectedChar))[0].maxStage
        for (let i = 0; i <= charMax; i++) {
          stages.push({ value: i + 8, text: `${i}* SSR Character` })
        }
      }
      return stages
    },
    filteredChars: function () {
      return this.chars.filter((x) => (!this.filteredEvokers.includes(x.id)))
    }
  },
  methods: {
    onEvokerAdded: function () {
      let charIndex = this.selectedChar
      if (this.filteredChars.length > 1) {
        this.haveAll = false
        this.selectedChar = this.filteredChars.filter((x) => (x.id !== charIndex))[0].id
      } else {
        this.haveAll = true
      }
      this.addEvoker(charIndex, this.selectedStage)
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-top: 1rem;
}
</style>
