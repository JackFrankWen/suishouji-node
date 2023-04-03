import React, { useEffect, useState } from 'react'

import ReactECharts from 'echarts-for-react'
const BarBudget = (props: {}) => {
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const app: any = {}

    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight',
    ]
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90,
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right',
        },
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom',
        },
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos
          return map
        }, {}),
      },
      distance: {
        min: 0,
        max: 100,
      },
    }
    app.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 20,
    }
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {},
      },
    }
    setChartOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['预算', '实际开支'],
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['生存开销', '发展开销', '享受开销'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '预算',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301],
        },
        {
          name: '实际开支',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191],
        },
      ],
    })
  }, [])

  return <ReactECharts option={chartOptions} />
}

export default BarBudget
