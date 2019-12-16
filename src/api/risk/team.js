import request from '@/utils/request'
import { handlerResponse } from '@/utils/auth'

class AssetsService {
  // 获取团队列表
  static async getTeamList({ pageNum, pageSize }) {
    try {
      const requestOptions = {
        url: `/risk-management/index/1?page_num=${pageNum}&page_size=${pageSize}`,
        method: 'get'
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取团队预警信息
  static async getTeamWarningList({ pageNum, pageSize, teamId }) {
    try {
      const requestOptions = {
        url: '/risk-management/index/2',
        method: 'get',
        params: {
          page_num: pageNum,
          page_size: pageSize
        }
      }
      if (teamId) {
        requestOptions.params.id = teamId
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 编辑团队预警信息
  static async editTeamWarning(options) {
    try {
      const requestOptions = {
        url: '/risk-management/index/edit',
        method: 'post',
        data: {
          id: options.warnId,
          remark: options.remark
        }
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取团队详情信息
  static async getTeamDetailInfo(teamId) {
    try {
      const requestOptions = {
        url: `/risk-management/index/detail/${teamId}`,
        method: 'get'
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  // 获取团队详情持仓明细
  static async getTeamHoldInfo({ pageNum, pageSize, teamId }) {
    try {
      const requestOptions = {
        url: '/risk-management/index/detail/table',
        method: 'get',
        params: {
          page_num: pageNum,
          page_size: pageSize,
          id: teamId
        }
      }
      const response = await request(requestOptions)
      return handlerResponse(response)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default AssetsService
