import dayjs from 'dayjs'
import { isNaN } from 'lodash'
// 仪表盘颜色
export const dashboardColor = ['#31A72C', '#D77627', '#E03435']
// 标签颜色
export const textColor = '#D8D9DA'
// 标题颜色
export const titleColor = '#d8d9da'

// 仪表盘配置项
export const dashboardOptions = value => ({
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  series: [
    {
      type: 'gauge',
      radius: '90%',
      detail: {
        show: false
      },
      data: [{ value }],
      axisLine: {
        lineStyle: {
          width: 5,
          color: [[0.3, dashboardColor[0]], [0.7, dashboardColor[1]], [1, dashboardColor[2]]]
        }
      },
      startAngle: 210,
      endAngle: -30,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ]
})

function changeTwoDecimal(x) {
  const fX = parseFloat(x)
  if (isNaN(fX)) {
    return 0
  }
  let sX = (Math.floor(x * 10000) / 10000).toString()
  let posDecimal = sX.indexOf('.')
  if (posDecimal < 0) {
    posDecimal = sX.length
    sX += '.'
  }
  while (sX.length <= posDecimal + 4) {
    sX += '0'
  }
  return sX
}

function splitTime(data) {
  const arr = []
  data.forEach((item) => {
    const day = dayjs(item * 1).format('MM-DD')
    if (arr.indexOf(day) === -1) {
      arr.push(day)
    }
  })
  return arr.length > 7 ? 6 : arr.length - 1
}

// 折线图配置项
export const brokenLineDiagramOptions = (options, rule, isNegative) => ({
  grid: {
    left: 0,
    top: '10%',
    right: '8%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    confine: true,
    formatter: params => `${dayjs(params[0].axisValue * 1).format('YYYY/MM/DD HH:mm')} 数值: ${isNegative ? Math.abs(params[0].data[1]) : params[0].data[1]}${options.template ? '%' : ''}`
  },
  xAxis: {
    type: 'time',
    interval: (!options.allData.length || options.allData[options.allData.length - 1][0] === options.allData[0][0]) ? null : (options.allData[options.allData.length - 1][0] - options.allData[0][0]) / splitTime(options.xData),
    minInterval: 3600 * 24 * 1000,
    maxInterval: 3600 * 24 * 1000,
    boundaryGap: ['1000%', '1000%'],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#D8D9DA',
      fontSize: 10,
      margin: 10,
      showMinLabel: options.allData.length && options.allData[options.allData.length - 1][0] !== options.allData[0][0],
      showMaxLabel: options.allData.length && options.allData[options.allData.length - 1][0] !== options.allData[0][0],
      formatter: value => `${dayjs(value).format('MM-DD')}`
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
        opacity: 0.2
      }
    }
  },
  yAxis: {
    type: 'value',
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#D8D9DA',
      fontSize: 10,
      formatter: (value) => {
        if (rule === 'nav') {
          value = changeTwoDecimal(value)
        }

        if (rule === 'day') {
          value = `  ${value} `
        }

        if (rule === 'round') {
          if (isNegative) {
            value = Math.abs(value * 1).toFixed(2) + (options.template ? '%' : '')
          } else {
            value = (value * 1).toFixed(2) + (options.template ? '%' : '')
          }
        }
        return value
      }
    },
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#cccccc',
        opacity: 0.2
      }
    },
    // eslint-disable-next-line no-nested-ternary
    min: rule === 'nav' ? options.navMin : rule !== 'day' ? options.min : options.dayMin,
    // eslint-disable-next-line no-nested-ternary
    max: rule === 'nav' ? options.navMax : rule !== 'day' ? options.max : (options.dayMax + (4 - ((options.dayMax - options.dayMin) % 4))),
    // eslint-disable-next-line no-nested-ternary
    interval: rule === 'nav' ? ((options.navMax - options.navMin) / 4) : rule !== 'day' ? ((options.max - options.min) / 4) : ((options.dayMax + (4 - ((options.dayMax - options.dayMin) % 4))) - options.dayMin) / 4
  },
  series: [{
    data: options.allData,
    type: 'line',
    showSymbol: options.allData.length === 1,
    smooth: true,
    areaStyle: {
      origin: isNegative ? 'end' : 'start',
      color: 'rgba(254, 146, 0, .2)'
    },
    lineStyle: {
      color: '#FE9200',
      width: 1
    }
  }]
})

