<template>
  <BaseTopPaginatedSegmentContainer
    scope="tags"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
  >
    <template #default="slotProps">
      <BaseTagsList
        :tags="slotProps.tags"
      />
    </template>
  </BaseTopPaginatedSegmentContainer>
</template>

<script>
import BaseTopPaginatedSegmentContainer
  from '@/containers/segments/top/BaseTopPaginatedSegmentContainer.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsSegment',
  components: {
    BaseTopPaginatedSegmentContainer,
    BaseTagsList
  },
  data () {
    return {
      limit: 20
    }
  }
}
</script>

<style lang="sass" scoped></style>
