<template>
  <div class="content">
    <div class="header">
      <BaseButton
        :text="clearText"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </div>

    <div v-if="isSuccess">
      <i class="check green icon"></i>
      <span>
        {{ clearedText }}
      </span>
    </div>
  </div>
</template>

<script>
import local from '&/local'
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'ClearSearchHistoryOption',
  components: {
    BaseButton
  },
  data () {
    return {
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    clearText () {
      return this.$t(
        'settings.options.app.data.history.search.clear'
      )
    },
    clearedText () {
      return this.$t(
        'settings.options.app.data.history.search.cleared'
      )
    }
  },
  methods: {
    async handleClick () {
      this.isSuccess = false
      this.isLoading = true

      await this.clearHistory()

      this.isSuccess = true
      this.isLoading = false
    },
    clearHistory () {
      local.delete(
        'history.search'
      )
      local.delete(
        'history.librarySearch'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
