<template>
  <BaseSegmentContainer>
    <BaseAccordionContainer
      :title="filterText"
      @open="handleOpen"
    >
      <div class="filters-block-container">
        <FilterScopeSelect
          @select="handleFilterChange"
        />

        <Component
          ref="filter"
          :is="filterComponent"
          :[filter]="filterItems"
          @change="handleFilterItemsChange"
        />
      </div>

      <FilterItems
        :filterItems="filterItems"
        @change="handleFilterItemsChange"
      />
    </BaseAccordionContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ProfileArtistsFilterBlock
  from './FiltersSegment/ProfileArtistsFilterBlock.vue'
import TagsFilterBlock from './FiltersSegment/TagsFilterBlock.vue'
import FilterScopeSelect from './FiltersSegment/FilterScopeSelect.vue'
import FilterItems from './FiltersSegment/FilterItems.vue'

export default {
  name: 'FiltersSegment',
  components: {
    BaseSegmentContainer,
    BaseAccordionContainer,
    ProfileArtistsFilterBlock,
    TagsFilterBlock,
    FilterScopeSelect,
    FilterItems
  },
  props: {
    filter: String
  },
  emits: [
    'filterChange',
    'filterValueChange'
  ],
  data () {
    return {
      filterItems: [],
      filters: {
        artists: 'ProfileArtistsFilterBlock',
        tags: 'TagsFilterBlock'
      }
    }
  },
  computed: {
    filterText () {
      return this.$t(
        'recommendations.filter'
      )
    },
    filterComponent () {
      return this.filters[this.filter]
    },
    filterValue () {
      return this.filterItems.map(filterItemData => {
        return filterItemData.id
      })
    }
  },
  watch: {
    filterValue: 'handleFilterValueChange'
  },
  methods: {
    handleOpen () {
      this.$refs.filter.focusInput()
    },
    handleFilterChange (value) {
      this.filterItems = []

      this.$emit(
        'filterChange',
        value
      )

      this.$nextTick(() => {
        this.$refs.filter.focusInput()
      })
    },
    handleFilterItemsChange (value) {
      this.filterItems = value
    },
    handleFilterValueChange (newValue, oldValue) {
      const isChanged = (
        JSON.stringify(newValue) !==
          JSON.stringify(oldValue)
      )

      if (isChanged) {
        this.$emit(
          'filterValueChange',
          newValue
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.filters-block-container
  @extend .d-flex, .align-items-center
</style>
