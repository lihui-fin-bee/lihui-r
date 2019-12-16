<template>
  <BgCard>
    <div class="teamList">
      <TeamListTable
        v-loading="tableOneLoading"
        title="实时数据监测情况"
        :is-have-actions="false"
        :column-data="columnDataTwo"
        :table-data="currentTeamList"
        :current-page="currentPage"
        :total-num="totalNum"
        :total-page="totalPage"
        @changePage="changePage"
      />
      <TeamWarningList
        v-loading="tableTwoLoading"
        title="超规信息"
        :is-have-actions="true"
        :column-data="columnDataOne"
        :table-data="currentWarningTeamList"
        :warning-current-page="warningCurrentPage"
        :warning-total-num="warningTotalNum"
        :warning-total-page="warningTotalPage"
        @changeWarningPage="changeWarningPage"
      />
    </div>
  </BgCard>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { Loading, Message } from 'element-ui'
import Vue from 'vue'
import BgCard from '../../components/card/BgCard.vue'
import TeamListTable from './components/TeamListTable.vue'
import TeamWarningList from './components/TeamWarningList.vue'

Vue.use(Loading.directive)

export default {
  name: 'TeamList',
  components: {
    BgCard,
    TeamListTable,
    TeamWarningList
  },
  data() {
    return {
      tableOneLoading: false,
      tableTwoLoading: false,
      // 实时数据监测情况
      columnDataTwo: [
        {
          labelName: '序号',
          propName: 'id'
        },
        {
          labelName: '团队',
          propName: 'team'
        },
        {
          labelName: '策略类型',
          propName: 'policyType'
        },
        {
          labelName: '净值',
          propName: 'netValue'
        },
        {
          labelName: '持仓比例',
          propName: 'positionRatio'
        },
        {
          labelName: '敞口率',
          propName: 'exposureRate'
        },
        {
          labelName: '杠杆率',
          propName: 'leverageRatio'
        },
        {
          labelName: '违规品种',
          propName: 'illegalBreeds'
        },
        {
          labelName: '当日收益率',
          propName: 'dailyRateOfReturn'
        },
        {
          labelName: '当日最大回撤',
          propName: 'maximumWithdrawal'
        },
        {
          labelName: '历史累计盈亏',
          propName: 'profitsAndLosses'
        },
        /* 12-9新增 */
        {
          labelName: '夏普率',
          propName: 'sharpeRatio'
        },
        {
          labelName: '波动率',
          propName: 'volatility'
        },
        {
          labelName: '偏度',
          propName: 'skewness'
        },
        {
          labelName: '峰度',
          propName: 'kurtosis'
        }
      ],
      // 超规信息
      columnDataOne: [
        {
          labelName: '更新时间',
          propName: 'updateTime'
        },
        {
          labelName: '团队',
          propName: 'team'
        },
        {
          labelName: '项目',
          propName: 'project'
        },
        {
          labelName: '当前值',
          propName: 'currentValue'
        },
        {
          labelName: '风控阈值',
          propName: 'riskControlThreshold'
        },
        {
          labelName: '风控类型',
          propName: 'riskControlType'
        },
        {
          labelName: '详情',
          propName: 'detail'
        },
        {
          labelName: '操作',
          propName: 'actions'
        }
      ]
    }
  },
  computed: {
    ...mapState('risk/team', [
      'teamList',
      'waringTeamList'
    ]),
    ...mapGetters('risk/team', [
      'currentTeamList',
      'currentPage',
      'totalNum',
      'totalPage',
      'currentWarningTeamList',
      'warningCurrentPage',
      'warningTotalNum',
      'warningTotalPage'
    ])
  },
  async mounted() {
    await this.getCurrentTeamList(1, 10)
    await this.getCurrentWarningTeamList(1, 10)
  },
  methods: {
    ...mapActions('risk/team', [
      'getTeamList',
      'getTeamWarningList'
    ]),
    /*
    接口方法
    */

    // 获取实时监控数局列表
    async getCurrentTeamList(pageNum, pageSize) {
      try {
        this.tableOneLoading = true
        await this.getTeamList({ pageNum, pageSize })
        this.tableOneLoading = false
      } catch {
        Message.error('网络错误')
      }
    },

    // 获取超规信息数据列表
    async getCurrentWarningTeamList(pageNum, pageSize) {
      try {
        this.tableTwoLoading = true
        await this.getTeamWarningList({ pageNum, pageSize })
        this.tableTwoLoading = false
      } catch {
        Message.error('网络错误')
      }
    },
    /*
    非接口方法
    */

    // 上一页 下一页 页数跳转 实时监测数据
    changePage(val) {
      this.getCurrentTeamList(val, 10)
    },

    // 上一页 下一页 页数跳转 超规信息数据
    changeWarningPage(val) {
      this.getCurrentWarningTeamList(val, 10)
    }

  }
}
</script>

<style lang="scss" scoped>
.teamList{
  height: 100%;
  margin: 0 auto;
}
</style>
