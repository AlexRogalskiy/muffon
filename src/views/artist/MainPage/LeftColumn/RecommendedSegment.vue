<template>
  <BaseSegmentContainer>
    <div class="recommended-block">
      <i class="volume up icon"></i>

      <div class="content">
        <BaseHeader
          tag="h5"
          :text="headerText"
        />

        <div class="based-text">
          {{ basedText }}
        </div>

        <BaseButton
          class="basic compact fluid"
          icon="microphone alternate"
          :text="artistsText"
          @click="handleArtistsButtonClick"
        />

        <BaseRecommendationProfileArtistsModal
          ref="artistsModal"
          :recommendationId="recommendationId"
        />
      </div>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BaseRecommendationProfileArtistsModal
  from '@/modals/recommendation/BaseRecommendationProfileArtistsModal.vue'

export default {
  name: 'RecommendedSegment',
  components: {
    BaseSegmentContainer,
    BaseHeader,
    BaseButton,
    BaseRecommendationProfileArtistsModal
  },
  props: {
    recommendationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    headerText () {
      return this.$t(
        'recommended.header'
      )
    },
    basedText () {
      return this.$t(
        'recommended.based'
      )
    },
    artistsText () {
      return this.$t(
        'counters.artists',
        { count: this.profileArtistsCount }
      )
    },
    profileArtistsCount () {
      return this.recommendationData.profile_artists_count
    },
    recommendationId () {
      return this.recommendationData.id.toString()
    }
  },
  methods: {
    handleArtistsButtonClick () {
      this.$refs.artistsModal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.recommended-block
  @extend .d-flex
  & > .icon
    @extend .no-margin
    font-size: 1.2em
  & > .content
    @extend .flex-full
    margin-left: 0.5em !important
    & > .based-text
      margin: 0.25em 0
</style>
