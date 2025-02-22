<template>
  <div class="main-paginated-list-container">
    <div class="main-paginated-list-content-container">
      <template v-if="!isLoading">
        <BaseErrorMessage
          v-if="error"
          :error="error"
          isWithRefreshButton
          @refresh="handleRefresh"
        />
        <template v-else-if="responsePageCollection">
          <BaseNoCollectionMessage
            v-if="!isResponseCollection"
            :scope="scope"
          />
          <slot
            v-else-if="isClientPageCollectionFiltered"
            :[scope]="clientPageCollectionFiltered"
          />
        </template>
      </template>
    </div>

    <template v-if="isRenderPagination">
      <BaseDivider />

      <div class="main-pagination-container">
        <BaseSimplePagination
          v-if="isPaginationSimple"
          :isWithPrevPage="!!prevPage"
          :isWithNextPage="!!nextPage"
          :isDisabled="isPaginationDisabled"
          @prevPageButtonClick="handlePrevPageButtonClick"
          @nextPageButtonClick="handleNextPageButtonClick"
        />
        <BasePagination
          v-else
          :totalPages="clientTotalPages"
          :isDisabled="isPaginationDisabled"
          isWithNearButtons
          @pageChange="changeClientPage"
        />
      </div>
    </template>
  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseNoCollectionMessage from '@/messages/BaseNoCollectionMessage.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseSimplePagination from '@/BaseSimplePagination.vue'
