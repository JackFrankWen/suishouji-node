import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
import { roundToTwoDecimalPlaces } from '../utils'
const Line = (props: { data: any }) => {
  const { data = [] } = props
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    setChartOptions({
      // title: {
      //   text: 'Stacked Line',
      // },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: data.map((val: any) => val.name),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      /**
       * [{
       * month: 1,
       * child:[{label: Email,value: 120}]
       * }]
       */
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data[0]?.date,
      },
      yAxis: {
        type: 'value',
      },
      series: data.map((val: any) => ({
        name: val.name,
        type: 'line',
        data: val.amount,
      })),
    })
  }, [data])

  return <ReactECharts option={chartOptions} />
}

export default Line
