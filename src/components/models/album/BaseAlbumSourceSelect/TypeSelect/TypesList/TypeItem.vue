<template>
  <BaseDropdownItem
    :header="headerText"
    :isDisabled="isDisabled"
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'TypeItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedTypeId'
  ],
  props: {
    typeId: {
      type: String,
      required: true
    },
    isDisabled: Boolean
  },
  computed: {
    headerText () {
      return this.$t(
        `sources.albumTypes.${this.typeId}`
      )
    }
  },
  methods: {
    handleClick () {
      this.setSelectedTypeId(
        this.typeId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
