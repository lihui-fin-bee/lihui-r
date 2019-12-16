// 账户当前净杠杆&多单杠杆&空单杠杆
export const formatMarginSeries = data => data.map((item, index) => {
  const option = {
    name: item.name,
    type: 'bar',
    data: item.data
  }

  if (index !== 0) {
    option.stack = 'all'
  }

  return option
})

// 各币种敞口
export const formatCurrenciesSeries = data => data.map(item => ({
  name: item.name,
  type: 'bar',
  stack: 'all',
  // barWidth: 30,
  data: item.data
}))

// 累计盈亏
export const formatPnlSeries = data => data.map((item, index) => {
  const option = {
    name: item.name,
    type: 'line',
    stack: 'all',
    smooth: true,
    areaStyle: {
      origin: 'start',
      color: 'rgba(194, 53, 49, .2)'
    },
    data: item.data,
    showSymbol: item.data.length < 2
  }

  if (index === data.length - 1) {
    return {
      ...option
    }
  }
  return option
})

// 日收益
export const formatIncomeSeries = data => data.map((item, index) => {
  const option = {
    name: item.name,
    type: 'bar',
    stack: 'all',
    data: item.data
  }
  // #61A0A8
  if (index === 0) {
    option.itemStyle = {
      normal: {
        color: 'rgba(0,0,0,0)'
      }
    }
  }

  return option
})
