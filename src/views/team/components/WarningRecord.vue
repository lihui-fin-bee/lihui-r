<template>
  <div class="warning-record-wrap">
    <div class="warning-record-title">预警记录</div>
    <div class="warning-record-time">数据更新于{{warningUpjdateTime}}</div>
    <warning-table />
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import WarningTable from './components/WarningTable.vue';

export default {
  name: 'WarningRecord',
  components: {
    WarningTable,
  },
  computed: {
    ...mapGetters('risk/team', ['warningUpjdateTime']),
  },
};
</script>

<style lang="scss" scoped>
.warning-record-wrap {
  width: 96%;
  margin: 0 auto;

  .warning-record-title {
    padding: 30px 10px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #cccccc;
  }

  .warning-record-time{
    margin: 30px 30px 0 0;
    font-size: 14px;
    color: #cccccc;
  }
}
</style>
