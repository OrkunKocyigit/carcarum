<template>
 <div>
   <b-form>
     <b-form-group>
       <b-form-select v-bind="selected" :options="charOptions">
       </b-form-select>
       {{this.selected}}
     </b-form-group>
   </b-form>
 </div>
</template>

<script>
import charData from '../assets/chars'

export default {
  data: function () {
    return {
      chars: charData,
      selected: -1
    }
  },
  computed: {
    charOptions: function () {
      return this.chars.map((x) => Object.create({ 'text': x['name'], 'value': x['id'] }))
    }
  }
}
</script>

<style scoped>

</style>
