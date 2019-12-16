<template>
  <div class="table-wrap">
    <bg-table :data="data" v-loading="tableLoading">
      <table-column
        v-for="(item,key) in options"
        :key="key"
        align="center"
        :prop="item.propName"
        :label="item.labelName"
      >
       <template  slot-scope="scope">
         <span
           :class="[key === 5 ? `color${scope.row.margin_rate_color}` : '']"
         >{{scope.row[options[key].propName]}}</span>
       </template>
      </table-column>
    </bg-table>
    <div class="pagination">
      <pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, total, jumper"
        :total="totalNum"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Table, TableColumn, Pagination } from 'element-ui';

const { mapActions, mapGetters } = createNamespacedHelpers('risk/team');

export default {
  name: 'HoldDetailed',
  components: {
    'bg-table': Table,
    TableColumn,
    Pagination,
  },
  data() {
    return {
      tableLoading: true,
      options: [
        {
          propName: 'currency_type',
          labelName: '品种',
        },
        {
          propName: 'trade_type',
          labelName: '多空',
        },
        {
          propName: 'transaction_amount',
          labelName: '合约价值 (USD)',
        },
        // {
        //   propName: 'account_name',
        //   labelName: '子账户名称',
        // },
        {
          propName: 'exchange_type',
          labelName: '交易所',
        },
        {
          propName: 'transaction_type',
          labelName: '类型',
        },
        {
          propName: 'margin_rate',
          labelName: '保证金率',
        },
        {
          propName: 'holding_rate',
          labelName: '持仓比例',
        },
        // {
        //   propName: 'holding_pnl',
        //   labelName: '持仓盈亏',
        // },
      ],
      data: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
    };
  },
  computed: {
    ...mapGetters(['teamHoldInfoList', 'teamHoldInfoListTotalNum']),
  },
  mounted() {
    this.tableLoading = true;
    this.getList();
  },
  watch: {
    teamHoldInfoList(newData) {
      this.data = newData;
    },
  },
  methods: {
    ...mapActions(['getTeamHoldInfo']),
    async getList() {
      try {
        // eslint-disable-next-line max-len
        await this.getTeamHoldInfo({ pageNum: this.currentPage, pageSize: this.pageSize, teamId: this.$route.query.id || 1 });
        this.totalNum = this.teamHoldInfoListTotalNum.totalNum;
        this.tableLoading = false;
      } catch (e) {
        throw e;
      }
    },
    // 页码改变
    handleCurrentChange(val) {
      if (val !== this.currentPage) {
        this.currentPage = val;
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  .color0 {
    color: black;
  }
  .color1 {
    color: white;
    background: orange;
  }
  .color2 {
    color: white;
    background: red;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }
}
</style>
