<template>
  <BaseListContainer class="selection">
    <ConversationItem
      v-for="conversationData in conversations"
      :key="conversationData.uuid"
      :conversationData="conversationData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import ConversationItem
  from './BaseConversationsSimpleList/ConversationItem.vue'

export default {
  name: 'BaseConversationsSimpleList',
  components: {
    BaseListContainer,
    ConversationItem
  },
  props: {
    conversations: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
