import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber, { useConsumer } from '@/src/components/form/Member'
import { getDateTostring } from '@/src/components/utils'

export default function ReviewCost(props: { formValue: any }) {
  const { formValue } = props
  const [abcPieData, setABCPiedata] = useState<any>([])
  const [costPieData, setCostPiedata] = useState<any>([])
  const [consumerVal, ConsumerCpt] = useConsumer()
  const [consumerVal2, ConsumerCpt2] = useConsumer()

  const getAbcTotal = async (data: any) => {
    try {
      const res = await $api.getABCTotal(data)
      console.log(res)
      if (res) {
        setABCPiedata(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getCost = async (data: any) => {
    try {
      const res = await $api.getCostTypeToal(data)
      console.log(res)
      if (res) {
        setCostPiedata(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const data = getDateTostring(formValue)
    getCost({ ...data, consumer: consumerVal2 })
  }, [formValue, consumerVal2])

  useEffect(() => {
    const data = getDateTostring(formValue)
    getAbcTotal({ ...data, consumer: consumerVal })
  }, [formValue, consumerVal2])
  return (
    <Row gutter={16} className="home-section">
      <Col span={12}>
        <Card title="消费目的" bordered={false} extra={ConsumerCpt}>
          <Pie data={abcPieData} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="abc消费占比" bordered={false} extra={ConsumerCpt2}>
          <Pie data={costPieData} />
        </Card>
      </Col>
    </Row>
  )
}