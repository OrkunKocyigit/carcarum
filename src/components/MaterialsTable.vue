<template>
  <div>
    <b-table
      primary-key="id"
      striped
      responsive="md"
      :fields="fields"
      :items="matList"
      show-empty>

      <template v-slot:cell(pic)="data">
        <b-img thumbnail left :src="data.item.pic" fluid width="64" height="64"  alt=""/>
      </template>
      <template v-slot:cell(name)="data">
        {{data.item.name}}
      </template>
      <template v-slot:cell(count)="data">
        {{data.item.count}}
      </template>
      <template v-slot:cell(own)="data">
        {{data.item.own}}
      </template>
      <template v-slot:cell(progress)="data">
        {{data.item.progress}}
      </template>
      <template v-slot:cell(tip)="data">
        {{data.item.tip}}
      </template>
    </b-table>
  </div>
</template>

<script>
import getString from '../translate'
import Materials from '../assets/materials'
export default {
  name: 'MaterialsTable',
  props: ['mats'],
  data: function () {
    return {
      fields: [
        {
          key: 'pic',
          label: this.getTranslation('table-label-icon', 'en')
        },
        {
          key: 'name',
          label: this.getTranslation('table-label-matname', 'en')
        },
        {
          key: 'count',
          label: this.getTranslation('table-label-count', 'en')
        },
        {
          key: 'own',
          label: this.getTranslation('table-label-own', 'en')
        },
        {
          key: 'progress',
          label: this.getTranslation('table-label-progress', 'en')
        },
        {
          key: 'tip',
          label: this.getTranslation('table-label-tip', 'en')
        }
      ],
      materialsList: Materials
    }
  },
  computed: {
    matList: function () {
      let totalCost = []
      let ids = Object.keys(this.mats).map(x => parseInt(x, 10))
      let matList = this.materialsList
      for (let i = 0; i < ids.length; i++) {
        let matObj = matList.find((x) => (x.id === ids[i]))
        if (matObj) {
          let mat = {}
          mat.pic = matObj.img
          mat.name = matObj.name
          mat.count = this.mats[ids[i]]
          mat.own = 0
          mat.progress = mat.own / mat.count * 100
          mat.tip = this.getTranslation(matObj.tip, 'en')
          totalCost.push(mat)
        }
      }
      return totalCost
    }
  },
  methods: {
    getTranslation: getString
  }
}
</script>

<style scoped>

</style>
