<template class="dialog-container">
  <el-dialog
    v-if="isVisible"
    :title="title"
    :visible="true"
    width="60%"
    @close="closeDialog"
  >
    <div v-loading="dialogLoading" class="dialog-body">
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="产品名称" prop="productId">
          <el-select v-model="formData.productId">
            <el-option v-for="(item,index) in formData.productNames" :key="index" :label="item.productName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓位权重" prop="positionWeight">
          <MyInput class="input-style" :input-value="formData.positionWeight" type="formData" name="positionWeight" placeholder="0.00%" @newValue="getNewValue" />
        </el-form-item>
        <!--净值列表-->
        <el-form-item>
          <ul class="ul-list-style">
            <li class="li-list-style">
              <span class="col-one">净值</span>
              <span class="col-two">指标范围</span>
              <span class="col-three">最大持仓比例</span>
              <span class="col-four">操作</span>
            </li>
            <li v-for="(item,index) in formData.netValueList" :key="index" class="li-list-style">
              <!--第一列-->
              <div class="col-one">
                <el-form-item :prop="`netValueList[${index}].minNav`" :rules="{required: index === formData.netValueList.length-1 ? false : true, message: '净值不能为空', trigger: 'blur'}">
                  <!--<el-form-item  :prop="`netValueList[${index}].minNav`"   :rules="{ validator: checkAge, trigger: 'blur' }">-->
                  <el-input
                    v-if="index===formData.netValueList.length-1"
                    v-model="item.maxNav"
                    class="input-width"
                    placeholder="超规--0.00"
                    :disabled="true"
                    @input="changeNetValue(item.maxNav,index)"
                  />
                  <el-input
                    v-else
                    v-model="item.minNav"
                    class="input-width"
                    placeholder="预警--0.00"
                    :disabled="index===0"
                    @input="changeNetValue(item.minNav,index)"
                  />
                </el-form-item>
              </div>
              <!--第二列-->
              <span v-if="index===0" class="col-two">X>{{ item.minNav }}</span>
              <div v-else-if="index === formData.netValueList.length-1" class="col-two">
                <span>X{{ item.maxNav ? '≤' + item.maxNav : '' }}</span>
              </div>
              <div v-else class="col-two">
                <span>{{ item.minNav ?item.minNav + '＜' : '' }}X{{ item.maxNav ? '≤' + item.maxNav : '' }}</span>
              </div>
              <!--第三列-->
              <span v-if="index===0" class="col-three">--</span>
              <div v-else class="col-three">
                <el-form-item :prop="`netValueList[${index}].holdingRate`" :rules="{required: true, message: '不能为空', trigger: 'blur'}">
                  <MyInput class="input-width" :index="index" :input-value="item.holdingRate" name="holdingRate" type="netValueList" :placeholder="index!==formData.netValueList.length-1 ? '预警--0.00%' : '超规--0.00%'" @newValue="getNewValue" />
                </el-form-item>
              </div>
              <!--第四列-->
              <span v-if="index===0" class="col-four">---</span>
              <span v-else-if="index===formData.netValueList.length-1" class="col-four">---</span>
              <div v-else class="col-four">
                <el-button type="text" @click="addClick(index)">添加</el-button>
                <el-button v-if="index>1" type="text" @click="removeClick(index)">删除</el-button>
              </div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="总敞口率">
          <div style="display: flex">
            <el-form-item prop="totalExposureRate1">
              <MyInput class="input-style" :input-value="formData.totalExposureRate1" name="totalExposureRate1" type="formData" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="totalExposureRate2">
              <MyInput class="input-style input-other-style" :input-value="formData.totalExposureRate2" name="totalExposureRate2" type="formData" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="总杠杆率">
          <div class="double-form-item">
            <el-form-item prop="totalLeverageRatio1">
              <el-input v-model="formData.totalLeverageRatio1" class="input-style" placeholder="预警—0.00" />
            </el-form-item>
            <el-form-item prop="totalLeverageRatio2">
              <el-input v-model="formData.totalLeverageRatio2" class="input-style input-other-style" placeholder="超规—0.00" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="保证金率">
          <div class="double-form-item">
            <el-form-item prop="marginRate1">
              <MyInput class="input-style" :input-value="formData.marginRate1" name="marginRate1" type="formData" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="marginRate2">
              <MyInput class="input-style input-other-style" :input-value="formData.marginRate2" name="marginRate2" type="formData" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="交易币种范围" prop="ownerCurrencyTypes">
          <el-checkbox-group v-model="formData.ownerCurrencyTypes">
            <el-checkbox
              v-for="(item,index) in formData.allCurrencyTypes"
              :key="index"
              :label="item"
              name="ownerCurrencyTypes"
              class="checkbox-style"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年化收益率">
          <div class="double-form-item">
            <el-form-item prop="annualizedRateOfReturn1">
              <MyInput class="input-style" :input-value="formData.annualizedRateOfReturn1" name="annualizedRateOfReturn1" type="formData" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="annualizedRateOfReturn2">
              <MyInput class="input-style input-other-style" :input-value="formData.annualizedRateOfReturn2" name="annualizedRateOfReturn2" type="formData" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="当日收益率">
          <div class="double-form-item">
            <el-form-item prop="yieldOfTheDay1">
              <MyInput class="input-style" :input-value="formData.yieldOfTheDay1" name="yieldOfTheDay1" type="formData" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="yieldOfTheDay2">
              <MyInput class="input-style input-other-style" :input-value="formData.yieldOfTheDay2" name="yieldOfTheDay2" type="formData" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="当前回撤">
          <div class="double-form-item">
            <el-form-item prop="maximumWithdrawalOnThatDay1">
              <MyInput class="input-style" :input-value="formData.maximumWithdrawalOnThatDay1" name="maximumWithdrawalOnThatDay1" type="formData" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="maximumWithdrawalOnThatDay2">
              <MyInput class="input-style input-other-style" :input-value="formData.maximumWithdrawalOnThatDay2" type="formData" name="maximumWithdrawalOnThatDay2" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="7日回撤">
          <div class="double-form-item">
            <el-form-item prop="weekMaxDrawDownRate1">
              <MyInput class="input-style" :input-value="formData.weekMaxDrawDownRate1" type="formData" name="weekMaxDrawDownRate1" placeholder="预警—0.00%" @newValue="getNewValue" />
            </el-form-item>
            <el-form-item prop="weekMaxDrawDownRate2">
              <MyInput class="input-style  input-other-style" :input-value="formData.weekMaxDrawDownRate2" type="formData" name="weekMaxDrawDownRate2" placeholder="超规—0.00%" @newValue="getNewValue" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="累计盈亏值">
          <div class="double-form-item">
            <el-form-item prop="accumulatedProfitAndLoss1">
              <el-input v-model="formData.accumulatedProfitAndLoss1" class="input-style" placeholder="预警—0.00" />
            </el-form-item>
            <el-form-item prop="accumulatedProfitAndLoss2">
              <el-input v-model="formData.accumulatedProfitAndLoss2" class="input-style input-other-style" placeholder="超规—0.00" />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData('ruleForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import {
  Dialog, Form, FormItem, Select, Checkbox, Button, Option, Input,
  CheckboxGroup, Loading, Message
} from 'element-ui'
import MyInput from './MyInput.vue'

