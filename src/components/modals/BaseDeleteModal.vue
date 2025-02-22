<template>
  <BaseModalContainer ref="modal">
    <div class="header">
      {{ headerText }}
    </div>

    <div class="content">
      <TextSection
        :modelType="modelType"
        :model="model"
        :modelName="modelName"
        :parentModelName="parentModelName"
        :isWithAlsoText="isWithAlsoText"
      />

      <BaseErrorMessage
        v-if="error"
        class="error-message"
        :error="error"
      />
    </div>

    <div class="actions">
      <BaseButton
        class="cancel"
        :text="cancelText"
      />

      <BaseButton
        class="red"
        :text="deleteText"
        :class="{ loading: isLoading }"
        @click="handleDeleteButtonClick"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import TextSection from './BaseDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'BaseDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
    BaseButton
  },
  props: {
    modelType: {
      type: String,
      required: true
    },
    model: String,
    modelName: String,
    parentModelName: String,
    isLoading: Boolean,
    error: Error,
    isWithAlsoText: Boolean
  },
  emits: [
    'deleteButtonClick'
  ],
  computed: {
    headerText () {
      return this.$t(
        [
          `modals.delete.header.${this.modelType}`,
          this.model
        ].filter(e => e).join('.')
      )
    },
    cancelText () {
      return this.$t(
        'actions.cancel'
      )
    },
    deleteText () {
      return this.$t(
        'actions.delete'
      )
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick'
      )
    },
    show () {
      this.$refs.modal.show()
    },
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
