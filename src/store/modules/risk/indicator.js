/* eslint-disable max-len */
import { get } from 'lodash'
import { handlerSuccessResponseV2, handlerSuccessResponseV4 } from '@/utils/auth'
import * as types from '../../mutationTypes'
import indicatorService from '../../../api/risk/indicator'

const state = {
  riskControlList: {}, // 风控指标列表
  riskControlDetail: { // 指标详情
    nav_holding_ration_value: [{ nav: 1, holding_rate: null }, { nav: 0, holding_rate: null }],
    netValue: 0, // 净值 超规
    maximumPositionRatio: 0 // 最大持仓比例 超规
  },
  basicFormData: {}
}

const getters = {
  /* 风控指标 */
  currentPage: state => get(state.riskControlList, 'current_page', 1), // 当前页码
  totalNum: state => get(state.riskControlList, 'total_num', 0), // 数据总条数
  totalPage: state => get(state.riskControlList, 'total_page', 0), // 数据总页数
  currentRiskControlList: state => get(state.riskControlList, 'data', []).map(item => ({
    productNum: item.id, // 产品编号
    productName: item.product_name, // 产品名称
    positionWeight: item.position_weight, // 仓位权重
    currencyExposureRate: item.exposure_ratio, // 总敞口率
    totalLeverageRatio: item.total_leveraged_rate, // 总杠杆率
    rangeOfCurrenciesTraded: item.currency_list, // 交易币种范围
    ageReturnRate: item.annualized_roi, // 年化收益率
    yieldOfTheDay: item.daily_return, // 当日收益率
    retreatRatio: item.current_max_draw_down_rate, // 当前回撤
    accumulatedProfitAndLossValue: item.pnl // 累计盈亏值
  })),
  /* 详情 */
  currentRiskControlDetail: state => ({
    id: get(state.riskControlDetail, 'id', ''),
    productId: get(state.riskControlDetail, 'product_id', ''),
    productName: get(state.riskControlDetail, 'product_name', ''),
    productNames: [{ id: get(state.riskControlDetail, 'product_id', ''), productName: get(state.riskControlDetail, 'product_name', '') }],
    // productNames: state.riskControlDetail.product_name ? state.riskControlDetail.product_name.split(',,,') : [],
    positionWeight: get(state.riskControlDetail, 'position_weight', ''), // 仓位权重
    netValueList: get(state.riskControlDetail, 'nav_holding_ration_value', []), // 净值 最大持仓比例 列表预警
    maximumPositionRatio: get(state.riskControlDetail, 'hold_shares_rate_threshold', ''), // 最大持仓比例 超规
    totalExposureRate1: get(state.riskControlDetail, 'exposure_ratio_warning_value', ''), // 总敞口率 预警
    totalExposureRate2: get(state.riskControlDetail, 'exposure_ratio_threshold', ''), // 总敞口率 超规
    totalLeverageRatio1: get(state.riskControlDetail, 'total_leveraged_rate_warning_value', ''), // 总杠杆率 预警
    totalLeverageRatio2: get(state.riskControlDetail, 'total_leveraged_rate_threshold', ''), // 总杠杆率 超规
    marginRate1: get(state.riskControlDetail, 'deposit_ratio_warning_value', ''), // 保证金率 预警
    marginRate2: get(state.riskControlDetail, 'deposit_ratio_threshold', ''), // 保证金率 超规
    allCurrencyTypes: get(state.riskControlDetail, 'all_currency_type', []), // 所有币种
    ownerCurrencyTypes: get(state.riskControlDetail, 'owner_currency_type', []), // 以显示内容
    annualizedRateOfReturn1: get(state.riskControlDetail, 'annualized_roi_warning_value', ''), // 年华收益率 预警
    annualizedRateOfReturn2: get(state.riskControlDetail, 'annualized_roi_threshold', ''), // 年华收益率 超规
    yieldOfTheDay1: get(state.riskControlDetail, 'daily_return_warning_value', ''), // 当日收益率  预警
    yieldOfTheDay2: get(state.riskControlDetail, 'daily_return_threshold', ''), // 当日收益率 超规
    maximumWithdrawalOnThatDay1: get(state.riskControlDetail, 'current_max_draw_down_rate_warning_value', ''), // 当日最大回撤 预警
    maximumWithdrawalOnThatDay2: get(state.riskControlDetail, 'current_max_draw_down_rate_threshold', ''), // 当日最大回撤 超规
    accumulatedProfitAndLoss1: get(state.riskControlDetail, 'pnl_warning_value', ''), // 累计盈亏值 预警
    accumulatedProfitAndLoss2: get(state.riskControlDetail, 'pnl_threshold', ''), // 累计盈亏值 超规
    weekMaxDrawDownRate1: get(state.riskControlDetail, 'week_max_draw_down_rate_warning_value', ''), // 七日最大回撤 预警
    weekMaxDrawDownRate2: get(state.riskControlDetail, 'week_max_draw_down_rate_threshold', '') // 七日最大回撤 超规
  }),
  /* form表单基本信息 */
  currentBasicFormData: state => ({
    productName: '',
    productNames: get(state.basicFormData, 'all_product', []),
    allCurrencyTypes: get(state.basicFormData, 'all_currency', []), // 所有币种
    ownerCurrencyTypes: [],
    netValueList: [
      { minNav: '1.0000', maxNav: '', holdingRate: '' },
      { minNav: '', maxNav: '1.0000', holdingRate: '' },
      { minNav: null, maxNav: '', holdingRate: '' }
    ]
  })
}

const mutations = {
  [types.GET_RISK_CONTROL_LIST](state, payload) {
    state.riskControlList = payload
  },
  [types.GET_RISK_CONTROL_DETAIL](state, payload) {
    state.riskControlDetail = payload
  },
  [types.BASIC_FORM_DATA](state, payload) {
    state.basicFormData = payload
  }

}

const actions = {
  // 获取风控指标列表
  async getRiskControlList({ commit }, options) {
    try {
      const response = await indicatorService.getRiskControlList(options)
      const data = await handlerSuccessResponseV4(response)
      commit(types.GET_RISK_CONTROL_LIST, data)
    } catch (error) {
      throw error
    }
  },

  // 获取风控指标详情ByID
  async getRiskControlDetailById({ commit }, options) {
    try {
      const response = await indicatorService.getRiskControlDetailById(options)
      const data = await handlerSuccessResponseV2(response)
      commit(types.GET_RISK_CONTROL_DETAIL, data)
    } catch (error) {
      throw error
    }
  },
  // 添加指标 获取基本数据
  async getBasicInfoBeforeEdit({ commit }, options) {
    try {
      const response = await indicatorService.getBasicInfoBeforeEdit(options)
      const data = await handlerSuccessResponseV2(response)
      commit(types.BASIC_FORM_DATA, data)
    } catch (error) {
      throw error
    }
  },

  // 修改或新增指标
  async updateOrPutRiskControl(comment, options) {
    try {
      const response = await indicatorService.updateOrPutRiskControl(options)
      return await handlerSuccessResponseV2(response)
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
