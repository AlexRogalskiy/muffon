<template>
  <div>
    <BaseErrorMessage
      class="connect-error"
      v-if="error"
      :error="error"
    />

    <div class="connect-block-container">
      <div class="connect-button-container">
        <BaseButton
          class="lastfm connect-button"
          icon="lastfm"
          :class="{
            loading: isLoading,
            disabled: isDisabled
          }"
          :text="importText"
          @click="handleClick"
        />
      </div>

      <BaseClearButton
        v-if="!isReset"
        @click="handleResetButtonClick"
      />
    </div>

    <template v-if="userData">
      <BaseDivider />

      <UserInfoSection
        :userData="userData"
      />
    </template>
  </div>
</template>

<script>
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import UserInfoSection from './ConnectSection/UserInfoSection.vue'
import getLastfmUser from '#/actions/api/lastfm/user/get'

export default {
  name: 'ConnectSection',
  components: {
    BaseErrorMessage,
    BaseButton,
    BaseClearButton,
    BaseDivider,
    UserInfoSection
  },
  inject: [
    'setStatus'
  ],
  emits: [
    'userDataChange'
  ],
  data () {
    return {
      error: null,
      userData: null,
      isLoading: false,
      isReset: true
    }
  },
  computed: {
    importText () {
      return this.$t(
        'actions.account.import.lastfm'
      )
    },
    isDisabled () {
      return !!this.userData
    }
  },
  watch: {
    userData: 'handleUserDataChange'
  },
  methods: {
    handleClick () {
      this.getLastfmUser()
    },
    handleUserDataChange (value) {
      this.$emit(
        'userDataChange',
        value
      )

      this.setStatus('import')
    },
    handleResetButtonClick () {
      this.error = null
      this.userData = null
      this.isReset = true
    },
    getLastfmUser
  }
}
</script>

<style lang="sass" scoped>
.connect-error
  margin-bottom: 1em !important

.connect-block-container
  @extend .d-flex, .align-items-center

.connect-button-container
  @extend .flex-full

.connect-button
  @extend .no-margin
</style>
