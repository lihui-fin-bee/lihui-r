export default {
  CTA: 'CTA',
  ARBITRAGE: '套利',
  套利: '套利',
  不限策略: '不限策略',
  市场中性: '市场中性',
  MIXED: '不限策略',
  MARKET_NEUTRAL: '市场中性'
}

export const tradeType = {
  MORE: '多',
  LESS: '空',
  NA: '其他'
}

export const transactionType = {
  IN_STORK: '现货',
  FUTURES: '期货',
  LEVERAGED: '杠杆',
  NA: '其他'
}

export const projectType = {
  NAV_WARNING: '净值', //
  HOLD_WARNING: '持仓',
  EXPOSURE_WARNING: '敞口',
  LEVERAGED_WARNING: '杠杆', //
  CURRENCY_WARNING: '币种范围', //
  ROI_ANNUALIZED_WARNING: '年化收益率',
  ROI_DAY_WARNING: '当日收益率',
  MDD_WARNING: '当前回撤',
  MDD_WEEK_WARNING: '7日回撤',
  PNL_WARNING: '累计盈亏', //
  MARGIN_WARNING: '保证金率'
}

export const projectWhitelist = ['NAV_WARNING', 'LEVERAGED_WARNING', 'CURRENCY_WARNING', 'PNL_WARNING']

export const riskControlType = {
  BREAK: '超规',
  WARNING: '预警'
}
