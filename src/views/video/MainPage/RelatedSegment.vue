<template>
  <BaseVideoSegmentContainer
    ref="segment"
    scope="related"
    headerTextKey="related"
    :videoId="videoId"
    :responsePageLimit="limit"
    :formatHeaderLink="formatVideoRelatedLink"
  >
    <template #default="pageSlotProps">
      <BaseSegmentContainer
        :isLoading="pageSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          scope="related"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          :responseData="pageSlotProps.videoData"
          :clientPageLimit="4"
          :responsePageLimit="limit"
          @fetchData="pageSlotProps.fetchData"
          @refresh="pageSlotProps.handleRefresh"
        >
          <template #default="slotProps">
            <BaseVideosTableList
              :videos="slotProps.related"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseVideoSegmentContainer>
</template>

<script>
import BaseVideoSegmentContainer
  from '@/containers/segments/video/BaseVideoSegmentContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BaseVideosTableList from '@/lists/videos/BaseVideosTableList.vue'
import { related as formatVideoRelatedLink } from '#/formatters/links/video'

export default {
  name: 'RelatedSegment',
  components: {
    BaseVideoSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BaseVideosTableList
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      limit: 40
    }
  },
  computed: {
    videoId () {
      return this.videoData.youtube_id.toString()
    }
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    },
    formatVideoRelatedLink
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
