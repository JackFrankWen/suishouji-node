import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import './home.less'

const ChartComponent = () => {
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartOptions({
      title: {
        text: 'Sample Chart',
      },
      tooltip: {},
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F'],
      },
      yAxis: {},
      series: [
        {
          name: 'Sample Data',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    })
  }, [])

  return <ReactECharts option={chartOptions} />
}

import './home.less'

const App: React.FC = () => (
  <div className="page-home">
    <Row gutter={16} className="lvl-1">
      <Col span={8}>
        <Card title="上月开支" bordered={false}>
          1,222 元
        </Card>
      </Col>
      <Col span={8}>
        <Card title="去年平均" bordered={false}>
          1,222 元
        </Card>
      </Col>
      <Col span={8}>
        <Card title="上月理财收益" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
    <Row className="lvl-2">
      <Col span={24}>
        <Card title="Card title" bordered={false} extra={<a href="#">quni</a>}>
          <ChartComponent />
        </Card>
      </Col>
    </Row>
  </div>
)

export default App
