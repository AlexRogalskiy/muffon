<template>
  <div
    class="ui image placeholder"
    :class="{ inverted: isDarkMode }"
  ></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseImagePlaceholder',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>
