<template>
 <div>
   <b-form>
     <div class="row">
       <b-form-group class="col-lg-6 col-sm-12" id="char-select-group" :label="getTranslation('evoker_selector', 'en')" label-for="select-evoker">
         <b-form-select v-model="selectedChar" id="select-evoker" :disabled="hasAllEvokers">
           <option v-for="char in filteredChars" :value="char.id" :key="char.id">{{getTranslation(char.name, 'en')}}</option>
         </b-form-select>
       </b-form-group>
       <b-form-group class="col-lg-6 col-sm-12" id="stage-select-group" :label="getTranslation('stage_selector', 'en')" label-for="select-stage">
         <b-form-select v-model="selectedStage" id="select-stage" :options="stageOptions" :disabled="hasAllEvokers" />
       </b-form-group>
     </div>
     <b-button block variant="primary" :disabled="hasAllEvokers" @click="onEvokerAdded">Add Evoker</b-button>
   </b-form>
 </div>
</template>

<script>
import charData from '../assets/chars'
import summonData from '../assets/summons'
import getString from '../translate'
import stageNameGenerator from '../global'

export default {
  props: ['addEvoker', 'filteredEvokers'],
  data: function () {
    return {
      chars: charData,
      summons: summonData,
      selectedStage: 1,
      selectedChar: 1
    }
  },
  beforeMount () {
    if (this.filteredChars.length > 0) {
      this.selectedChar = this.filteredChars[0].id
      this.selectedStage = this.filteredChars[0].minStage
    }
  },
  computed: {
    stageOptions: function () {
      let stages = []
      if (!this.hasAllEvokers) {
        let char = this.filteredChars.find(x => x.id === this.selectedChar)
        let generator = stageNameGenerator(0, char.maxStage, 'en')
        let result = generator.next()
        for (let i = 0; !result.done; i++) {
          stages.push({ value: i, text: result.value })
          result = generator.next()
        }
      }
      return stages
    },
    filteredChars: function () {
      return this.chars.filter(x => !this.filteredEvokers.includes(x.id))
    },
    hasAllEvokers: function () {
      return !(this.filteredChars.length > 0)
    }
  },
  methods: {
    onEvokerAdded: function () {
      this.addEvoker(this.selectedChar, this.selectedStage)
    },
    getTranslation: getString,
    getStageNames: stageNameGenerator
  },
  watch: {
    filteredChars: function () {
      if (this.filteredChars.length > 0 && !this.filteredChars.find(x => x.id === this.selectedChar)) {
        this.selectedChar = this.filteredChars[0].id
        this.selectedStage = this.filteredChars[0].minStage
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-top: 1rem;
}
</style>
