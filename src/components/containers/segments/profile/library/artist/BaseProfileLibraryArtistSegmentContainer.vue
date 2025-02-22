<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :profileId="profileId"
      :artistId="artistId"
      :scope="scope"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :libraryArtistData="libraryArtistData"
      :artistName="artistName"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import HeaderSegment
  from './BaseProfileLibraryArtistSegmentContainer/HeaderSegment.vue'
import getLibraryArtist from '#/actions/api/library/artist/get'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseProfileLibraryArtistSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryArtistArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryArtistData () {
      return this.profileData?.library?.artist
    },
    artistName () {
      return this.libraryArtistData?.name
    }
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getLibraryArtist,
    fetchData (page) {
      this.getLibraryArtist({
        ...this.libraryArtistArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
