<template>
  <BgCard>
    <div class="container">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="addNew"
        @click="addNew"
      >添加</el-button>
      <RiskControlList
        title="风控指标"
        :column-data="columnData"
        :table-data="currentRiskControlList"
        :is-have-actions="true"
        :current-page="currentPage"
        :total-num="totalNum"
        :total-page="totalPage"
        @productNum="modifyClick"
        @changePage="changePage"
      />
      <TableDialog :id="id" :is-visible="dialogVisible" title="风控指标" :edit-type="editType" @closeDialog="closeDialog" />
    </div>
  </BgCard>
</template>

<script>
import { Button } from 'element-ui'
import { mapActions, mapState, mapGetters } from 'vuex'
import RiskControlList from './components/RiskControlList.vue'
import TableDialog from '../components/dialog/TableDialog.vue'
import BgCard from '../../components/card/BgCard.vue'

export default {
  name: 'IndicatorsMaintenance',
  components: {
    RiskControlList,
    TableDialog,
    BgCard,
    'el-button': Button
  },
  data() {
    return {
      id: null, // 查询详情的id
      editType: '',
      dialogVisible: false,
      defaultPageSize: 10,
      //  风控指标列名
      columnData: [
        {
          labelName: '产品编号',
          propName: 'productNum'
        },
        {
          labelName: '产品名称',
          propName: 'productName'
        },
        {
          labelName: '仓位权重',
          propName: 'positionWeight'
        },
        {
          labelName: '总敞口率',
          propName: 'currencyExposureRate'
        },
        {
          labelName: '总杠杆率',
          propName: 'totalLeverageRatio'
        },
        {
          labelName: '交易币种范围',
          propName: 'rangeOfCurrenciesTraded'
        },
        {
          labelName: '年化收益率',
          propName: 'ageReturnRate'
        },
        {
          labelName: '当日收益率',
          propName: 'yieldOfTheDay'
        },
        {
          labelName: '当日最大回撤',
          propName: 'retreatRatio'
        },
        {
          labelName: '累计盈亏值',
          propName: 'accumulatedProfitAndLossValue'
        }
      ],
      productId: 0 // productId(弹窗props）
    }
  },
  methods: {
    ...mapActions('risk/indicator', [
      'getRiskControlList'
    ]),

    // 添加按钮
    addNew() {
      this.editType = 'add'
      this.dialogVisible = true
      this.id = null
    },
    // 修改按钮
    modifyClick(value) {
      this.editType = 'modify'
      this.id = value.id
      this.dialogVisible = true
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = !val.isCloseDialog
      // 重新加载
      if (val.isReload) {
        this.getCurrentRiskControlList(this.currentPage, this.defaultPageSize)
      }
    },
    // 获取数据列表
    async getCurrentRiskControlList(pageNum, pageSize) {
      await this.getRiskControlList({ pageNum, pageSize })
    },
    // 上一页 下一页 页数跳转 实时监测数据
    changePage(val) {
      this.currentPage = this.val
      this.getCurrentRiskControlList(val, this.defaultPageSize)
    }
  },
  computed: {
    ...mapState('risk/indicator', [
      'riskControlList'
    ]),
    ...mapGetters('risk/indicator', [
      'currentRiskControlList',
      'currentPage',
      'totalNum',
      'totalPage'
    ])
  },
  mounted() {
    this.getCurrentRiskControlList(1, 10)
  }
}
</script>

<style lang="scss" >
  .container{
    width: 98%;
    height: 100%;
    background-color: white;
    /*padding:20px 0 0 10px;*/
    margin: 20px auto 0;
    box-sizing: border-box;
    .addNew{
      margin-left: 20px;
    }
    /*item的margin设置*/
    .el-form-item__label{
      width: 120px!important;
    }
  }
</style>
