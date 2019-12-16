<template>
  <Card :title="title">
    <template>
      <div class="table-container">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
        >
          <af-table-column
            label="产品编号"
            align="center"
            prop="productNum"
          />
          <af-table-column
            align="center"
            label="产品名称"
            prop="productName"
          />
          <af-table-column
            align="center"
            label="仓位权重"
            prop="positionWeight"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.positionWeight === null">--</span><span v-else class="text-right">{{ scope.row.positionWeight+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="总敞口率"
            prop="currencyExposureRate"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.currencyExposureRate === null">--</span><span v-else class="text-right">{{ scope.row.currencyExposureRate+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="总杠杆率"
            prop="totalLeverageRatio"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.totalLeverageRatio === null">--</span><span v-else class="text-right">{{ scope.row.totalLeverageRatio }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="交易币种范围"
            prop="rangeOfCurrenciesTraded"
          >
            <template v-if="scope.row.rangeOfCurrenciesTraded.length!==0" slot-scope="scope">
              <span v-for="(item,index) in scope.row.rangeOfCurrenciesTraded" :key="index" class="list-span">{{ item }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="年化收益率"
            prop="ageReturnRate"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.ageReturnRate === null">--</span><span v-else class="text-right">{{ scope.row.ageReturnRate+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="当日收益率"
            prop="yieldOfTheDay"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.yieldOfTheDay === null">--</span><span v-else class="text-right">{{ scope.row.yieldOfTheDay+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="当前回撤"
            prop="retreatRatio"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.retreatRatio === null">--</span><span v-else class="text-right">{{ scope.row.retreatRatio+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            label="历史累计盈值"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.accumulatedProfitAndLossValue === null">--</span><span v-else class="text-right">{{ scope.row.accumulatedProfitAndLossValue }}</span>
            </template>
          </af-table-column>
          <af-table-column
            v-if="isHaveActions"
            align="center"
            label="操作"
            prop="actions"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="gotoDetail(scope.row)">详情</el-button><el-button type="text" @click="modifyClick(scope.row,true)">修改</el-button>
            </template>
          </af-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          background
          :page-size="10"
          :pager-count="7"
          layout="prev, pager, next,total, jumper"
          :total="totalNum"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </Card>
</template>

<script>
import Vue from 'vue'
import { isArray } from 'lodash'
import {
  Table, Pagination, Loading, Button
} from 'element-ui'
// import { formatDateOne } from '@utils/tools.js';
// import AFTableColumn from 'af-table-column';

import { mapGetters } from 'vuex'
import Card from '../../../components/card/Card.vue'

Vue.use(Loading.directive)
// Vue.use(AFTableColumn);
export default {
  name: 'TeamListTable',
  components: {
    Card,
    'el-table': Table,
    'el-pagination': Pagination,
    'el-button': Button
  },
  props: {
    title: {
      type: String
    },
    columnData: {
      type: Array
    },
    isHaveActions: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number
    },
    totalNum: {
      type: Number
    },
    totalPage: {
      type: Number
    }
  },
  data() {
    return {
      tableLoading: true
    }
  },
  computed: {
    ...mapGetters('risk/indicator', [
      'currentRiskControlList'
    ]),
    tableData() {
      return this.currentRiskControlList
    }
  },
  watch: {
    tableData() {
      if (this.tableData.length > 0) {
        this.tableLoading = false
      }
    }
  },
  methods: {
    /* 表格中改变改变样式的方法 */
    tableRowClassName({ row, rowIndex }) {
      console.log(row)
      if (rowIndex === 1) {
        return 'warning-row'
      } if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    /* loadash */
    localIsArray(type) {
      return isArray(type)
    },
    // 页码改变
    handleCurrentChange(val) {
      this.tableLoading = true
      this.$emit('changePage', val)
    },
    /* 页面事件 */
    // 点击修改
    modifyClick(rowData) {
      this.$emit('productNum', { id: rowData.productNum })
    },
    // 跳转详情页面
    gotoDetail(rowData) {
      this.$router.push({
        name: 'IndicatorsDetail',
        query: { id: rowData.productNum }
      })
    }
  }
}
</script>

<style lang="scss" >
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .title-text{
    margin: 0;
    padding: 20px 0 0 20px;
    font-size: 15px;
  }
  .table-container{
    /*max-width: 1500px;*/
    padding: 10px 20px 20px;
    /*overflow: scroll;*/
  }
  .pagination-container{
    display: flex;
    justify-content: center;
  }
   /*币种列表样式*/
  .list-span{
    padding:0 3px;
  }

  .text-right{
    display: inline-block;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    /*padding-right: 35px;*/
  }

</style>
