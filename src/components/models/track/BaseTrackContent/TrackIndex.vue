<template>
  <div class="description track-index">
    {{ indexText }}
  </div>
</template>

<script>
export default {
  name: 'TrackIndex',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    indexText () {
      return `${this.index + 1}.`
    }
  }
}
</script>

<style lang="sass" scoped>
.track-index
  margin-right: 0.5em
</style>
