<template>
  <div class="echarts-wrap">
    <div class="echarts-title" :style="{color: titleColor}">{{title}}</div>
    <div v-if="isShow" class="echarts" ref="brokenLineDiagram"></div>
    <div v-else class="echarts none" :style="{color: titleColor}">暂无数据</div>
  </div>
</template>

<script>
import Echarts from 'echarts';
import { titleColor } from '../../config/echartsOptions';

export default {
  name: 'EchartsItemTwo',
  data() {
    return {
      titleColor,
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      // required: true,
    },
  },
  methods: {
    initEcharts() {
      if (this.isShow) {
        this.echart = Echarts.init(this.$refs.brokenLineDiagram);
        this.echart.clear();
        const echartOption = this.options;
        this.echart.setOption(echartOption);
      }
    },
  },
  computed: {
    isShow() {
      return (this.options.series[0] && this.options.series[0].data.length) || (this.options.yAxis[0].data && this.options.yAxis[0].data.length);
    },
  },
  async mounted() {
    await this.initEcharts();
    this.$emit('resize-echarts', this.echart);
  },
};
</script>

<style lang="scss" scoped>
.echarts-wrap {
  height: 350px;
  font-size: 14px;
  background: #212124;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  position: relative;

  .echarts-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .echarts{
    flex: 1;
    width: 95%;
    margin: 0 auto;

    &.none{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
