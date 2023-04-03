import { Card, Cascader, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Bar from '@/src/components/app-echart/Bar'
import CategoryTable from '@/src/components/CategoryTable'
import BarVertial from '@/src/components/app-echart/BarVerti'
import { getDateTostring } from '@/src/components/utils'
import ReviewCost from './componets/review-cost'
import ReviewPerson from './componets/review-person'
import Summarize from './componets/review-sum'
import TableSection from './componets/review-table'
import Line from '@/src/components/app-echart/Line'
import { category_type } from '@/core/api/const/category'
//home-section

function AvgBarSection(props: { formValue: any }) {
  const { formValue } = props
  const [monthBar, setMonthbar] = useState<{
    label: string[]
    value: string[]
  }>({ label: [], value: [] })

  const getMonthBar = async (data: any) => {
    try {
      const res = await $api.getCategoryAvg(data)
      if (res) {
        setMonthbar(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMonthBar(getDateTostring(formValue))
  }, [formValue])
  console.log(monthBar, 'monthBar')
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <Card title="每月平均开支" bordered={false}>
          <BarVertial {...monthBar} title="每月平均消费" />
        </Card>
      </Col>
    </Row>
  )
}
function YearReview(props: { formValue: any }) {
  const { formValue } = props
  const [monthBar, setMonthbar] = useState<{
    label: string[]
    value: string[]
  }>({ label: [], value: [] })

  const getMonthBar = async (data: any) => {
    try {
      const res = await $api.getEveryMonthAmount(data)
      console.log(res)
      if (res) {
        setMonthbar(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMonthBar(getDateTostring(props.formValue))
  }, [formValue])

  return (
    <>
      <Summarize formValue={props.formValue} />

      <Row className="home-section" gutter={16}>
        <Col span={24}>
          <Card bordered={false}>
            <Bar {...monthBar} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="home-section">
        <Col span={24}>
          <Card
            title="每月平均开支"
            bordered={false}
            extra={
              <Cascader
                options={category_type}
                allowClear
                placeholder="请选择分类"
                multiple
                maxTagCount="responsive"
              />
            }
          >
            <Line />
          </Card>
        </Col>
      </Row>
      <AvgBarSection formValue={props.formValue} />
      <TableSection formValue={props.formValue} />
      <ReviewPerson formValue={props.formValue} />
      <ReviewCost formValue={props.formValue} />
    </>
  )
}

export default YearReview
