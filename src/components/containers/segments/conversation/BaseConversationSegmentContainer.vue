<template>
  <BaseSegmentContainer
    ref="segment"
    :isLoading="isLoading"
  >
    <slot
      :isLoading="isLoading"
      :error="error"
      :conversationData="conversationData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import getConversation from '#/actions/api/conversation/get'

export default {
  name: 'BaseConversationSegmentContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    conversationId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      conversationData: null
    }
  },
  computed: {
    conversationArgs () {
      return {
        conversationId: this.conversationId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getConversation,
    fetchData (page) {
      this.getConversation({
        ...this.conversationArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        this.$refs.segment.focus()
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
