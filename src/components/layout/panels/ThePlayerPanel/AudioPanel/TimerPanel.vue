<template>
  <div class="player-timer">
    {{ audioTime }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { seconds as formatSeconds } from '#/formatters'

export default {
  name: 'TimerPanel',
  computed: {
    ...mapState('audio', {
      audioCurrentTime: 'currentTime',
      audioDuration: 'duration'
    }),
    audioTime () {
      return [
        this.audioCurrentTimeSeconds,
        this.audioDurationSeconds
      ].join(' / ')
    },
    audioCurrentTimeSeconds () {
      return formatSeconds(
        this.audioCurrentTime
      )
    },
    audioDurationSeconds () {
      return formatSeconds(
        this.audioDuration
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.player-timer
  @extend .d-flex, .align-items-center, .cursor-default
  flex: 0.25
</style>
