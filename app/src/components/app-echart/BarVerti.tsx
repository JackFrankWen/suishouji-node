import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
const BarVertial = (props: {
  label?: string[]
  value?: string[]
  title: string
}) => {
  const [chartOptions, setChartOptions] = useState({})
  const { label, value, title } = props
  useEffect(() => {
    setChartOptions({
      title: {
        text: title,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: label,
      },
      series: [
        {
          type: 'bar',
          data: value,
        },
      ],
    })
  }, [label, value])

  return <ReactECharts option={chartOptions} />
}

export default BarVertial
