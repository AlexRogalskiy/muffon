<template>
  <BaseHeaderContainer
    class="main-link main-artist-name"
    tag="h2"
  >
    <BaseArtistLinkContainer
      :artistData="artistData"
      :profileId="profileId"
      :isLinkToLibrary="isLinkToLibrary"
    >
      {{ artistName }}
    </BaseArtistLinkContainer>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseArtistLinkContainer
  from '@/containers/artist/BaseArtistLinkContainer.vue'

export default {
  name: 'HeaderSection',
  components: {
    BaseHeaderContainer,
    BaseArtistLinkContainer
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: String,
    isLinkToLibrary: Boolean
  },
  computed: {
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.main-artist-name
  @extend .width-fit-content
</style>
