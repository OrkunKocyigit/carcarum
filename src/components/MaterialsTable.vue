<template>
  <div>
    <b-table
      primary-key="id"
      striped
      :responsive="true"
      stacked="md"
      :fields="fields"
      :items="matList"
      show-empty>
      <template
        v-slot:cell(pic)="data">
        <b-img
          thumbnail
          left
          :src="data.item.pic"
          fluid
          width="64"
          height="64"
          alt=""/>
      </template>
      <template
        v-slot:cell(count)="data">
        {{data.item.count}}
      </template>
      <template
        v-slot:cell(own)="data">
        <b-form-input
          v-model="data.item.own"
          @input="(val) => updateProgressBar(val, data)"
          @change="triggerInventoryChange(data.item.id, data.value)"
          :disabled="readOnly"
          size="sm"
          type="number"/>
      </template>
      <template
        v-slot:cell(progress)="data">
        <b-progress class="mt-2" :max="100" show-value>
          <b-progress-bar
          :value="data.item.progress"
          variant="success" />
        </b-progress>
      </template>
      <template
        v-slot:cell(tip)="data">
        {{data.item.tip}}
      </template>
    </b-table>
    <b-button
      v-if="!noToggle"
      variant="primary"
      block
      :disabled="!hasAllMats"
      @click="triggerEvokerUpgrade(mats)">
      Upgrade
    </b-button>
  </div>
</template>

<script>
import getString from '../translate'
import Materials from '../assets/materials'
export default {
  name: 'MaterialsTable',
  props: {
    mats: Object,
    inventory: Object,
    triggerInventoryChange: {
      type: Function,
      default: () => void (0)
    },
    triggerEvokerUpgrade: {
      type: Function,
      default: () => void (0)
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    noToggle: {
      type: Boolean,
      default: false
    }
  },
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
      let matIds = Object.keys(this.mats).map(x => parseInt(x, 10))
      if (matIds.length > 0) {
        let inv = this.inventory
        let matList = this.materialsList
        for (let i = 0; i < matIds.length; i++) {
          let matObj = matList.find(x => x.id === matIds[i])
          if (matObj) {
            let mat = {}
            mat.id = matIds[i]
            mat.pic = matObj.img
            mat.name = matObj.name
            mat.count = this.mats[matIds[i]]
            if (!inv || !inv.hasOwnProperty(mat.id)) {
              this.triggerInventoryChange(mat.id, 0)
              mat.own = 0
            } else {
              mat.own = parseInt(inv[mat.id])
            }
            mat.progress = Math.min(mat.own / mat.count * 100, 100)
            mat.tip = this.getTranslation(matObj.tip, 'en')
            totalCost.push(mat)
          }
        }
      }
      return totalCost
    },
    hasAllMats: function () {
      let result = true
      for (let mat of this.matList) {
        if (mat.progress < 100) {
          result = false
          break
        }
      }
      return result
    }
  },
  methods: {
    getTranslation: getString,
    updateProgressBar: function (val, row) {
      val = parseInt(val)
      this.$set(row.item, 'progress', Math.min(val / row.item.count * 100, 100))
    }
  }
}
</script>

<style scoped>
.progress {
  margin-top: 0 !important;
}
</style>
