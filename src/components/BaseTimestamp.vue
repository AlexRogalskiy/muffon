<template>
  <div class="main-small-container">
    <small>
      {{ createdText }}
    </small>
  </div>
</template>

<script>
import {
  date as formatDate,
  time as formatTime
} from '#/formatters'

export default {
  name: 'BaseTimestamp',
  props: {
    created: {
      type: String,
      required: true
    }
  },
  computed: {
    createdText () {
      return [
        this.createdDateFormatted,
        this.createdTimeFormatted
      ].join(' ')
    },
    createdDateFormatted () {
      return formatDate(
        this.created
      )
    },
    createdTimeFormatted () {
      return formatTime(
        this.created
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
