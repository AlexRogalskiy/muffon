<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
      :tagName="tagName"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderSegment from './BaseTagSegmentContainer/HeaderSegment.vue'
import getTag from '#/actions/api/tag/get'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseTagSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    tagName: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  data () {
    return {
      isLoading: false,
      error: null,
      tagData: null,
      topTrackCount: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getTag,
    fetchData (page) {
      this.getTag({
        ...this.tagArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
