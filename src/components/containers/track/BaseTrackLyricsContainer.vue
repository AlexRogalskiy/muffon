<template>
  <BaseSegmentContainer
    class="basic"
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="lyrics"
      :lyrics="lyrics"
      :trackId="trackId"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import getTrack from '#/actions/api/track/get'

export default {
  name: 'BaseTrackLyricsContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    selectedTrackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      trackData: null,
      isLoading: false
    }
  },
  computed: {
    trackArgs () {
      return {
        sourceId: 'genius',
        trackId: this.trackId
      }
    },
    trackId () {
      return this.selectedTrackData.genius_id
    },
    lyrics () {
      return this.trackData?.lyrics
    }
  },
  watch: {
    selectedTrackData: {
      immediate: true,
      handler: 'handleSelectedTrackDataChange'
    }
  },
  methods: {
    handleSelectedTrackDataChange () {
      this.fetchData()
    },
    handleRefresh () {
      this.fetchData()
    },
    getTrack,
    fetchData () {
      this.getTrack(
        this.trackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
