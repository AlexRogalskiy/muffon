<template>
  <BaseProfileLibraryPaginatedPageContainer
    scope="tags"
    pageNameKey="tags"
    :profileId="profileId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
    isWithSearch
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
        :profileId="profileId"
        isLinkToLibrary
      />
    </template>
  </BaseProfileLibraryPaginatedPageContainer>
</template>

<script>
import BaseProfileLibraryPaginatedPageContainer
  from '@/containers/pages/profile/library/BaseProfileLibraryPaginatedPageContainer.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsPage',
  components: {
    BaseProfileLibraryPaginatedPageContainer,
    BaseTagsList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit: 100
    }
  }
}
</script>

<style lang="sass" scoped></style>