import BasePagination from '@/BasePagination.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BasePaginatedListContainer',
  components: {
    BaseErrorMessage,
    BaseNoCollectionMessage,
    BaseDivider,
    BaseSimplePagination,
    BasePagination
  },
  provide () {
    return {
      findPaginationItem: this.findPaginationItem,
      updatePaginationItem: this.updatePaginationItem
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    clientPageLimit: {
      type: Number,
      required: true
    },
    responsePageLimit: {
      type: Number,
      required: true
    },
    isLoading: Boolean,
    error: Error,
    responseData: Object,
    isReset: Boolean,
    isWithPagination: Boolean,
    isPaginationSimple: Boolean
  },
  emits: [
    'focus',
    'fetchData',
    'refresh'
  ],
  data () {
    return {
      responsePageCollection: null,
      clientPageCollection: null,
      currentPage: null,
      responseTotalPages: 0,
      clientPage: 1,
      clientCollectionPaginated: {},
      isForward: true,
      isFocusable: false,
      isLastPage: false
    }
  },
  computed: {
    isResponseCollection () {
      return this.responsePageCollection.length
    },
    isClientPageCollectionFiltered () {
      return !!this.clientPageCollectionFiltered.length
    },
    isRenderPagination () {
      return (
        this.isWithPagination || (
          this.responsePageCollection &&
            this.isPageable
        )
      )
    },
    isPageable () {
      return (
        this.isResponsePageable ||
          this.isResponsePagePageable
      )
    },
    isResponsePageable () {
      return (
        this.responseTotalPages > 1 ||
          this.nextPage ||
            this.prevPage
      )
    },
    nextPage () {
      return this.responseData?.next_page
    },
    prevPage () {
      return this.responseData?.prev_page
    },
    isResponsePagePageable () {
      return (
        this.responsePageCollection.length >
          this.clientPageLimit
      )
    },
    clientTotalPages () {
      return Math.ceil(
        this.totalItems /
          this.clientPageLimit
      )
    },
    totalItems () {
      return (
        this.responseTotalPages *
          this.responsePageLimit
      )
    },
    isPaginationDisabled () {
      return !!this.error
    },
    clientPageCollectionFiltered () {
      return this.clientPageCollection.filter(item => {
        return item
      })
    },
    newClientCollectionPaginated () {
      return deepmerge(
        ...this.clientResponsePageCollections,
        { arrayMerge: this.mergeArrays }
      )
    },
    clientResponsePageCollections () {
      const collections =
        this.formatCollections()

      if (this.isForward) {
        return collections
      } else {
        return collections.reverse()
      }
    },
    responsePageCollectionPaginated () {
      const collection = [
        ...this.responsePageCollection
      ]
      collection.length = this.responsePageLimit

      const newCollection = []

      for (
        let page = this.clientStartPage;
        collection.length > 0;
        page++
      ) {
        const prevPageRemainder =
          newCollection.length ? 0 : this.pageRemainder
        const pageDataLength = (
          this.clientPageLimit -
            prevPageRemainder
        )
        const pageData =
          collection.splice(
            0, pageDataLength
          )

        newCollection.push(
          [page, pageData]
        )
      }

      return Object.fromEntries(
        newCollection
      )
    },
    clientStartPage () {
      return Math.floor(
        this.responseOffset /
          this.clientPageLimit
      ) + 1
    },
    responseOffset () {
      return (
        this.responsePageLimit *
          (this.responseData.page - 1)
      )
    },
    pageRemainder () {
      return (
        this.responseOffset %
          this.clientPageLimit
      )
    },
    isCollectionFull () {
      return (
        this.clientPageCollectionLength >=
          this.clientCurrentPageLimit
      )
    },
    clientPageCollectionLength () {
      return this.clientPageCollection?.length || 0
    },
    clientCurrentPageLimit () {
      return Math.min(
        this.remainingItems,
        this.clientPageLimit
      )
    },
    remainingItems () {
      return (
        this.totalItems -
          this.clientOffset
      )
    },
    clientOffset () {
      return (
        this.clientPageLimit *
          (this.clientPage - 1)
      )
    },
    requestPage () {
      if (this.isForward) {
        return this.forwardPage
      } else if (this.isLastPage) {
        return this.lastPage
      } else {
        return this.backwardPage
      }
    },
    forwardPage () {
      return (
        this.forwardPageOffset /
          this.responsePageLimit
      ) + 1
    },
    forwardPageOffset () {
      return (
        (this.clientPage - 1) *
          this.clientPageLimit +
          this.clientPageCollectionLength
      )
    },
    lastPage () {
      return (
        this.lastPageOffset /
          this.responsePageLimit
      )
    },
    lastPageOffset () {
      return (
        this.totalItems -
          this.clientPageCollectionLength
      )
    },
    backwardPage () {
      return (
        this.backwardPageOffset /
          this.responsePageLimit
      )
    },
    backwardPageOffset () {
      return (
        this.clientPage *
          this.clientPageLimit
      ) - this.clientPageCollectionLength
    }
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    clientPage: 'handleClientPageChange',
    clientPageCollection: 'handleClientPageCollectionChange'
  },
  mounted () {
    if (this.isPaginationSimple) {
      this.currentPage = this.nextPage
    }
  },
  methods: {
    handleRefresh () {
      const page = this.isPaginationSimple
        ? this.currentPage
        : this.requestPage

      this.$emit(
        'refresh',
        page
      )
    },
    handleResponseDataChange (value) {
      if (value) {
        this.responseTotalPages =
          value.total_pages
        this.responsePageCollection =
          formatCollection(
            value[this.scope]
          )

        this.setCollections()
      }
    },
    handleClientPageChange () {
      this.setClientPageCollection()
    },
    handleClientPageCollectionChange (value) {
      if (value) {
        if (this.isFocusable) {
          this.$emit('focus')
        }

        if (!this.isCollectionFull) {
          this.$nextTick(() => {
            this.fetchData()
          })
        }
      }
    },
    handlePrevPageButtonClick () {
      this.currentPage = this.prevPage

      this.$emit(
        'fetchData',
        this.prevPage
      )
    },
    handleNextPageButtonClick () {
      this.currentPage = this.nextPage

      this.$emit(
        'fetchData',
        this.nextPage
      )
    },
    fetchData () {
      this.$nextTick(() => {
        this.$emit(
          'fetchData',
          this.requestPage
        )
      })
    },
    setCollections () {
      this.clientCollectionPaginated =
        this.newClientCollectionPaginated

      this.setClientPageCollection()
    },
    setClientPageCollection () {
      this.clientPageCollection =
        this.clientCollectionPaginated[
          this.clientPage
        ] || []
    },
    changeClientPage (page) {
      this.isLastPage = (
        page ===
          this.clientTotalPages
      )
      this.isForward = (
        page > this.clientPage &&
          !this.isLastPage
      )
      this.clientPage = page
      this.isFocusable = true
    },
    mergeArrays (array, newArray) {
      if (this.isArrayFull(array)) {
        return array
      } else if (this.isArrayFull(newArray)) {
        return newArray
      } else {
        return deepmerge(array, newArray)
      }
    },
    isArrayFull (array) {
      return (
        array.length ===
          this.clientPageLimit
      )
    },
    reset () {
      Object.assign(
        this.$data,
        this.$options.data.apply(this)
      )
    },
    findPaginationItem ({ uuid }) {
      return this.clientPageCollection.find(itemData => {
        return itemData.uuid === uuid
      })
    },
    updatePaginationItem ({ uuid, value }) {
      const index =
        this.clientPageCollection.findIndex(itemData => {
          return itemData.uuid === uuid
        })

      this.clientPageCollection[index] = value
    },
    formatCollections () {
      if (this.isReset) {
        return [
          this.responsePageCollectionPaginated
        ]
      } else {
        return [
          { ...this.clientCollectionPaginated },
          this.responsePageCollectionPaginated
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
