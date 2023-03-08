import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import Pie from '@/src/components/app-echart/Pie'
import Bar from '@/src/components/app-echart/Bar'
import CategoryTable from '@/src/components/CategoryTable'
//home-section
function YearReview(props: { formValue: any }) {
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
    <>
      <Row className="home-section" gutter={16}>
        <Col span={24}>
          <Card title="每月开支" bordered={false} extra={<RangePickerWrap />}>
            <Bar {...monthBar} />
          </Card>
        </Col>
      </Row>
      <TableSection />
    </>
  )
}

function TableSection() {
  const [category, setCategory] = useState<any>([])
  const getCategory = async () => {
    try {
      const res = await $api.getCategory()
      if (res) {
        setCategory(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <CategoryTable data={category} />
      </Col>
    </Row>
  )
}
export default YearReview
