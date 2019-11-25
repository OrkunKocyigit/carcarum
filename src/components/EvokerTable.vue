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
        {{getStageName(data.item.currentStage)}}
      </template>

      <template v-slot:cell(details)="row">
        <b-button size="sm" class="mb-1" variant="primary" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <SummaryTable />
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
          label: 'Evoker Name'
        },
        {
          key: 'summonName',
          label: 'Summon Name'
        },
        {
          key: 'currentStage',
          label: 'Current Stage'
        },
        {
          key: 'details'
        },
        {
          key: 'delete'
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
        item.name = char.name
        let summon = this.summons.filter((x) => (x.id === char.summonId))[0]
        item.summonName = summon.name
        item.currentStage = evoker.currentStage
        items.push(item)
      }
      return items
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
