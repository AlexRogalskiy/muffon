<template>
  <BaseProfileLibraryPaginatedSegmentContainer
    headerTextKey="tags"
    scope="tags"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    :profileId="profileId"
    :formatHeaderLink="formatProfileLibraryTagsLink"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
        :profileId="profileId"
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedSegmentContainer>
</template>

<script>
import BaseProfileLibraryPaginatedSegmentContainer
  from '@/containers/segments/profile/library/BaseProfileLibraryPaginatedSegmentContainer.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import {
  tags as formatProfileLibraryTagsLink
} from '#/formatters/links/profile/library'

export default {
  name: 'TagsSegment',
  components: {
    BaseProfileLibraryPaginatedSegmentContainer,
    BaseTagsList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 20
    }
  },
  methods: {
    formatProfileLibraryTagsLink
  }
}
</script>

<style lang="sass" scoped></style>
