<template>
  <Card :title="title">
    <template>
<!--      <P class="title-text">数据更新于2019-09-23 18:15</P>-->
      <div class="table-container">
        <el-table
          :data="tableData"
          @row-click="rowClick">
          <af-table-column
            align="center"
            prop="updateTime"
            label="更新时间"
            :row-class-name="tableRowClassName"
          >
          </af-table-column>
          <af-table-column
            align="center"
            prop="team"
            label="团队"
            :row-class-name="tableRowClassName"
          >
          </af-table-column>
          <af-table-column
            align="center"
            prop="project"
            label="项目"
            :row-class-name="tableRowClassName"
          >
          </af-table-column>
          <af-table-column
            align="center"
            prop="currentValue"
            label="当前值"
            :row-class-name="tableRowClassName">
            <template slot-scope="scope">
              <span v-if="scope.row.currentValue === null" >--</span>
              <span v-else>{{scope.row.currentValue}}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            prop="riskControlThreshold"
            label="风控阈值"
            :row-class-name="tableRowClassName"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.riskControlThreshold === null" >--</span>
              <span v-else>{{scope.row.riskControlThreshold}}</span>
            </template>
          </af-table-column>
          <af-table-column
            align="center"
            prop="riskControlType"
            label="风控类型"
            :row-class-name="tableRowClassName"
          >
          </af-table-column>
          <af-table-column
            align="center"
            prop="detail"
            label="详情"
            :row-class-name="tableRowClassName"
          >
          </af-table-column>
          <af-table-column
            align="center"
            prop="actions"
            label="操作"
            :row-class-name="tableRowClassName"
          >
            <template slot-scope="scope" >
              <el-button v-show="!scope.row.actions[0]"
                type="text"
                @click="openEdit(scope.row)">编辑
              </el-button>
              <span v-show="scope.row.actions[0]">{{scope.row.actions[1]}}</span>
            </template>
          </af-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="10"
          :pager-count="7"
          layout="prev, pager, next,total, jumper"
          :total="warningTotalNum">
        </el-pagination>
      </div>
      <el-dialog
        title="编辑文本"
        :visible="dialogVisible"
        width="20%"
        @close="dialogVisible=false"
        center
        >
        <el-input v-model="inputText" placeholder="(15个字符以内)" maxlength="15"></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary"  class="save-btn" @click="saveEdit">确 定</el-button>
  </span>
      </el-dialog>
    </template>
  </Card>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { isArray } from 'lodash';
import {
  Table, Pagination, Loading, Button, Dialog, Input, Message,
} from 'element-ui';
import Card from '../../../components/card/Card.vue';

Vue.use(Loading.directive);
export default {
  name: 'TableWithPagination',
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      currentWaringPage: 1, // 保存当前页数 便于编辑后刷新
      inputText: '',
      rowId: '', // 编辑使用id
    };
  },
  props: {
    title: {
      type: String,
    },
    tableData: {
      type: Array,
    },
    columnData: {
      type: Array,
    },
    isHaveActions: {
      type: Boolean,
      default: false,
    },
    warningCurrentPage: {
      type: Number,
    },
    warningTotalNum: {
      type: Number,
    },
    warningTotalPage: {
      type: Number,
    },
  },
  components: {
    Card,
    'el-table': Table,
    'el-dialog': Dialog,
    'el-pagination': Pagination,
    'el-button': Button,
    'el-input': Input,
  },
  watch: {
    tableData() {
      if (this.tableData.length > 0) {
        this.tableLoading = false;
      }
    },
  },
  methods: {
    ...mapActions('risk/team', [
      'editTeamWarning',
    ]),
    /* 表格中改变改变样式的方法 */
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex === 1) {
        return 'warning-row';
      } if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    /* loadash */
    localIsArray(type) {
      return isArray(type);
    },
    // 页码改变
    handleCurrentChange(val) {
      this.tableLoading = true;
      this.currentWaringPage = val;
      this.$emit('changeWarningPage', val);
    },
    // 表格点击事件
    rowClick(row) {
      console.log(row);
    },
    // 点击编辑
    openEdit(row) {
      this.dialogVisible = true;
      this.rowId = row.id;
    },
    // 保存修改
    async saveEdit() {
      if (this.inputText.trim() === '') {
        Message.warning('请输入内容');
      } else {
        try {
          await this.editTeamWarning({
            warnId: this.rowId,
            remark: this.inputText,
          });
          this.dialogVisible = false;
          this.inputText = ''; // 内容置空
          this.tableLoading = true;
          await this.handleCurrentChange(this.currentWaringPage);
          this.tableLoading = false;
        } catch (err) {
          Message.error({
            offset: 100,
            message: '信息更新失败',
          });
        }
      }
    },
  },
};
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
  .save-btn{
    width: 150px;
  }

</style>
