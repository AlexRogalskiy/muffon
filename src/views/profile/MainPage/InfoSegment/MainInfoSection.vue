<template>
  <div class="main-profile-page-info">
    <BaseImage
      class="main-profile-page-image circular bordered"
      model="profile"
      :image="imageData?.medium"
    />

    <BaseHeader
      tag="h3"
      :text="nickname"
    />

    <BaseProfileOnlineLabel
      class="online-label"
      :profileData="profileData"
    />

    <BaseLabel
      v-if="isStaff"
      class="primary role-label"
      :text="roleText"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseProfileOnlineLabel
  from '@/models/profile/BaseProfileOnlineLabel.vue'
import BaseLabel from '@/BaseLabel.vue'

export default {
  name: 'MainInfoSection',
  components: {
    BaseImage,
    BaseHeader,
    BaseProfileOnlineLabel,
    BaseLabel
  },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.profileData.image
    },
    nickname () {
      return this.profileData.nickname
    },
    isStaff () {
      return this.role === 'creator'
    },
    role () {
      return this.profileData.role
    },
    roleText () {
      return this.$t(
        `roles.${this.role}`
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px

.online-label
  margin-top: 0.5em

.role-label
  margin-top: 0.5em
</style>
