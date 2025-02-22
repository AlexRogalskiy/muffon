<template>
  <BaseModalContainer ref="modal">
    <div class="content main-modal-content-full-height">
      <div class="top-section-container">
        <SearchInput
          ref="input"
          :tracks="tracks"
          :playlistId="playlistId"
          @select="handleSelect"
        />

        <BaseClearButton
          v-if="!isReset"
          class="reset-button"
          @click="handleResetButtonClick"
        />
      </div>

      <BaseDivider />

      <ImportSection
        v-if="isImport"
        :tracks="tracks"
        @change="handleChange"
        @save="handleSave"
      />
      <SaveSection
        v-else-if="isSave"
        :playlistId="playlistId"
        :tracks="tracks"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import SearchInput from './BasePlaylistSearchImportModal/SearchInput.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import ImportSection from './BasePlaylistSearchImportModal/ImportSection.vue'
import SaveSection from './BasePlaylistSearchImportModal/SaveSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'BasePlaylistSearchImportModal',
  components: {
    BaseModalContainer,
    SearchInput,
    BaseClearButton,
    BaseDivider,
    ImportSection,
    SaveSection
  },
  provide () {
    return {
      hideModal: this.hide,
      setTracks: this.setTracks
    }
  },
  props: {
    playlistId: String
  },
  data () {
    return {
      isReset: true,
      tracks: [],
      status: 'import'
    }
  },
  computed: {
    isImport () {
      return (
        this.status === 'import' &&
          this.tracks.length
      )
    },
    isSave () {
      return (
        this.status === 'save' &&
          this.tracks.length
      )
    }
  },
  methods: {
    handleSelect (value) {
      if (this.status === 'save') {
        this.reset()
      }

      this.tracks.push({
        uuid: generateKey(),
        ...value
      })

      this.isReset = false
    },
    handleChange (value) {
      this.tracks = [...value]
    },
    handleResetButtonClick () {
      this.reset()

      this.$refs.input.clear()
      this.$refs.input.focus()

      this.isReset = true
    },
    handleSave () {
      this.status = 'save'
    },
    reset () {
      this.status = 'import'

      this.tracks = []
    },
    show () {
      this.$refs.modal.show()
      this.$refs.input.focus()
    },
    hide () {
      this.$refs.modal.hide()
    },
    setTracks (value) {
      this.tracks = value
    }
  }
}
</script>

<style lang="sass" scoped>
.top-section-container
  @extend .d-flex, .align-items-center

.reset-button
  margin-left: 1em !important
</style>
