<template>
  <div class="ui labels large">
    <BaseLabel
      v-if="release_date"
      icon="calendar outline"
      :text="release_date"
    />

    <template v-if="labels">
      <BaseLabel
        v-for="labelData in labelsCollection"
        :key="labelData.uuid"
        :text="labelData.name"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '@/BaseLabel.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseAlbumReleaseDateLabels',
  components: {
    BaseLabel
  },
  props: {
    release_date: String,
    labels: Array
  },
  computed: {
    labelsCollection () {
      return formatCollection(
        this.labels
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
