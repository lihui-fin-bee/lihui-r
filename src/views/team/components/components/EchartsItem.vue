<template>
  <div class="echarts-wrap" :style="{color: titleColor}">
    <div class="echarts-title">{{title}}</div>
    <div v-if="options.series[0].data.length" class="echarts" ref="brokenLineDiagram"></div>
    <div v-else class="echarts none">暂无数据</div>
    <div class="max-avg" v-show="max && options.series[0].data.length">
      <span>MAX: {{max}}{{template}}</span>
      <span>AVG: {{avg}}{{template}}</span>
    </div>
  </div>
</template>

<script>
import Echarts from 'echarts';
import { titleColor } from '../../config/echartsOptions';

export default {
  name: 'EchartsItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
    },
    max: {
      type: String,
      default: '',
    },
    avg: {
      type: String,
      default: '',
    },
    template: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      titleColor,
    };
  },
  methods: {
    initEcharts() {
      if (this.options.series[0].data.length) {
        this.echart = Echarts.init(this.$refs.brokenLineDiagram);
        this.echart.clear();
        const echartOption = this.options;
        this.echart.setOption(echartOption);
      }
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  height: 260px;
  background: #212124;
  padding: 10px 0;

  .echarts-title {
    text-align: center;
  }

  .echarts {
    width: 90%;
    margin: 0 auto;
    flex: 1;

    &.none{
      color:#ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .max-avg{
    width: 100%;
    display: flex;
    font-size: 20px;
    justify-content: space-around;

    span{
      transform: scale(0.5);
    }
  }
}
</style>