//
export const brokenLineDiagramOptionsOne = (option) => {
  let options = {
    grid: {
      top: '7%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    legend: {
      data: option.legendData,
      bottom: 5,
      itemHeight: 5,
      icon: 'roundRect',
      textStyle: {
        color: textColor,
        padding: [4, 0, 3, 0]
      }
    },
    series: option.series
  }

  let tooltip = {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'none' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: (opt) => {
      let str = ''
      opt.forEach((item) => {
        str += `<br/>${item.marker} ${item.seriesName} : ${item.value}${option.template ? '%' : ''}`
      })
      return `${dayjs(opt[0].axisValueLabel * 1).format('YYYY/MM/DD')}${str}`
    }
  }

  // x,y轴设置

  if (option.X) {
    options = {
      ...options,
      xAxis: [
        {
          type: 'value',
          axisLabel: {
            margin: 15,
            color: textColor,
            formatter: value => `${value}${option.template ? '%' : ''}`
          },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              color: '#cccccc',
              opacity: 0.5,
              type: 'dotted'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          axisLabel: {
            margin: 15,
            color: textColor,
            formatter: value => `${dayjs(value * 1).format('MM-DD')}`
          },
          data: option.data
        }
      ]
    }
  } else {
    options = {
      ...options,
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            margin: 15,
            color: textColor
          },
          axisTick: { show: false },
          splitLine: {
            lineStyle: {
              color: '#cccccc',
              opacity: 0.5,
              type: 'dotted'
            }
          },
          scale: true
        }
      ],
      xAxis: {
        type: 'category',
        axisTick: { show: false },
        axisLabel: {
          color: textColor,
          margin: 15,
          formatter: value => `${dayjs(value * 1).format('MM-DD')}`
        },
        splitLine: { show: false },
        boundaryGap: option.boundaryGap,
        data: option.data
      }
    }
  }

  // tooltip
  if (option.tooltipOptions === 'stack') {
    const data = option.series.map(item => item.data).flat(Infinity).map(item => Math.abs(item))
    const max = Math.max.apply(null, data)
    const min = Math.min.apply(null, data)
    if (Math.abs(max) > Math.abs(min)) {
      options.xAxis[0].max = Math.abs(max) + Math.abs(max) * 0.3
      options.xAxis[0].min = -Math.abs(max) - Math.abs(max) * 0.3
      options.xAxis[0].interval = (options.xAxis[0].max + Math.abs(options.xAxis[0].min)) / 6
    } else {
      options.xAxis[0].max = Math.abs(min) + Math.abs(min) * 0.3
      options.xAxis[0].min = -Math.abs(min) - Math.abs(min) * 0.3
      options.xAxis[0].interval = (options.xAxis[0].max + Math.abs(options.xAxis[0].min)) / 6
    }
    options.xAxis[0].axisLabel.formatter = value => `${value.toFixed(2)}`
  }

  if (option.tooltipOptions === 'bar') { // 堆叠区域图
    tooltip = {
      ...tooltip,
      axisPointer: {
        ...tooltip.axisPointer,
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          formatter: (opt) => {
            if (!opt.seriesData.length) {
              if (opt.value * 1 >= 0) {
                return opt.value.toString().slice(0, 6)
              }
              return opt.value.toString().slice(0, 7)
            }
            return dayjs(opt.value * 1).format('YYYY/MM/DD')
          }
        }
      },
      formatter([arr]) {
        return `${arr.axisValueLabel}<br/>${arr.marker} ${arr.seriesName} : ${arr.value}`
      }
    }
  }

  if (option.tooltipOptions === 'waterfall') { // 瀑布图
    tooltip = {
      ...tooltip,
      formatter(optionss) {
        const [zero, one, two, three, four] = optionss
        let tar = zero
        let num = 0
        // 计算正负双数组中的数之和
        const getValue = item => item.filter(ite => ite !== '-').reduce((prev, next) => (Math.abs(prev * 1) + Math.abs(next * 1)), 0)
        if (one.value !== '-' || two.value !== '-') {
          num = getValue([one.value, two.value])
          tar = one
        } else {
          num = -getValue([three.value, four.value])
          tar = three
        }
        return `${dayjs(tar.axisValueLabel * 1).format('YYYY/MM/DD')}<br/>${tar.marker} ${tar.seriesName} : ${num}`
      }
    }
    options = { ...options, color: ['#c23531', 'green'] }
  }

  return { ...options, tooltip }
}
