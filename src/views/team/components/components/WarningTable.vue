<template>
  <div class="table-wrap">
    <bg-table :data="data">
      <table-column
        v-for="(item,key) in options"
        align="center"
        :key="key"
        :prop="item.propName"
        :label="item.labelName"
      >
        <template slot-scope="scope">
          <template v-if="item.propName === 'edit'">
            <bg-button
              v-if="!scope.row.actions[0]"
              type="text"
              class="text-edit"
               @click="onEdit(scope.row.id)"
            >编辑</bg-button>
            <span v-else class="edited">{{scope.row.actions[1]}}</span>
          </template>
          <template v-else>
            <span>{{scope.row[item.propName]}}</span>
          </template>
        </template>
      </table-column>
    </bg-table>
    <div class="pagination">
      <pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="prev, pager, next, total, jumper"
        :total="warningTotalNum"
      />
    </div>
    <bg-dialog
      :visible.sync="showDialog"
      center
      title="编辑文本"
      width="20%"
    >
      <bg-input
        placeholder="(15个字符以内)"
        v-model.trim="editText"
        maxlength="15"
      />
      <span slot="footer" class="dialog-footer">
        <bg-button type="primary" class="save-btn" @click="onSave">保存</bg-button>
      </span>
    </bg-dialog>
  </div>
</template>


<script>
import {
  Table, TableColumn, Pagination, Dialog, Button, Input, Message,
} from 'element-ui';
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('risk/team');

export default {
  name: 'WarningTable',
  components: {
    'bg-table': Table,
    TableColumn,
    Pagination,
    'bg-dialog': Dialog,
    'bg-input': Input,
    'bg-button': Button,
  },
  data() {
    return {
      currentPage: 1,
      showDialog: false,
      dialogId: '',
      editText: '',
      data: [],
      options: [
        {
          propName: 'updateTime',
          labelName: '更新时间',
        },
        {
          propName: 'project',
          labelName: '项目',
        },
        {
          propName: 'currentValue',
          labelName: '当前值',
        },
        {
          propName: 'riskControlThreshold',
          labelName: '风控阈值',
        },
        {
          propName: 'riskControlType',
          labelName: '风控类型',
        },
        {
          propName: 'detail',
          labelName: '详情',
        },
        {
          propName: 'edit',
          labelName: '操作',
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(['currentWarningTeamList', 'warningTotalNum']),
  },
  watch: {
    currentWarningTeamList(value) {
      this.data = JSON.parse((JSON.stringify(value)));
    },
  },
  methods: {
    ...mapActions(['getTeamWarningList', 'editTeamWarning']),
    // 获取列表
    async getList() {
      try {
        await this.getTeamWarningList({
          pageNum: this.currentPage,
          pageSize: 10,
          teamId: this.$route.query.id || 1,
        });
      } catch (e) {
        throw e;
      }
    },
    // 点击编辑
    onEdit(id) {
      this.dialogId = id;
      this.showDialog = true;
      this.editText = '';
    },
    // 点击保存
    async onSave() {
      if (this.editText) {
        try {
          const stus = await this.editTeamWarning({ remark: this.editText, warnId: this.dialogId });
          if (stus) {
            this.showDialog = false;
            this.getList();
          } else {
            Message.warning('出错');
          }
        } catch (e) {
          Message.warning('出错');
        }
      } else {
        Message.warning('请输入内容');
      }
    },
    // 页码改变
    handleCurrentChange(val) {
      if (this.currentPage !== val) {
        this.currentPage = val;
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrap {
  padding: 0 30px 50px;
  box-sizing: border-box;

  .edit {
    color: blue;
    cursor: pointer;
  }

  .save-btn{
    width: 150px;
  }

  .text-edit{
    padding: 0;
  }

  .edited {
    color: #000000;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }
}
</style>
