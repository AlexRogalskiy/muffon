<template>
  <div
    class="item"
    @click="handleClick"
  >
    <i class="file audio icon"></i>
    {{ addText }}
  </div>
</template>

<script>
export default {
  name: 'PlaylistOption',
  emits: [
    'click'
  ],
  computed: {
    addText () {
      return this.$t(
        'actions.addTo.playlist'
      )
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
