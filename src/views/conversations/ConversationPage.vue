<template>
  <BaseConversationPageContainer
    :conversationId="conversationId"
  >
    <template #default="slotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <ProfileSegment
          :conversationData="slotProps.conversationData"
        />

        <FormSegment
          :profileId="slotProps.profileId"
          @success="handleSuccess"
        />

        <MessagesSegment
          class="main-paginated-page-segment-container"
          :key="key"
          :conversationId="conversationId"
        />
      </div>
    </template>
  </BaseConversationPageContainer>
</template>

<script>
import BaseConversationPageContainer
  from '@/containers/pages/conversation/BaseConversationPageContainer.vue'
import ProfileSegment from './ConversationPage/ProfileSegment.vue'
import FormSegment from './ConversationPage/FormSegment.vue'
import MessagesSegment from './ConversationPage/MessagesSegment.vue'
import { generateKey } from '#/utils'

export default {
  name: 'ConversationPage',
  components: {
    BaseConversationPageContainer,
    ProfileSegment,
    FormSegment,
    MessagesSegment
  },
  props: {
    conversationId: String
  },
  data () {
    return {
      key: null
    }
  },
  methods: {
    handleSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
