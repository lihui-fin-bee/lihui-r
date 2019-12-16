import { get } from 'lodash'
import dayjs from 'dayjs'
import { toLine } from '@/utils/tools'
import strategyType, {
  tradeType, transactionType, projectType, riskControlType, projectWhitelist
} from '@/constants/strategyType'
import { handlerSuccessResponseV2, handlerSuccessResponseV4 } from '@/utils/auth'
import * as types from '../../mutationTypes'
import teamService from '../../../api/risk/team'

const isAddTemplate = (condition, data, template = '%') => {
  if (condition) {
    return data + template
  }
  return data
}

const state = {
  teamDetailInfo: {},
  teamHoldInfo: [],
  teamList: {}, // 实时数据监测
  waringTeamList: {} // 超规信息
}

const getters = {
  teamInfo: state => ({
    teamName: get(state.teamDetailInfo, toLine('teamName'), ''), // 产品名称
    administrator: get(state.teamDetailInfo, toLine('administrator'), ''), // 管理人
    positionWeight: get(state.teamDetailInfo, toLine('positionWeight'), '00.00'), // 仓位权重
    strategyType: strategyType[get(state.teamDetailInfo, toLine('catStrategyType'), 'cta').toUpperCase()], // 策略类型
    currentSize: get(state.teamDetailInfo, toLine('currentSize'), '00.00'), // 当前规模
    currentNav: get(state.teamDetailInfo, toLine('currentNav'), '00.00'), // 当前净值
    initSize: get(state.teamDetailInfo, toLine('initSize'), '00.00'), // 初始规模
    sharpeRatio: get(state.teamDetailInfo, toLine('sharpe_ratio'), '--'), // 夏普率
    skewness: get(state.teamDetailInfo, toLine('skewness'), '--'), // 偏度
    kurtosis: get(state.teamDetailInfo, toLine('kurtosis'), '--'), // 峰度
    volatility: get(state.teamDetailInfo, toLine('volatility'), null) // 波动率
  }),
  teamDashboard: state => ([
    {
      title: '当前回撤',
      id: '1',
      value: get(state.teamDetailInfo, toLine('currentDrawDownRate'), '0'),
      warn: get(state.teamDetailInfo, toLine('drawDownWarningValue'), '0'),
      threshold: get(state.teamDetailInfo, toLine('drawDownThreshold'), '0'),
      template: '%'
    },
    {
      title: '总杠杆',
      id: '2',
      value: get(state.teamDetailInfo, toLine('totalLeveragedRate'), '0'),
      warn: get(state.teamDetailInfo, toLine('totalLeveragedRateWarningValue'), '0'),
      threshold: get(state.teamDetailInfo, toLine('totalLeveragedRateThreshold'), '0')
    },
    {
      title: '历史净敞口',
      id: '3',
      value: get(state.teamDetailInfo, toLine('exposureRatio'), '0'),
      warn: get(state.teamDetailInfo, toLine('exposureRatioWarningValue'), '0'),
      threshold: get(state.teamDetailInfo, toLine('exposureRatioThreshold'), '0'),
      template: '%'
    },
    {
      title: '7日回撤',
      id: '4',
      value: get(state.teamDetailInfo, toLine('drawDownRateOf7Days'), '0'),
      warn: get(state.teamDetailInfo, toLine('drawDownRateOf7DaysWarningValue'), '0'),
      threshold: get(state.teamDetailInfo, toLine('drawDownRateOf7DaysThreshold'), '0'),
      template: '%'
    }
  ]),
  trendAnalysisMin: state => ([
    {
      name: '历史净敞口',
      list: get(state.teamDetailInfo, toLine('exposureRatioHistoryList'), []),
      max: get(state.teamDetailInfo, toLine('maxExposureRationHistory'), '00.00'),
      avg: get(state.teamDetailInfo, toLine('avgExposureRationHistory'), '00.00'),
      template: '%',
      rule: 'round',
      isPositive: true
    },
    {
      name: '总杠杆率',
      list: get(state.teamDetailInfo, toLine('totalLeveragedRateHistoryList'), []),
      max: get(state.teamDetailInfo, toLine('maxLeveragedRateHistory'), '00.00'),
      avg: get(state.teamDetailInfo, toLine('avgLeveragedRateHistory'), '00.00'),
      rule: 'round'
    },
    {
      name: '当前回撤比例',
      list: get(state.teamDetailInfo, toLine('currentDrawDownRateHistoryList'), [])
        .map(item => ({
          x: item.x,
          y: `-${item.y}`
        })),
      max: get(state.teamDetailInfo, toLine('maxDrawDownRateHistory'), '00.00'),
      avg: get(state.teamDetailInfo, toLine('avgDrawDownRateHistory'), '00.00'),
      template: '%',
      rule: 'round',
      isNegative: true
      // isPositive: true,
    },
    {
      name: '当前回撤天数',
      list: get(state.teamDetailInfo, toLine('currentDrawDownRateDaysHistoryList'), []),
      max: get(state.teamDetailInfo, toLine('maxDrawDownRateDaysHistory'), '00.00'),
      avg: get(state.teamDetailInfo, toLine('avgDrawDownRateDaysHistory'), '00.00'),
      rule: 'day',
      isPositive: true
    },
    {
      name: '7日杠杆率',
      list: get(state.teamDetailInfo, toLine('leveragedRateOf7DaysHistoryList'), []),
      rule: 'round'
    },
    {
      name: '7日回撤比例',
      list: get(state.teamDetailInfo, toLine('drawDownRateOf7DaysHistoryList'), [])
        .map(item => ({
          x: item.x,
          y: `-${item.y}`
        })),
      template: '%',
      rule: 'round',
      // isPositive: true,
      isNegative: true
    },
    {
      name: '净值',
      list: get(state.teamDetailInfo, toLine('currentNavHistoryList'), []),
      rule: 'nav'
    },
    {
      name: '总收益率',
      list: get(state.teamDetailInfo, toLine('totalRoihistoryList'), []),
      template: '%',
      rule: 'round'
    }
  ]),
  trendAnalysis: state => ([
    {
      name: '账户当前净杠杆&多单杠杆&空单杠杆',
      list: get(state.teamDetailInfo, toLine('leveragedData'), {})
    },
    {
      name: '各币种敞口',
      list: get(state.teamDetailInfo, toLine('exposureRatioData'), {}),
      legendData: true,
      template: '%'
    },
    {
      name: '累计盈亏',
      list: get(state.teamDetailInfo, toLine('equityAndPnlData'), {})
    },
    {
      name: '日收益',
      list: get(state.teamDetailInfo, toLine('pnlData'), {})
    }
  ]),
  // 团队详情/持仓明细
  teamHoldInfoListTotalNum: state => ({
    totalPage: get(state.teamHoldInfo, 'total_page', 0),
    totalNum: get(state.teamHoldInfo, 'total_num', 0)
  }),
  // eslint-disable-next-line max-len
  teamHoldInfoList: state => get(state.teamHoldInfo, 'data', []).map(item => ({
    ...item,
    trade_type: tradeType[item.trade_type],
    transaction_type: transactionType[item.transaction_type.toLocaleUpperCase()],
    margin_rate: item.margin_rate ? `${item.margin_rate}%` : '--',
    holding_rate: item.holding_rate ? `${item.holding_rate}%` : '--',
    holding_pnl: item.holding_pnl ? `${item.holding_pnl}%` : '--'
  })),
  // 实时数据监测列表 teamList -lihui
  currentPage: state => get(state.teamList, 'current_page', 1), // 当前页码
  totalNum: state => get(state.teamList, 'total_num', 0), // 数据总条数
  totalPage: state => get(state.teamList, 'total_page', 0), // 数据总页数
  // 实时数据监测列表 teamList
  currentTeamList: state => get(state.teamList, 'data', []).map(item => ({
    id: item.product_id,
    date: dayjs(item.create_date).format('YYYY-MM-DD HH:mm'),
    team: item.team_name,
    policyType: item.type ? strategyType[item.type.toUpperCase()] : '--', // 策略类型
    netValue: item.current_nav ? [item.current_nav, item.current_nav_color] : ['--', item.current_nav_color], // 净值
    positionRatio: item.hold_shares_rate ? [`${item.hold_shares_rate}%`, item.hold_shares_rate_color] : ['--', item.hold_shares_rate_color], // 持仓比例
    exposureRate: item.exposure_ratio ? [item.exposure_ratio, item.exposure_ratio_color] : ['--', item.exposure_ratio_color], // 敞口率
    leverageRatio: item.total_leveraged_rate ? [item.total_leveraged_rate, item.total_leveraged_rate_color] : ['--', item.total_leveraged_rate_color], // 杠杆率
    illegalBreeds: item.currency_types ? item.currency_types : '--', // 违规品种
    dailyRateOfReturn: item.daily_return ? [`${item.daily_return}%`, item.daily_return_color] : ['--', item.daily_return_color], // 当日收益率
    maximumWithdrawal: item.daily_max_draw_down_rate ? [`${item.daily_max_draw_down_rate}%`, item.daily_max_draw_down_rate_color] : ['--', item.daily_max_draw_down_rate_color], // 当日最大回撤
    profitsAndLosses: item.pnl ? [item.pnl, item.pnl_color] : ['--', item.pnl_color],
    sharpeRatio: get(item, toLine('sharpe_ratio'), '--'), // 夏普率
    skewness: get(item, toLine('skewness'), '--'), // 偏度
    kurtosis: get(item, toLine('kurtosis'), '--'), // 峰度
    volatility: get(item, toLine('volatility'), null) // 波动率
  })),
  // 超规信息列表 -- lihui
  warningUpjdateTime: state => dayjs(get(state.waringTeamList, 'update_time', new Date())).format('YYYY-MM-DD HH:mm'), // 更新时间
  warningCurrentPage: state => get(state.waringTeamList, 'current_page', 1), // 当前页码
  warningTotalNum: state => get(state.waringTeamList, 'total_num', 0), // 数据总条数
  warningTotalPage: state => get(state.waringTeamList, 'total_page', 0), // 数据总页数
  currentWarningTeamList: state => get(state.waringTeamList, 'data', []).map(item => ({
    id: item.id ? item.id : '--',
    updateTime: item.update_time ? dayjs(item.update_time).format('YYYY-MM-DD HH:mm') : '--',
    team: item.team_name ? item.team_name : '--',
    project: item.warning_type ? projectType[item.warning_type] : '--',
    currentValue: item.current_value ? isAddTemplate(projectWhitelist.indexOf(item.warning_type) === -1, item.current_value) : '--',
    riskControlThreshold: item.threshold ? isAddTemplate(projectWhitelist.indexOf(item.warning_type) === -1, item.threshold) : '--',
    riskControlType: item.rm_type ? riskControlType[item.rm_type] : '--',
    detail: item.warning_detail ? item.warning_detail : '--',
    actions: item.is_handled ? [item.is_handled, item.remark] : [item.is_handled, '--'] // 是否处理
  }))
}

