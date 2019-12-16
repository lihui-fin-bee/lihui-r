<template>
  <div class="table-wrap">
    <bg-table :data="data" v-loading="tableLoading">
      <table-column
        align="center"
        prop="orderId"
        label="订单号"
        min-width='!0%'
      />
      <af-table-column
        align="center"
        prop="time"
        label="时间"
        min-width='110%'
      />
      <table-column
         v-for="(item,key) in options"
        :key="key"
        align="center"
         min-width='!0%'
        :prop="item.propName"
        :label="item.labelName"
      />
      <af-table-column
        align="center"
        prop="sonName"
        min-width='!0%'
        label="子账户名称"
      />
      <af-table-column
        align="center"
        prop="exchange"
        label="交易所"
        min-width='!0%'
      />
      <af-table-column
        align="center"
        prop="tradeType"
        label="交易类型"
        min-width='!0%'
      />
    </bg-table>
    <div class="pagination">
      <pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="prev, pager, next, total, jumper"
        :total="data.length"
      />
    </div>
  </div>
</template>

<script>
import {
  Table, TableColumn, Pagination,
} from 'element-ui';
import mixin from '@/utils/mixin';

export default {
  name: 'EntrustDetailed',
  components: {
    'bg-table': Table,
    TableColumn,
    Pagination,
  },
  mixins: [mixin],
  data() {
    return {
      tableLoading: false,
      data: [
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'huobi globalddd  ',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
        {
          orderId: 1,
          time: '2019-09-23 23:01',
          varieties: 'BTC',
          direction: '赎回',
          entrustNum: '10.12',
          entrustPirce: '2993.23',
          successNum: '8.2',
          successPirce: '8019.89',
          status: '部分成交',
          entrustType: 'limit',
          sonName: 'VVVVVVVV',
          exchange: 'AAAAAAAAA',
          tradeType: '现货',
        },
      ],
      options: [
        {
          propName: 'varieties',
          labelName: '品种',
        },
        {
          propName: 'direction',
          labelName: '方向',
        },
        {
          propName: 'entrustNum',
          labelName: '委托数量',
        },
        {
          propName: 'entrustPirce',
          labelName: '委托价格',
        },
        {
          propName: 'successNum',
          labelName: '成交数量',
        },
        {
          propName: 'successPirce',
          labelName: '成交价格',
        },
        {
          propName: 'status',
          labelName: '状态',
        },
        {
          propName: 'entrustType',
          labelName: '委托类型',
        },
      ],
      currentPage: 1,
    };
  },
  methods: {
    // 页码改变
    handleCurrentChange(val) {
      this.tableLoading = false;
    },
  },
};
</script>

<style lang="scss">
.table-wrap {
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }
}
</style>
