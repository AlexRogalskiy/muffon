<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
      :artistName="artistName"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :artistData="artistData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :topTrackCount="topTrackCount"
      :profileId="profileId"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderSegment from './BaseArtistSegmentContainer/HeaderSegment.vue'
import getArtist from '#/actions/api/artist/get'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseArtistSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    artistName: {
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
      isLoading: false,
      error: null,
      artistData: null,
      topTrackCount: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getArtist,
    fetchData (page) {
      this.getArtist({
        ...this.artistArgs,
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