const mutations = {
  [types.GET_TEAM_LIST](state, payload) {
    state.teamList = payload
  },
  [types.GET_TEAM_WARING_LIST](state, payload) {
    state.waringTeamList = payload
  },
  [types.GET_TEAM_DETAIL](state, payload) {
    state.teamDetailInfo = { ...payload }
  },
  [types.GET_TEAM_HOLD_INFO](state, payload) {
    state.teamHoldInfo = payload
  }
}

const actions = {
  // 获取团队详细信息
  async getTeamDetailInfo({ commit }, teamId) {
    try {
      const response = await teamService.getTeamDetailInfo(teamId)
      const data = await handlerSuccessResponseV2(response)
      commit(types.GET_TEAM_DETAIL, data)
    } catch (error) {
      throw error
    }
  },

  // 获取团队详情持仓明细
  async getTeamHoldInfo({ commit }, options) {
    try {
      const response = await teamService.getTeamHoldInfo(options)
      const data = await handlerSuccessResponseV4(response)
      commit(types.GET_TEAM_HOLD_INFO, data)
    } catch (error) {
      throw error
    }
  },

  // 获取团队列表
  async getTeamList({ commit }, options) {
    try {
      const response = await teamService.getTeamList(options)
      const data = await handlerSuccessResponseV4(response)
      commit(types.GET_TEAM_LIST, data)
    } catch (error) {
      throw error
    }
  },

  // 获取预警列表
  async getTeamWarningList({ commit }, options) {
    try {
      const response = await teamService.getTeamWarningList(options)
      const data = await handlerSuccessResponseV4(response)
      commit(types.GET_TEAM_WARING_LIST, data)
    } catch (error) {
      throw error
    }
  },

  // 编辑预警信息
  async editTeamWarning(content, options) {
    try {
      const response = await teamService.editTeamWarning(options)
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
