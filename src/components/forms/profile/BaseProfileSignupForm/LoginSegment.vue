<template>
  <BaseSegmentContainer
    class="login-segment"
  >
    {{ loginText }}

    <span
      class="main-link"
      @click="handleLoginLinkClick"
    >
      <strong>
        {{ linkText }}
      </strong>
    </span>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'LoginSegment',
  components: {
    BaseSegmentContainer
  },
  emits: [
    'loginLinkClick'
  ],
  computed: {
    loginText () {
      return this.$t(
        'login.text'
      )
    },
    linkText () {
      return this.$t(
        'login.link'
      )
    }
  },
  methods: {
    handleLoginLinkClick () {
      this.$emit('loginLinkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.login-segment
  @extend .text-align-center
</style>
