<template>
  <BaseAccordionContainer
    :title="findText"
    @init="handleInit"
    @open="handleOpen"
  >
    <BaseTrackSearchContainer
      v-if="isOpen"
      sourceId="youtube"
      scope="videos"
      :query="query"
    >
      <template #default="slotProps">
        <VideoSelect
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :videos="slotProps.videos"
        />
      </template>
    </BaseTrackSearchContainer>

    <VideoData
      v-if="selectedVideoData"
      :key="key"
      :selectedVideoData="selectedVideoData"
      @click="handleVideoClick"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import BaseTrackSearchContainer
  from '@/containers/track/BaseTrackSearchContainer.vue'
import VideoSelect from './VideoSegment/VideoSelect.vue'
import VideoData from './VideoSegment/VideoData.vue'
import { generateKey } from '#/utils'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'VideoSegment',
  components: {
    BaseAccordionContainer,
    BaseTrackSearchContainer,
    VideoSelect,
    VideoData
  },
  provide () {
    return {
      setSelectedVideoData: this.setSelectedVideoData
    }
  },
  props: {
    query: String
  },
  data () {
    return {
      key: null,
      selectedVideoData: null,
      isOpen: false
    }
  },
  computed: {
    findText () {
      return this.$t(
        'actions.find.videos'
      )
    }
  },
  watch: {
    selectedVideoData: 'handleSelectedVideoDataChange'
  },
  methods: {
    handleInit (el) {
      this.segment = el
    },
    handleOpen () {
      this.isOpen = true
    },
    handleSelectedVideoDataChange () {
      this.key = generateKey()

      focusOnSegment(
        this.segment
      )
    },
    handleVideoClick () {
      focusOnSegment(
        this.segment
      )
    },
    setSelectedVideoData (value) {
      this.selectedVideoData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
