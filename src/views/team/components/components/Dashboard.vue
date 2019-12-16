<template>
  <div class="dashboard-wrap">
    <div class="dashboard-title" :style="{color: titleColor}">{{title}}</div>
    <div v-show="!isShow" class="dashboard" ref="dashboard" id="dashboard"></div>
    <span class="normal" :style="{color: dashboardColor[0]}">正常</span>
    <span v-show="!isShow" class="template" :style="{color: textColor}">{{value}}{{template}}</span>
    <span class="over" :style="{color: dashboardColor[2]}">超规</span>
    <div v-show="isShow" class="img" >暂无数据</div>
  </div>
</template>

<script>
import { isNull } from 'lodash';
import Echarts from 'echarts';
import { titleColor, dashboardColor, dashboardOptions } from '../../config/echartsOptions';


export default {
  name: 'Dashboard',
  props: {
    index: {},
    title: {
      type: String,
      default: '标题',
    },
    value: {
      type: String,
      default: '0',
    },
    warn: { // 预警值
      type: String,
      default: '0',
    },
    threshold: { // 阈值
      type: String,
      default: '0',
    },
    template: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      titleColor,
      dashboardColor,
    };
  },
  async mounted() {
    await this.initEcharts();
    this.$emit('resize-echarts', this[this.echartDashboardID]);
  },
  watch: {
    valueText() {
      this.initEcharts();
    },
  },
  computed: {
    textColor() { // 文字颜色
      const [normal, warn, threshold] = dashboardColor;
      if (this.valueText === '50') {
        return warn;
      }
      if (this.valueText === '85') {
        return threshold;
      }
      return normal;
    },
    valueText() { // 更改指针
      const newValue = Math.abs(this.value * 1);
      if (newValue >= this.threshold * 1) {
        return '85';
      }
      if (newValue >= this.warn * 1) {
        return '50';
      }
      return '15';
    },
    echartDashboardID() {
      return `echartDashboard${this.id}`;
    },
    isShow() {
      return isNull(this.value);
    },
  },
  methods: {
    initEcharts() {
      this[this.echartDashboardID] = Echarts.init(this.$refs.dashboard);
      this[this.echartDashboardID].clear();
      const echartOption = dashboardOptions(this.valueText);
      this[this.echartDashboardID].setOption(echartOption);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-wrap {
  display: inline-block;
  margin: 20px 10px;
  position: relative;
  background: #212124;
  width: 180px;
  height: 140px;
  font-size: 14px;
  padding: 10px 0;
  box-sizing: border-box;

  .dashboard-title {
    text-align: center;
  }

  .dashboard {
    width: 100%;
    height: 110px;
    box-sizing: border-box;
    padding-top: 10px;
  }

  .normal,
  .template,
  .over{
    position: absolute;
    font-size: 12px;
    bottom: 10%;
    z-index: 10;
  }

  .normal{
    left: 10%;
  }

  .template {
    left: 50%;
    transform: translateX(-50%);
  }

  .over{
    right: 10%;
  }

  .img{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 25px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 11;
    background: #212124;
    color: #888888;
  }
}
</style>
