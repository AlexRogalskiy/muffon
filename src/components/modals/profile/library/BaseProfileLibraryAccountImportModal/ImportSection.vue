<template>
  <div class="main-library-modal-import-section">
    <BaseProgress
      v-show="isProgress"
      ref="progress"
      :formatActive="formatProgressActive"
      @complete="handleProgressComplete"
    />

    <CompleteSection
      v-if="isComplete"
      :successTracks="successTracks"
      :error="error"
    />
  </div>
</template>

<script>
import BaseProgress from '@/BaseProgress.vue'
import CompleteSection from './ImportSection/CompleteSection.vue'
import getLastfmUserPlays from '#/actions/api/lastfm/user/plays/get'
import {
  collection as formatCollection,
  playsToTracks as formatPlaysToTracks
} from '#/formatters'

export default {
  name: 'ImportSection',
  components: {
    BaseProgress,
    CompleteSection
  },
  provide () {
    return {
      setSuccessTracks: this.setSuccessTracks
    }
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      plays: [],
      successTracks: [],
      isComplete: false,
      isMounted: false,
      isProgress: true
    }
  },
  computed: {
    nickname () {
      return this.userData.nickname
    }
  },
  watch: {
    plays: 'handlePlaysChange'
  },
  mounted () {
    this.isMounted = true

    this.$refs.progress.setTotalCount(
      this.userData.plays_count
    )

    this.getLastfmUserPlays({
      nickname: this.nickname
    })
  },
  beforeUnmount () {
    this.isMounted = false
  },
  methods: {
    getLastfmUserPlays,
    handlePlaysChange (value) {
      this.$refs.progress.setValue(
        value.length
      )
    },
    handleProgressComplete () {
      this.isComplete = true
      this.isProgress = false

      this.successTracks =
        formatCollection(
          formatPlaysToTracks(
            this.plays
          )
        )
    },
    formatProgressActive ({ value, total }) {
      return this.$t(
        'import.active.plays',
        { value, total }
      )
    },
    setSuccessTracks (value) {
      this.successTracks = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
