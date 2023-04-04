import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'

const Pie = (props: {
  data: {
    value: number
    name: string
  }[]
}) => {
  const [chartOptions, setChartOptions] = useState({})
  const { data } = props
  useEffect(() => {
    setChartOptions({
      tooltip: {
        trigger: 'item',
        formatter: (val: any) => `${val.value}元`,
      },
      legend: {
        // Try 'horizontal'
        orient: 'vertical',
        right: 10,
        data: data.map((val) => val.name),
        top: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          minAngle: 5,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            normal: {
              show: true,
              formatter: (val: any) => `${val.name}(${val.percent}%)`,
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: data,
        },
      ],
    })
  }, [data])

  return <ReactECharts option={chartOptions} />
}

export default Pie
