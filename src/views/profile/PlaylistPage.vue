<template>
  <BasePlaylistPageContainer
    :profileId="profileId"
    :playlistId="playlistId"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlistData="pageSlotProps.profileData.playlist"
          :profileId="profileId"
        />

        <ImportSegment
          v-if="isRenderImport"
          :playlistId="playlistId"
        />

        <TracksSegment
          class="main-paginated-page-segment-container"
          :profileId="profileId"
          :playlistId="playlistId"
          :playlistTitle="pageSlotProps.profileData.playlist.title"
        />
      </div>
    </template>
  </BasePlaylistPageContainer>
</template>

<script>
import BasePlaylistPageContainer
  from '@/containers/pages/playlist/BasePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import ImportSegment from './PlaylistPage/ImportSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'PlaylistPage',
  components: {
    BasePlaylistPageContainer,
    InfoSegment,
    ImportSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    playlistId: String
  },
  computed: {
    isRenderImport () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
