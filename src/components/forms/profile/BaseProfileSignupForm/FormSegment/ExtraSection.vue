<template>
  <div class="extra-section">
    <BaseProfileImageField
      class="image-field"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseProfileGenderField />

      <BaseProfileBirthdateField />

      <BaseProfileCountryField />

      <BaseProfileCityField />

      <div></div>
    </div>
  </div>
</template>

<script>
import BaseProfileImageField
  from '@/fields/profile/BaseProfileImageField.vue'
import BaseProfileGenderField
  from '@/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '@/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '@/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '@/fields/profile/BaseProfileCityField.vue'

export default {
  name: 'ExtraSection',
  components: {
    BaseProfileImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField
  },
  emits: [
    'imageChange'
  ],
  methods: {
    handleImageChange (value) {
      this.$emit(
        'imageChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  @extend .d-flex

.image-field
  width: 120px
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
