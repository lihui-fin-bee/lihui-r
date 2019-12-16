<template>
  <div ref="risk-detail" class="wrapper">
    <div class="team-bg-wrap">
      <team-info @resize="onResize" />
      <trend-analysis @resize="onResize" />
      <team-detailed />
      <warning-record />
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { createNamespacedHelpers } from 'vuex'
import TeamInfo from './components/TeamInfo.vue'
import TrendAnalysis from './components/TrendAnalysis.vue'
import TeamDetailed from './components/TeamDetailed.vue'
import WarningRecord from './components/WarningRecord.vue'

const { mapActions } = createNamespacedHelpers('risk/team')

export default {
  name: 'TeamDetail',
  components: {
    TeamInfo,
    TrendAnalysis,
    TeamDetailed,
    WarningRecord
  },
  methods: {
    ...mapActions(['getTeamDetailInfo']),
    onResize(arr) {
      this.arr = [...this.arr, ...arr]
    }
  },
  data() {
    return {
      loading: true,
      arr: []
    }
  },
  async mounted() {
    this.pageLoading = Loading.service({
      target: this.$refs['risk-detail'],
      lock: true, // 是否锁屏
      text: '正在加载...' // 加载动画的文字
    })
    this.loading = true
    try {
      await this.getTeamDetailInfo(this.$route.query.id || 2)
      this.loading = false
      this.pageLoading.close()
    } catch (e) {
      console.log(e)
    }
    window.onresize = () => {
      this.arr.forEach((item) => {
        if (item) item.resize()
      })
    }
  }
}
</script>

<style lang="scss">
  .wrapper{
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #f0f2f5;

    .team-bg-wrap {
      border-radius: 5px;
      background: #ffffff;
      overflow: auto;
    }

    .el-loading-mask{
      .el-loading-spinner{
        top: 50vh;
        transform: translateY(-100%);
      }
    }
  }

</style>
