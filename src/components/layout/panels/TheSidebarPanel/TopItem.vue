<template>
  <BaseSidebarItem
    icon="arrow alternate circle up"
    :text="topText"
    :link="topLink"
  />
</template>

<script>
import BaseSidebarItem from '@/BaseSidebarItem.vue'
import { main as formatTopMainLink } from '#/formatters/links/top'

export default {
  name: 'TopItem',
  components: {
    BaseSidebarItem
  },
  computed: {
    topText () {
      return this.$t(
        'navigation.tops'
      )
    },
    topLink () {
      return formatTopMainLink()
    }
  }
}
</script>

<style lang="sass" scoped></style>
