<template>
  <BaseDropdownItem
    model="artist"
    :image="imageData?.extrasmall"
    :header="artistName"
    isWithImage
    isImageCircular
    @click="handleClick"
  />
</template>

<script>
import BaseDropdownItem from '@/dropdowns/BaseDropdownItem.vue'
import { generateKey } from '#/utils'

export default {
  name: 'ArtistItem',
  components: {
    BaseDropdownItem
  },
  inject: [
    'setSelectedArtistData'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    }
  },
  methods: {
    handleClick () {
      this.setSelectedArtistData({
        ...this.artistData,
        uuid: generateKey()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
