<template>
  <div class="main-library-modal-complete-section">
    <template v-if="isError">
      <RetrySection
        v-if="errorAlbums.length"
        :errorAlbums="errorAlbums"
        @retry="handleRetryButtonClick"
      />
    </template>

    <BaseMessage
      v-else
      class="success"
      :icons="['check']"
      :header="successText"
    />
  </div>
</template>

<script>
import RetrySection from './CompleteSection/RetrySection.vue'
import BaseMessage from '@/messages/BaseMessage.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'CompleteSection',
  components: {
    RetrySection,
    BaseMessage
  },
  props: {
    isError: Boolean,
    totalCount: Number,
    errorAlbums: Array
  },
  emits: [
    'retry'
  ],
  computed: {
    successText () {
      return this.$t(
        'save.success.albums',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit('retry')
    }
  }
}
</script>

<style lang="sass" scoped></style>
