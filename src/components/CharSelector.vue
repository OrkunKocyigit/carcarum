<template>
 <div>
   <b-form>
     <div class="row">
       <b-form-group class="col-lg-6 col-sm-12" id="char-select-group" :label="getTranslation('evoker_selector', 'en')" label-for="select-evoker">
         <b-form-select v-model="selectedChar" id="select-evoker" :disabled="haveAll">
           <option v-for="char in filteredChars" :value="char.id" :key="char.id">{{getTranslation(char.name, 'en')}}</option>
         </b-form-select>
       </b-form-group>
       <b-form-group class="col-lg-6 col-sm-12" id="stage-select-group" :label="getTranslation('stage_selector', 'en')" label-for="select-stage">
         <b-form-select v-model="selectedStage" id="select-stage" :options="stageOptions" :disabled="haveAll" />
       </b-form-group>
     </div>
     <b-button block type="submit" variant="secondary" :disabled="haveAll" @submit="onEvokerAdded">Add Evoker</b-button>
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
      selectedChar: 1,
      selectedStage: 0,
      haveAll: false
    }
  },
  computed: {
    stageOptions: function () {
      let stages = []
      if (!this.haveAll) {
        let generator = stageNameGenerator(0, this.filteredChars.filter((x) => (x.id === this.selectedChar))[0].maxStage, 'en')
        let result = generator.next()
        for (let i = 0; !result.done; i++) {
          stages.push({ value: i, text: result.value })
          result = generator.next()
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
      this.addEvoker(this.selectedChar, this.selectedStage)
    },
    getTranslation: getString,
    getStageNames: stageNameGenerator
  },
  watch: {
    filteredEvokers: function (val) {
      if (this.filteredChars.length > 0) {
        this.haveAll = false
        if (val.includes(this.selectedChar)) {
          this.selectedChar = this.filteredChars[0].id
        }
      } else {
        this.haveAll = true
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
