<template>
  <div class="bg-team-info">
    <div class="bg-team-info-left">
      <div class="bg-team-info-title"><span>{{teamInfo.teamName}}</span> - {{teamInfo.administrator}}</div>
      <ul class="bg-team-info-detail">
        <li>
          <div>当前净值</div>
          <div>{{teamInfo.currentNav ? teamInfo.currentNav : '0.0000'}}</div>
        </li>
        <li>
          <div>初始规模</div>
          <div>{{teamInfo.initSize ? teamInfo.initSize : '0.0000'}}</div>
        </li>
        <li>
          <div>当前规模</div>
          <div>{{teamInfo.currentSize ? teamInfo.currentSize : '0.0000'}}</div>
        </li>
        <li>
          <div>仓位权重</div>
          <div>{{teamInfo.positionWeight}}%</div>
        </li>
        <li>
          <div>策略类型</div>
          <div>{{teamInfo.strategyType}}</div>
        </li>
        <!--12/9新增-->
        <li>
          <div>夏普率</div>
          <div>{{teamInfo.sharpeRatio !== null ? teamInfo.sharpeRatio : '--'}}</div>
        </li>
        <li>
          <div>偏度</div>
          <div>{{teamInfo.skewness !== null ? teamInfo.skewness : '--'}}</div>
        </li>
        <li>
          <div>峰度</div>
          <div>{{teamInfo.kurtosis !== null ? teamInfo.kurtosis : '--'}}</div>
        </li>
        <li>
          <div>波动率</div>
          <div>{{teamInfo.volatility !== null ? teamInfo.volatility + '%': '--'}}</div>
        </li>
      </ul>
    </div>
    <div class="bg-team-info-right">
    <Dashboard
      v-for="(dashboard,key) in teamDashboard"
      :key="key" :title="dashboard.title"
      :template="dashboard.template ? dashboard.template : ''"
      :value="dashboard.value"
      :id="dashboard.id"
      :index="key"
      @resize-echarts="resizeEcharts"
      :threshold="dashboard.threshold"
      :warn="dashboard.warn" />
  </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Dashboard from './components/Dashboard.vue';

const { mapGetters, mapState } = createNamespacedHelpers('risk/team');

export default {
  name: 'TeamInfo',
  components: {
    Dashboard,
  },
  data() {
    return {
      echartsArr: [],
    };
  },
  computed: {
    ...mapState(['teamDetailInfo']),
    ...mapGetters(['teamInfo', 'teamDashboard']),
  },
  watch: {
    echartsArr(value) {
      this.$emit('resize', value);
    },
  },
  methods: {
    resizeEcharts(echarts) {
      this.echartsArr.push(echarts);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-team-info {
  width: 100%;
  display: flex;

  .bg-team-info-left {
    .bg-team-info-title {
      padding: 30px 40px;
      font-size: 18px;

      span {
        font-weight: bolder;
      }
    }

    .bg-team-info-detail {
      border-top: #cccccc solid 1px;
      width: 700px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      list-style: none;
      margin: 0;
      padding: 30px 0 20px 30px;

      li {
        width: 20%;
        font-size: 18px;
        margin-bottom: 20px;
        >div{
          text-align: center;
        }

        div:nth-child(1) {
          color: #888888;
          margin-bottom: 20px;
          font-size: 14px;
        }
      }
    }
  }

  .bg-team-info-right {
    padding-left: 40px;
    padding-top: 40px;
  }
}
</style>
