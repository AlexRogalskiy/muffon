<template>
  <div class="main-library-modal-save-section">
    <BaseProgress
      v-show="isProgress"
      ref="progress"
      :formatActive="formatProgressActive"
      @complete="handleProgressComplete"
    />

    <CompleteSection
      v-if="isComplete"
      :isError="isError"
      :totalCount="totalCount"
      :errorTracks="errorTracks"
      @retry="handleRetry"
    />
  </div>
</template>

<script>
import BaseProgress from '@/BaseProgress.vue'
import CompleteSection from './TracksSection/CompleteSection.vue'
import createLibraryTrack from '#/actions/api/library/track/create'
import { artistName as formatArtistName } from '#/formatters'

export default {
  name: 'TracksSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setErrorTracks: this.setErrorTracks
    }
  },
  inject: [
    'setCollection'
  ],
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isComplete: false,
      isError: false,
      isMounted: false,
      isProgress: true,
      errorTracks: []
    }
  },
  computed: {
    totalCount () {
      return this.tracks.length
    }
  },
  mounted () {
    this.isMounted = true

    this.saveTracks()
  },
  beforeUnmount () {
    this.isMounted = false
  },
  watch: {
    tracks: 'handleTracksChange'
  },
  methods: {
    handleTracksChange () {
      this.$refs.progress.reset()

      this.saveTracks()
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false
    },
    handleRetry () {
      this.isComplete = false
      this.isError = false
      this.isProgress = true

      this.setCollection(
        [...this.errorTracks]
      )

      this.errorTracks = []
    },
    createLibraryTrack,
    formatProgressActive ({ value, total }) {
      return this.$t(
        'save.active.tracks',
        { value, total }
      )
    },
    async saveTracks () {
      this.$refs.progress.setTotalCount(
        this.totalCount
      )

      for (const trackData of this.tracks) {
        if (this.isMounted) {
          await this.saveTrack(
            trackData
          )
        }
      }
    },
    async saveTrack (trackData) {
      const trackFormatted =
        this.formatTrack(
          trackData
        )

      const handleError = () => {
        if (this.isMounted) {
          this.errorTracks.push(
            trackData
          )
        }
      }

      const handleFinish = () => {
        if (this.isMounted) {
          this.$refs.progress.increment()
        }
      }

      await this.createLibraryTrack(
        trackFormatted
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatTrack (trackData) {
      const artistName =
        formatArtistName(
          trackData.artists
        )

      return {
        trackTitle: trackData.title,
        artistName
      }
    },
    setErrorTracks (value) {
      this.errorTracks = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
