import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
const Bar = (props: { label: string[]; value: string[] }) => {
  const [chartOptions, setChartOptions] = useState({})
  const { label, value } = props
  useEffect(() => {
    setChartOptions({
      title: {},
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
