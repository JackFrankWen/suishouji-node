import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import RangePickerWrap from '@/src/components/RangePickerWrap'
import Pie from '@/src/components/app-echart/Pie'
import Bar from '@/src/components/app-echart/Bar'
//home-section
function YearReview() {
  const [monthBar, setMonthbar] = useState<{
    label: string[]
    value: string[]
  }>({ label: [], value: [] })

  const test = async () => {
    try {
      const res = await $api.getView()
      console.log(res)
      if (res) {
        setMonthbar(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    test()
  }, [])

  return (
    <Row className="home-section">
      <Col span={24}>
        <Card title="每月开支" bordered={false} extra={<RangePickerWrap />}>
          <Bar {...monthBar} />
        </Card>
      </Col>
    </Row>
  )
}
export default YearReview
