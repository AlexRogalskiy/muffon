<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      :icon="icon"
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'NavbarHistoryButton',
  components: {
    BaseButton
  },
  props: {
    direction: {
      type: String,
      required: true
    }
  },
  computed: {
    icon () {
      return `arrow ${this.iconDirection}`
    },
    iconDirection () {
      return this.actionDirections[
        this.direction
      ]
    },
    actionDirections () {
      return {
        back: 'left',
        forward: 'right'
      }
    }
  },
  methods: {
    handleClick () {
      this.$router[
        this.direction
      ]()
    }
  }
}
</script>

<style lang="sass" scoped></style>