Vue.use(Loading.directive)

export default {
  name: 'TableDialog',
  components: {
    'el-dialog': Dialog,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-select': Select,
    'el-checkbox-group': CheckboxGroup,
    'el-checkbox': Checkbox,
    'el-option': Option,
    'el-button': Button,
    'el-input': Input,
    MyInput
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    productId: {
      type: Number
    },
    editType: {
      type: String
    },
    id: {
      type: Number
    }
  },
  data() {
    const reg = /(^[0-9-][0-9]*(.[0-9]+)?)$/
    // 产品名称
    const checkProductId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择产品名称'))
      }
      return callback()
    }
    // 仓位权重
    const checkDataWithInput = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入内容'))
      }
      let currentValue = value.trim()
      if (currentValue.indexOf('%') >= 0 && currentValue.indexOf('%') === currentValue.length - 1) {
        currentValue = currentValue.substring(0, currentValue.length - 1)
        return callback()
      }
      if (!reg.test(currentValue)) {
        return callback(new Error('请填写正确的数值'))
      }
      return callback()
    }
    // 币种
    const checkOwnerCurrencyTypes = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error('请至少选择一个币种'))
      }
      return callback()
    }
    return {
      dialogLoading: false,
      rules: {
        // 特殊需求
        all: [
          { required: true, trigger: 'change', message: ' ' }
        ],
        // 产品名称
        productId: [
          { validator: checkProductId, trigger: 'change' }
        ],
        // 仓位权重
        positionWeight: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 总敞口率
        totalExposureRate1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        totalExposureRate2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 总杠杆率
        totalLeverageRatio1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        totalLeverageRatio2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 保证金率
        marginRate1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        marginRate2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 币种范围
        ownerCurrencyTypes: [
          {
            type: 'array', validator: checkOwnerCurrencyTypes, trigger: 'blur'
          }
        ],
        // 年化收益率
        annualizedRateOfReturn1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        annualizedRateOfReturn2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 当日收益率
        yieldOfTheDay1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        yieldOfTheDay2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 当日最大回撤
        maximumWithdrawalOnThatDay1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        maximumWithdrawalOnThatDay2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 累计盈亏值
        accumulatedProfitAndLoss1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        accumulatedProfitAndLoss2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        // 七日最大回撤 预警
        weekMaxDrawDownRate1: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ],
        weekMaxDrawDownRate2: [
          { validator: checkDataWithInput, trigger: 'blur' }
        ]
        // // 总敞口率
        // totalExposureRate1: [
        //   { required: true, message: '请填写总敞口率', trigger: 'blur' },
        // ],
        // totalExposureRate2: [
        //   { required: true, message: '请填写总敞口率', trigger: 'blur' },
        // ],
        // // 总杠杆率
        // totalLeverageRatio1: [
        //   { required: true, message: '请填写总杠杆率', trigger: 'blur' },
        // ],
        // totalLeverageRatio2: [
        //   { required: true, message: '请填写总杠杆率', trigger: 'blur' },
        // ],
        // // 保证金率
        // marginRate1: [
        //   { required: true, message: '请填写保证金率', trigger: 'blur' },
        // ],
        // marginRate2: [
        //   { required: true, message: '请填写保证金率', trigger: 'blur' },
        // ],
        // // 币种范围
        // ownerCurrencyTypes: [
        //   {
        //     type: 'array', required: true, message: '请至少选择一个币种', trigger: 'blur',
        //   },
        // ],
        // // 年化收益率
        // annualizedRateOfReturn1: [
        //   { required: true, message: '请填写年化收益率', trigger: 'blur' },
        // ],
        // annualizedRateOfReturn2: [
        //   { required: true, message: '请填写年化收益率', trigger: 'blur' },
        // ],
        // // 当日收益率
        // yieldOfTheDay1: [
        //   { required: true, message: '请填写当日收益率', trigger: 'blur' },
        // ],
        // yieldOfTheDay2: [
        //   { required: true, message: '请填写当日收益率', trigger: 'blur' },
        // ],
        // // 当日最大回撤
        // maximumWithdrawalOnThatDay1: [
        //   { required: true, message: '请填写当前回撤', trigger: 'blur' },
        // ],
        // maximumWithdrawalOnThatDay2: [
        //   { required: true, message: '请填写当前回撤', trigger: 'blur' },
        // ],
        // // 累计盈亏值
        // accumulatedProfitAndLoss1: [
        //   { required: true, message: '请填写累计盈亏值', trigger: 'blur' },
        // ],
        // accumulatedProfitAndLoss2: [
        //   { required: true, message: '请填写累计盈亏值', trigger: 'blur' },
        // ],
        // // 七日最大回撤 预警
        // weekMaxDrawDownRate1: [
        //   { required: true, message: '请填写7日回撤', trigger: 'blur' },
        // ],
        // weekMaxDrawDownRate2: [
        //   { required: true, message: '请填写7日回撤', trigger: 'blur' },
        // ],
      },
      formData: {
        type: [],
        id: null,
        productId: null,
        productName: '',
        productNames: [],
        positionWeight: '', // 仓位权重
        netValueList: [], // 净值 最大持仓比例 列表预警
        maximumPositionRatio: '', // 最大持仓比例 超规
        totalExposureRate1: '', // 总敞口率 预警
        totalExposureRate2: '', // 总敞口率 超规
        totalLeverageRatio1: '', // 总杠杆率 预警
        totalLeverageRatio2: '', // 总杠杆率 超规
        marginRate1: '', // 保证金率 预警
        marginRate2: '', // 保证金率 超规
        allCurrencyTypes: [], // 所有币种
        ownerCurrencyTypes: [], // 以显示内容
        annualizedRateOfReturn1: '', // 年华收益率 预警
        annualizedRateOfReturn2: '', // 年华收益率 超规
        yieldOfTheDay1: '', // 当日收益率  预警
        yieldOfTheDay2: '', // 当日收益率 超规
        maximumWithdrawalOnThatDay1: '', // 当日最大回撤 预警
        maximumWithdrawalOnThatDay2: '', // 当日最大回撤 超规
        accumulatedProfitAndLoss1: '', // 累计盈亏值 预警
        accumulatedProfitAndLoss2: '', // 累计盈亏值 超规, // 表单数据
        weekMaxDrawDownRate1: '', // 七日最大回撤 预警
        weekMaxDrawDownRate2: '' // 七日最大回撤 超规
      },
      netValueList: []
    }
  },
  computed: {
    ...mapGetters('risk/indicator', [
      'currentRiskControlDetail',
      'currentBasicFormData'
    ])
  },
  methods: {
    ...mapActions('risk/indicator', [
      'getRiskControlDetailById',
      'updateOrPutRiskControl',
      'getBasicInfoBeforeEdit'
    ]),
    /* 接口调用方法 */
    // 获取风控指标详情
    async getDetailById(id) {
      this.dialogLoading = true
      try {
        await this.getRiskControlDetailById(id)
      } catch {
        Message.error({
          message: '加载失败',
          offset: 100
        })
      }
    },
    // 添加风控指标的基础信息查询
    async getBasicInfo() {
      this.dialogLoading = true
      try {
        await this.getBasicInfoBeforeEdit()
      } catch {
        Message.error({
          message: '加载失败',
          offset: 100
        })
      }
    },

    /* 页面触发事件 */
    closeDialog(isReload) {
      if (isReload) {
        this.$emit('closeDialog', { isCloseDialog: true, isReload: true })
      } else {
        this.$emit('closeDialog', { isCloseDialog: true, isReload: false })
      }
    },
    /* 弹窗内容操作 */
    // 添加 关于净值的列表
    addClick() {
      const lastIndex = this.netValueList.length - 1
      let currentMaxNav = ''
      if (this.netValueList[lastIndex - 1].minNav) {
        currentMaxNav = this.netValueList[lastIndex - 1].minNav
      }
      this.formData.netValueList.splice(lastIndex, 0, { minNav: '', maxNav: currentMaxNav, holdingRate: '' })
      this.$set(this.formData.netValueList, lastIndex + 1, { minNav: '', maxNav: '', holdingRate: '' })
    },
    // 删除 关于净值的列表
    removeClick(rowIndex) {
      this.formData.netValueList.splice(rowIndex, 1)
    },
    // 改变净值 联动改变数据
    changeNetValue(val, index) {
      if (this.netValueList.length - 1 > index) { // 列表中存在下一项
        this.$set(this.netValueList[index + 1], 'maxNav', val)
      }
      // 如果更改的是倒数第二项 则更改倒数第一项的净值
      if (this.netValueList.length - 2 === index) { // 列表中存在下一项
        this.$set(this.netValueList[index + 1], 'minNav', null)
      }
    },
    /* 获取新的值 */
    getNewValue(val) {
      if (val.type === 'formData') {
        this.$set(this.formData, val.name, val.newValue)
      } else {
        this.$set(this.formData[val.type][val.index], val.name, val.newValue)
      }
    },
    // 格式化formData (返回的数值带有)
    formatFormData(data) {
      const currentData = Array.isArray(data) ? [] : {}
      // eslint-disable-next-line no-restricted-syntax
      for (const item in data) {
        if ((typeof data[item]) === 'string') {
          if (data[item].indexOf('%') === data[item].length - 1) {
            currentData[item] = data[item].substring(0, data[item].length - 1)
          } else {
            currentData[item] = data[item]
          }
        } else if (typeof data[item] === 'object') {
          if (data[item] === null) {
            currentData[item] = null
          } else {
            currentData[item] = this.formatFormData(data[item])
          }
        } else {
          currentData[item] = data[item]
        }
      }
      return currentData
    },
    // 提交数据接口
    async commitFormData(formData) {
      this.dialogLoading = true
      try {
        await this.updateOrPutRiskControl(formData)
        this.dialogLoading = false
        Message.success({
          message: '修改成功',
          offset: 100
        })
        this.closeDialog(true)
      } catch {
        this.dialogLoading = false
        Message.error({
          message: '修改失败',
          offset: 100
        })
      }
    },
    // 保存
    submitData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.commitFormData(this.formatFormData(this.formData))
          this.closeDialog(true)
          return true
        }
        return false
      })
    }
  },
  watch: {
    isVisible() { // 监听弹窗状态 重置form数据
      if (this.isVisible === false) {
        this.formData = {}
      } else if (this.editType === 'modify') {
        this.dialogLoading = true
        this.getDetailById(this.id)
        this.formData = { ...this.currentRiskControlDetail }
      } else if (this.editType === 'add') {
        this.dialogLoading = true
        this.getBasicInfo()
        this.formData = { ...this.currentBasicFormData }
      }
    },
    currentRiskControlDetail() {
      if (this.currentRiskControlDetail.productId !== '') {
        this.formData = this.currentRiskControlDetail
        this.netValueList = this.currentRiskControlDetail.netValueList
        this.dialogLoading = false
      }
    },
    currentBasicFormData() {
      if (this.currentBasicFormData.productNames.length !== 0 || this.currentBasicFormData.allCurrencyTypes.length) {
        this.formData = { ...this.currentBasicFormData }
        this.netValueList = this.currentBasicFormData.netValueList
        this.dialogLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
  .input-style{
    display: flex;
  }
  /*净值最大持仓比例列表样式*/
  .ul-list-style{
    width: 100%;
    padding: 0;
    list-style: none;
    .li-list-style{
      height: 60px;
      display: flex;
      >div{
        display: flex;
      }
      .TextSpanInLi{
        min-width: 40px;
        height: 100%;
        vertical-align: center;
        margin-right: 5px;
      }
      .input-width{
        width: 120px;
      }
      .col-one{
         width: 25%;
       }
      .col-two{
        width: 25%;
      }
      .col-three{
        width: 25%;
      }
      .col-four{
        width: 25%;
      }
    }
  }
  .dialog-body{
  /*大于小于号样式*/
    .special-span{
      min-width: 70px;
      display: block;
      text-align: center;
      height:31.5px;
      line-height: 31.5px;
    }
  /*checkBoxGroup 样式*/
    .el-checkbox-group{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .el-checkbox{
        width: 20%;
        margin-right: 0;
      }
    }
  /*table中span样式*/
  .TextSpanInTable{
    min-width: 30px;
    height: 100%;
    vertical-align: center;
    margin-right: 3px;
  }
  /*input长度*/
  .input-style{
    width: 205px;
  }
  .input-other-style{
    margin-left: 30px;
  }
  /*table 样式*/
  .self-table{
    text-align: center;
  }
  /*内部多个ele-form-item*/
  .double-form-item{
    display: flex;
  }
}
</style>
