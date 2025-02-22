<template>
  <div class="ui raised segments main-segment-container">
    <BaseSegmentContainer>
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="artistMainLink"
      >
        <BaseArtistImage
          class="circular bordered main-profile-page-image"
          size="medium"
          :imageData="imageData"
          :artistName="artistName"
        />

        <BaseHeader
          class="link"
          tag="h3"
          :text="artistName"
        />
      </BaseLinkContainer>

      <div
        v-if="favoriteId || isRenderOptions"
        class="main-self-container"
      >
        <BaseSelfIcons
          :favoriteId="favoriteId"
        />

        <template
          v-if="isRenderOptions"
        >
          <BaseOptionsDropdown
            model="artist"
            :artistName="artistName"
            :favoriteId="favoriteId"
            isWithFavoriteOption
            isWithDeleteOption
            @delete="handleDeleteOptionClick"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="artist"
            :profileId="profileId"
            :modelId="artistId"
            :modelName="artistName"
            isDeleteWithRedirect
          />
        </template>
      </div>

      <BaseDivider />

      <div class="main-profile-page-info">
        <div>
          {{ sinceText }}
        </div>
        <strong>
          {{ createdFormatted }}
        </strong>
      </div>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseProfileLibraryDeleteModal
  from '@/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '@/BaseDivider.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseArtistImage,
    BaseHeader,
    BaseSelfIcons,
    BaseDivider,
    BaseOptionsDropdown,
    BaseProfileLibraryDeleteModal
  },
  provide () {
    return {
      setFavoriteId: this.setFavoriteId
    }
  },
  props: {
    artistData: Object,
    profileId: String,
    artistId: String
  },
  data () {
    return {
      favoriteId: null
    }
  },
  computed: {
    artistMainLink () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    sinceText () {
      return this.$t(
        'library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.artistData.created
    },
    isRenderOptions () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  mounted () {
    this.favoriteId =
      this.artistData.favorite_id?.toString()
  },
  methods: {
    handleDeleteOptionClick () {
      this.$refs.deleteModal.show()
    },
    setFavoriteId (value) {
      this.favoriteId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px
</style>
