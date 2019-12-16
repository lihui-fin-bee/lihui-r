<template>
  <div class="table-tabs-wrap">
<!--    <tabs type="card">-->
<!--      <tab-pane class="tab">-->
<!--        <template v-slot:label>-->
<!--          <div class="tab-title">持仓明细</div>-->
<!--        </template>-->
    <div class="hold-title">持仓明细</div>
        <hold-detailed />
<!--      </tab-pane>-->
<!--      <tab-pane label="委托明细" class="tab">-->
<!--        <template v-slot:label>-->
<!--          <div class="tab-title">委托明细</div>-->
<!--        </template>-->
<!--        <entrust-detailed />-->
<!--      </tab-pane>-->
<!--    </tabs>-->
  </div>
</template>

<script>
// import { Tabs, TabPane } from 'element-ui';
import HoldDetailed from './components/HoldDetailed.vue';
// import EntrustDetailed from './components/EntrustDetailed.vue';

export default {
  name: 'TeamDetailed',
  components: {
    // Tabs,
    // TabPane,
    HoldDetailed,
    // EntrustDetailed,
  },
};
</script>

<style lang="scss" scoped>
.table-tabs-wrap {
  width: 96%;
  margin: 0 auto;

  .hold-title{
    padding: 30px 10px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #cccccc;
  }

  /*.tab {*/
  /*  width: 100%;*/
  /*  padding-bottom: 30px;*/
  /*}*/

  /*.tab-title {*/
  /*  font-size: 18px;*/
  /*  font-weight: 600;*/
  /*}*/
}
</style>
