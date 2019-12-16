<template>
  <div class="bg-trend_analysis-wrap">
    <div class="bg-trend_analysis-title">趋势分析</div>
    <div class="bg-trend_analysis-con">
      <div class="bg-trend_analysis-con-top">
        <EchartsItem
          class="item"
          v-for="(echarItem, key) in topEchartsList"
          :key="key"
          :options="echarItem.options"
          :title="echarItem.title"
          :max="echarItem.max"
          :avg="echarItem.avg"
          :template="echarItem.template ? echarItem.template : ''"
          @resize-echarts="resizeEcharts"
        />
      </div>
      <div class="bg-trend_analysis-con-bottom">
        <EchartsItemTwo
          class="item"
          v-for="(echarItem,key) in bottomEchartsList"
          :key="key"
          :options="echarItem.option"
          :title="echarItem.title"
          @resize-echarts="resizeEcharts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import EchartsItem from './components/EchartsItem.vue';
import EchartsItemTwo from './components/EchartsItemTwo.vue';
import { brokenLineDiagramOptions, brokenLineDiagramOptionsOne } from '../config/echartsOptions';
import * as Series from '../config/formatSeries';

const { mapGetters } = createNamespacedHelpers('risk/team');

export default {
  name: 'TrendAnalysis',
  components: {
    EchartsItem,
    EchartsItemTwo,
  },
  data() {
    return {
      topEchartsList: [],
      bottomEchartsList: [],
      legendData: [
        ['净杠杆', '多单杠杆', '空单杠杆'],
        [],
        ['累计盈亏'],
        ['', '正收益', '正收益', '负收益', '负收益'],
      ],
      tooltipOptions: ['stack', '', 'bar', 'waterfall'],
      echartsArr: [],
    };
  },
  computed: {
    ...mapGetters(['trendAnalysisMin', 'trendAnalysis']),
  },
  watch: {
    trendAnalysisMin(value) {
      this.topEchartsList = value.map((item, key) => ({
        title: item.name,
        max: item.max,
        avg: item.avg,
        template: item.template,
        // eslint-disable-next-line max-len
        options: brokenLineDiagramOptions(this.echartsData(item.list, key, item.template, item.isPositive, item.isNegative), item.rule, item.isNegative),
      }));
    },
    trendAnalysis(value) {
      this.legendData[1] = value[1].list.x0;
      this.bottomEchartsList = value.map((item, index) => ({
        title: item.name,
        option: brokenLineDiagramOptionsOne({
          X: index < 2,
          legendData: this.legendData[index],
          series: this.formatSeries(item, index),
          data: index < 2 ? item.list.y : item.list.x,
          tooltipOptions: this.tooltipOptions[index],
          template: item.template,
          boundaryGap: index !== 2,
        }),
      }));
    },
    echartsArr(value) {
      this.$emit('resize', value);
    },
  },
  methods: {
    formatSeries(data, index) {
      const newData = JSON.parse(JSON.stringify(data.list));
      let datas = [];
      delete newData.x;
      delete newData.x0;
      delete newData.y;
      if (index === 3) {
        datas = [[...newData.y0], [...newData.y1], [...newData.y2], [...newData.y3],
          [...newData.y4]].map((item, key) => ({
          name: this.legendData[index][key],
          data: item,
        }));
      } else {
        datas = Object.values(newData).map((item, key) => ({
          name: this.legendData[index][key],
          data: item,
        }));
      }

      if (index === 0) {
        return Series.formatMarginSeries([
          {
            name: '净杠杆',
            data: newData.x3,
          },
          {
            name: '多单杠杆',
            data: newData.x2,
          },
          {
            name: '空单杠杆',
            data: newData.x1.map(item => (Math.abs(item) === 0 ? item : `-${item}`)),
          },
        ]);
      }

      if (index === 1) {
        return Series.formatCurrenciesSeries(datas);
      }

      if (index === 2) {
        return Series.formatPnlSeries(datas);
      }
      return Series.formatIncomeSeries(datas);
    },
    echartsData(data, key, template, isPositive, isNegative) {
      const yData = data.map(item => item.y);
      const max = Math.max.apply(null, yData);
      const min = Math.min.apply(null, yData);
      const maxs = max + (max - min) * 0.5;
      const maxss = max + (max - min) * 0.9;
      const mins = min - (max - min) * 0.3;
      const navMaxs = max + (max - min) * 2;
      const navMins = min - (max - min) * 2.4;
      return {
        xData: data.map(item => item.x),
        allData: data.map(item => [item.x * 1, item.y]),
        yData,
        template,
        // eslint-disable-next-line no-nested-ternary
        max: isNegative ? 0 : isPositive ? maxss === 0 ? maxss + 4 : maxss : maxs === mins ? maxs === 0 ? maxs + 1 : maxs + Math.abs(maxs) : maxs,
        // eslint-disable-next-line no-nested-ternary
        min: isPositive ? 0 : (maxs === mins ? maxs === 0 ? mins - 1 : mins - Math.abs(mins) : mins),
        navMax: navMaxs === navMins ? navMaxs + Math.abs(navMaxs) : navMaxs,
        navMin: navMaxs === navMins ? navMins - Math.abs(navMins) : navMins,
        dayMin: min,
        dayMax: max,
      };
    },
    resizeEcharts(echarts) {
      this.echartsArr.push(echarts);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-trend_analysis-wrap {
  width: 100%;

  .bg-trend_analysis-title {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    padding: 30px 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
  }

  .bg-trend_analysis-con {
    padding-top: 30px;

    .bg-trend_analysis-con-top,
    .bg-trend_analysis-con-bottom {
      display: flex;
      flex-wrap: wrap;
    }

    .bg-trend_analysis-con-top {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .item {
        width: 23%;
        margin: 0 15px 50px;
      }
    }

    .bg-trend_analysis-con-bottom {
      display: flex;
      justify-content: center;

      .item {
        width: 48%;
        margin-bottom: 70px;
      }
    }
  }
}
</style>
