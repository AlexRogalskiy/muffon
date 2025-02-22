<template>
  <BasePageContainer
    :isShowLoader="!communityData"
    :isLoading="isLoading"
    :isError="!communityData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="communityData"
      :isLoading="isLoading"
      :error="error"
      :communityData="communityData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatCommunityPageNavigation
  from '#/formatters/navigation/community'
import formatCommunityPageTab from '#/formatters/tabs/community'
import getCommunity from '#/actions/api/community/get'

export default {
  name: 'BaseCommunityPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setCommunityData: this.setCommunityData
    }
  },
  props: {
    communityId: String
  },
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatCommunityPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        communityId: this.communityId,
        communityTitle: this.communityTitleFetched
      }
    },
    tabData () {
      return formatCommunityPageTab(
        this.navigationData
      )
    },
    communityTitleFetched () {
      return this.communityData?.title
    },
    communityArgs () {
      return {
        communityId: this.communityId
      }
    }
  },
  watch: {
    communityData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.fetchData()
    },
    getCommunity,
    fetchData () {
      this.getCommunity(
        this.communityArgs
      )
    },
    setCommunityData (value) {
      this.communityData = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
