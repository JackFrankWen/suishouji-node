import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
import { roundToTwoDecimalPlaces } from '../utils'
const Bar = (props: { label: string[]; value: string[] }) => {
  const [chartOptions, setChartOptions] = useState({})
  const { label, value } = props
  useEffect(() => {
    let avg
    if (value.length > 0) {
      avg = value.reduce((a, b) => Number(a) + Number(b), 0) / value.length
    }
    console.log(value, 'ss')
    setChartOptions({
      title: {
        text: '月平均消费',
        subtext: `每月${roundToTwoDecimalPlaces(avg)}元`,
      },
      xAxis: {
        data: label,
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside',
              },
            },
          },

          data: value,
        },
      ],
    })
  }, [label, value])

  return <ReactECharts option={chartOptions} />
}

export default Bar
