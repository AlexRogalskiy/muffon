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
import { ipcRenderer } from 'electron'
import BaseButton from '@/buttons/BaseButton.vue'

export default {
  name: 'ClearCacheOption',
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
        'settings.options.app.data.cache.clear'
      )
    },
    clearedText () {
      return this.$t(
        'settings.options.app.data.cache.cleared'
      )
    }
  },
  methods: {
    handleClick () {
      this.isSuccess = false
      this.isLoading = true

      const handleSuccess = () => {
        this.isSuccess = true
      }

      const handleFinish = () => {
        this.isLoading = false
      }

      ipcRenderer.invoke(
        'clear-cache'
      ).then(
        handleSuccess
      ).finally(
        handleFinish
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
