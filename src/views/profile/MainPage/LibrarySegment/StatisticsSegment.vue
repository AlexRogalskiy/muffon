<template>
  <BaseSegmentContainer
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <template v-if="libraryData">
      <BaseProfileLibraryStatistics
        :libraryData="libraryData"
        :profileId="profileId"
      />
    </template>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryStatistics
  from '@/models/profile/library/BaseProfileLibraryStatistics.vue'
import getLibrary from '#/actions/api/library/get'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryStatistics
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryData () {
      return this.profileData?.library
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
    },
    getLibrary,
    fetchData () {
      this.getLibrary({
        profileId: this.profileId
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
