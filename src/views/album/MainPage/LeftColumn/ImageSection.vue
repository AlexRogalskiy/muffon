<template>
  <div class="main-image-container">
    <BaseImage
      class="rounded bordered album-image"
      model="album"
      :image="imageData?.medium"
      @click="handleImageClick"
    />

    <BaseAlbumImageModal
      :image="imageData?.original"
      @init="handleModalInit"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import BaseAlbumImageModal from '@/modals/album/BaseAlbumImageModal.vue'
import { showModal } from '#/actions/plugins/semantic'

export default {
  name: 'ImageSection',
  components: {
    BaseImage,
    BaseAlbumImageModal
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: null
    }
  },
  computed: {
    imageData () {
      return this.albumData.image
    }
  },
  methods: {
    handleModalInit (el) {
      this.modal = el
    },
    handleImageClick () {
      showModal(this.modal)
    }
  }
}
</script>

<style lang="sass" scoped>
.album-image
  @extend .cursor-zoom-in, .object-fit-cover
</style>
