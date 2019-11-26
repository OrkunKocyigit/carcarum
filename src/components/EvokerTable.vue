<template>
  <div>
    <b-table
      :fields="fields"
      primary-key="id"
      striped
      responsive="md"
      :items="tableItems"
      show-empty>
      <template v-slot:cell(currentStage)="data">
        {{getTranslation('stages', 'en', data.item.currentStage)}}
      </template>

      <template v-slot:cell(details)="row">
        <b-button :disabled="row.item.currentStage === chars.find((x) => (x.id === row.item.id)).maxStage" size="sm" class="mb-1" variant="primary" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <SummaryTable
          :currentStage="row.item.currentStage"
          :char="chars.find((x) => (x.id === row.item.id))"/>
      </template>

      <template v-slot:cell(delete)="data">
        <b-button size="sm" class="mb-1" variant="danger" @click="removeEvoker(data.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import SummaryTable from '../components/SummaryTable'
import charData from '../assets/chars'
import summonData from '../assets/summons'
import getString from '../translate'

export default {
  name: 'EvokerTable',
  props: ['evokerList', 'removeEvoker'],
  components: {
    'SummaryTable': SummaryTable
  },
  data: function () {
    return {
      fields: [
        {
          key: 'name',
          label: this.getTranslation('table-label-name', 'en')
        },
        {
          key: 'summonName',
          label: this.getTranslation('table-label-summonname', 'en')
        },
        {
          key: 'currentStage',
          label: this.getTranslation('table-label-currentstage', 'en')
        },
        {
          key: 'details',
          label: this.getTranslation('table-label-details', 'en')
        },
        {
          key: 'delete',
          label: this.getTranslation('table-label-delete', 'en')
        }
      ],
      chars: charData,
      summons: summonData
    }
  },
  computed: {
    tableItems: function () {
      let items = []
      for (let evoker of this.evokerList) {
        let item = {}
        item.id = evoker.id
        let char = this.chars.filter((x) => (x.id === item.id))[0]
        item.name = this.getTranslation(char.name, 'en')
        let summon = this.summons.filter((x) => (x.id === char.summonId))[0]
        item.summonName = this.getTranslation(summon.name, 'en')
        item.currentStage = evoker.currentStage
        items.push(item)
      }
      return items
    }
  },
  methods: {
    getTranslation: getString
  }
}
</script>

<style scoped>

</style>
