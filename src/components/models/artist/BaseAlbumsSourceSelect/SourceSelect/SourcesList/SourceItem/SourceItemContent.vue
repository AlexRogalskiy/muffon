<template>
  <BaseDropdownItem
    :icon="icon"
    :header="sourceName"
    :isLoading="isLoading"
    :isError="isError"
    :isDisabled="isDisabled"
    isIconColored
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'

export default {
  name: 'SourceItemContent',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedSourceData'
  ],
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    artists: Array,
    isLoading: Boolean,
    isError: Boolean
  },
  computed: {
    isDisabled () {
      return (
        this.isLoading ||
          this.isError ||
          !this.isAnyArtists
      )
    },
    isAnyArtists () {
      return !!this.artists?.length
    },
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    sourceId () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.albumsTypes
    }
  },
  methods: {
    handleClick () {
      this.setSelectedSourceData({
        id: this.sourceId,
        types: this.types,
        artists: this.artists
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
