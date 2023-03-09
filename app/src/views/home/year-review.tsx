import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Bar from '@/src/components/app-echart/Bar'
import CategoryTable from '@/src/components/CategoryTable'
import BarVertial from '@/src/components/app-echart/BarVerti'
import { getDateTostring } from '@/src/components/utils'
import ReviewCost from './review-cost'
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
  console.log(monthBar, 'monthBar')
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <Card title="每月平均" bordered={false}>
          <BarVertial {...monthBar} />
        </Card>
      </Col>
    </Row>
  )
}
function TableSection(props: { formValue: any }) {
  const { formValue } = props

  const [category, setCategory] = useState<any>([])
  const getCategory = async () => {
    try {
      const res = await $api.getCategory(getDateTostring(props.formValue))
      if (res) {
        setCategory(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory()
  }, [formValue])
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <CategoryTable data={category} />
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
      <Row className="home-section" gutter={16}>
        <Col span={24}>
          <Card title="每月开支" bordered={false}>
            <Bar {...monthBar} />
          </Card>
        </Col>
      </Row>
      <TableSection formValue={props.formValue} />
      <AvgBarSection formValue={props.formValue} />
      <ReviewCost formValue={props.formValue} />
    </>
  )
}
export default YearReview
