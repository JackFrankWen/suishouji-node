import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
import { roundToTwoDecimalPlaces } from '../utils'
const Line = (props: { data: any }) => {
  const { data = [] } = props
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    setChartOptions({
      title: {
        text: 'Stacked Line',
      },
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
      // series: [
      //   {
      //     name: 'Email',
      //     type: 'line',
      //     stack: 'Total',
      //     data: [120, 132, 101, 134, 90, 230, 210],
      //   },
      //   {
      //     name: 'Union Ads',
      //     type: 'line',
      //     stack: 'Total',
      //     data: [220, 182, 191, 234, 290, 330, 310],
      //   },
      //   {
      //     name: 'Video Ads',
      //     type: 'line',
      //     stack: 'Total',
      //     data: [150, 232, 201, 154, 190, 330, 410],
      //   },
      //   {
      //     name: 'Direct',
      //     type: 'line',
      //     stack: 'Total',
      //     data: [320, 332, 301, 334, 390, 330, 320],
      //   },
      //   {
      //     name: 'Search Engine',
      //     type: 'line',
      //     stack: 'Total',
      //     data: [820, 932, 901, 934, 1290, 1330, 1320],
      //   },
      // ],
    })
  }, [data])

  return <ReactECharts option={chartOptions} />
}

export default Line
