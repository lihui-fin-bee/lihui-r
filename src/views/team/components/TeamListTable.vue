<template>
  <Card :title="title">
    <template>
      <P class="title-text">数据更新于 {{ tableData.length !== 0 ? tableData[0].date : '' }}</P>
      <div class="table-container">
        <el-table
          row-class-name="addRowClass"
          :data="tableData"
          @row-click="goDetail"
        >
          <el-table-column
            label=" 序号"
            align="center"
          >
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <af-table-column
            label="  团队    "
            align="center"
            prop="team"
          />
          <af-table-column
            label="策略类型"
            align="center"
            prop="policyType"
          />
          <af-table-column
            label="净值"
            align="center"
            prop="netValue"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.netValue[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.netValue[1])">{{ scope.row.netValue[0] }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="持仓比例"
            align="center"
            prop="positionRatio"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.positionRatio[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.positionRatio[1])">{{ scope.row.positionRatio[0] }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="敞口率"
            align="center"
            prop="exposureRate"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.exposureRate[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.exposureRate[1])">{{ scope.row.exposureRate[0]+'%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="杠杆率"
            align="center"
            prop="leverageRatio"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.leverageRatio[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.leverageRatio[1])">{{ scope.row.leverageRatio[0] }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="违规品种"
            align="center"
            prop="illegalBreeds"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.illegalBreeds === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.illegalBreeds)">
                <span v-for="(item,index) in scope.row.illegalBreeds" :key="index">{{ item }}&nbsp;&nbsp;&nbsp;</span>
              </span>
            </template>
          </af-table-column>
          <af-table-column
            label="当日收益率"
            align="center"
            prop="dailyRateOfReturn"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dailyRateOfReturn[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.dailyRateOfReturn[1])">{{ scope.row.dailyRateOfReturn[0] }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="当日最大回撤"
            align="center"
            prop="maximumWithdrawal"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.maximumWithdrawal[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.maximumWithdrawal[1])">
                {{ scope.row.maximumWithdrawal[0] }}
              </span>
            </template>
          </af-table-column>
          <af-table-column
            label="历史累计盈亏"
            align="center"
            prop="profitsAndLosses"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.profitsAndLosses[0] === '--'">--</span>
              <span v-else :class="spanStyle(scope.row.profitsAndLosses[1])">{{ scope.row.profitsAndLosses[0] }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="夏普率"
            align="center"
            prop="sharpeRatio"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.sharpeRatio === null ? '--' :scope.row.sharpeRatio }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="波动率"
            align="center"
            prop="volatility"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.volatility === null ? '--' :scope.row.volatility + '%' }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="偏度"
            align="center"
            prop="skewness"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.skewness === null ? '--' :scope.row.skewness }}</span>
            </template>
          </af-table-column>
          <af-table-column
            label="峰度"
            align="center"
            prop="kurtosis"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.kurtosis === null ? '--' :scope.row.kurtosis }}</span>
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
  Table, Pagination, Loading, TableColumn
} from 'element-ui'
// import { formatDateOne } from '@utils/tools.js';
// import AFTableColumn from 'af-table-column';
import Card from '../../../components/card/Card.vue'

Vue.use(Loading.directive)
// Vue.use(AFTableColumn);
export default {
  name: 'TeamListTable',
  components: {
    Card,
    'el-table': Table,
    'el-table-column': TableColumn,
    'el-pagination': Pagination
    // 'el-button': Button,
  },
  props: {
    title: {
      type: String
    },
    tableData: {
      type: Array
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
    // 填充色区分
    spanStyle(num) {
      switch (num) {
        case -1:
          return 'spanStyle-zero'
        case 0:
          return 'spanStyle-one'
        case 1:
          return 'spanStyle-two'
        case 2:
          return 'spanStyle-three'
        case 3:
          return 'spanStyle-four'
        case 4:
          return 'spanStyle-five'
        case 5:
          return 'spanStyle-six'
        case 6:
          return 'spanStyle-seven'
        case 7:
          return 'spanStyle-eight'
        default:
          return ''
      }
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
    goDetail(row) {
      this.$router.push({ path: '/team/teamDetail', query: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" >
  .addRowClass{
    cursor: pointer;
  }
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
    color: #606266;
    /*overflow: scroll;*/
  }
  .pagination-container{
    display: flex;
    justify-content: center;
  }
  /*展示不同颜色*/
  .spanStyle-zero{
    width: 100%;
    background: grey;
    color: white;
  }
  .spanStyle-one{
    width: 100%;
    color: #606266;
  }
  .spanStyle-two{
    background: green;
    width: 100%;
    color: white;
  }
  .spanStyle-three{
    background:red;
    width: 100%;
    color: white;
  }
  .spanStyle-four{
    background:cornflowerblue;
    width: 100%;
    color: white;
  }
  .spanStyle-five{
    background:blue;
    width: 100%;
    color: white;
  }
  .spanStyle-six{
    background:palevioletred;
    width: 100%;
    color: white;
  }
  .spanStyle-seven{
    background:rebeccapurple;
    width: 100%;
    color: white;
  }
  .spanStyle-eight{
    background:aqua;
    width: 100%;
    color: white;
  }
</style>
