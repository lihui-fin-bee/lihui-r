/* eslint-disable max-len */

import request from '@/utils/request'
import { handlerResponse } from '@/utils/auth'

class AssetsService {
  // 获取风控指标列表
  static async getRiskControlList({ pageNum, pageSize }) {
    try {
      const requestOptions = {
        url: `/risk-management/team/list?page_num=${pageNum}&page_size=${pageSize}`,
        method: 'get'
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取指标详情
  static async getRiskControlDetailById(id) {
    try {
      const requestOptions = {
        url: `/risk-management/team/detail/${id}`,
        method: 'get'
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取form表单的基本信息
  static async getBasicInfoBeforeEdit() {
    try {
      const requestOptions = {
        url: 'risk-management/team/info',
        method: 'get'
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 修改或新增指标
  static async updateOrPutRiskControl(options) {
    try {
      const requestOptions = {
        url: '/risk-management/team/update-put',
        method: 'post',
        data: {
          position_weight: options.positionWeight, // 仓位权重
          nav_warning_value: options.netValueList, // 净值 预警值
          exposure_ratio_warning_value: options.totalExposureRate1, // 总敞口率 预警值
          exposure_ratio_threshold: options.totalExposureRate2, // 总敞口率 阈值
          total_leveraged_rate_warning_value: options.totalLeverageRatio1, // 总杠杆率 预警值
          total_leveraged_rate_threshold: options.totalLeverageRatio2, // 总杠杆率 阈值
          deposit_ratio_warning_value: options.marginRate1, // 保证金率 预警值
          deposit_ratio_threshold: options.marginRate2, // 保证金率 阈值
          owner_currency_type: options.ownerCurrencyTypes, // 交易币种范围
          annualized_roi_warning_value: options.annualizedRateOfReturn1, // 年化收益率 预警值
          annualized_roi_threshold: options.annualizedRateOfReturn2, // 年化收益率 阈值
          daily_return_warning_value: options.yieldOfTheDay1, // 当日收益率 预警值
          daily_return_threshold: options.yieldOfTheDay2, // 当日收益率 阈值
          current_max_draw_down_rate_warning_value: options.maximumWithdrawalOnThatDay1, // 当日最大回撤 预警值
          current_max_draw_down_rate_threshold: options.maximumWithdrawalOnThatDay2, // 当日最大回撤 阈值
          pnl_warning_value: options.accumulatedProfitAndLoss1, // 累计盈亏 预警值
          pnl_threshold: options.accumulatedProfitAndLoss2, // 累计盈亏 阈值
          week_max_draw_down_rate_warning_value: options.weekMaxDrawDownRate1, // 七日最大回撤 预警值
          week_max_draw_down_rate_threshold: options.weekMaxDrawDownRate2 // 七日最大回撤 阈值
        }
      }
      if (options.id !== '') {
        requestOptions.data.id = options.id // 根据id判断是新增还是修改
      }
      if (options.productId !== '') {
        requestOptions.data.product_id = options.productId // 根据id判断是新增还是修改
      }

      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default AssetsService
