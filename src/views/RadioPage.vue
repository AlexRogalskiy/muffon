<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
    <SearchSegment
      :scope="scope"
      :modelName="modelName"
      :modelScope="modelScope"
      @scopeChange="handleScopeChange"
      @modelNameChange="handleModelNameChange"
      @modelScopeChange="handleModelScopeChange"
    />

    <PlayerSegment
      v-if="scope && modelScope"
      :key="key"
      :scope="scope"
      :modelName="modelName"
      :modelScope="modelScope"
    />
  </div>
</template>

<script>
import SearchSegment from './RadioPage/SearchSegment.vue'
import PlayerSegment from './RadioPage/PlayerSegment.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  radio as formatRadioPageNavigation
} from '#/formatters/navigation'
import formatRadioPageTab from '#/formatters/tabs/radio'
import { generateKey } from '#/utils'

export default {
  name: 'RadioPage',
  components: {
    SearchSegment,
    PlayerSegment
  },
  mixins: [
    navigationMixin
  ],
  data () {
    return {
      key: null,
      scope: null,
      modelName: null,
      modelScope: null
    }
  },
  computed: {
    navigationSections () {
      return formatRadioPageNavigation()
    },
    tabData () {
      return formatRadioPageTab()
    }
  },
  mounted () {
    this.setNavigation()
  },
  methods: {
    handleScopeChange (value) {
      this.scope = value
    },
    handleModelNameChange (value) {
      this.modelName = value

      this.key = generateKey()
    },
    handleModelScopeChange (value) {
      this.modelScope = value

      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
