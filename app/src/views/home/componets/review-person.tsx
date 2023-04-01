import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber, { useConsumer } from '@/src/components/form/useSelect'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'
import { consumer_type, cpt_const } from '@/core/api/const/web'

export default function ReviewPerson(props: { formValue: any }) {
  const { formValue } = props
  const [category, setCategory] = useState<any>([])
  const [member, setMember] = useState<any>([])
  const [consumerVal, ConsumerCpt] = useConsumer({
    options: cpt_const.consumer_type,
  })
  const getCategory = async (data: any) => {
    console.log(data, 'data====')
    try {
      const res = await $api.getCategory(data)
      console.log(res)
      if (res) {
        setCategory(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getMemberTotal = async (data: any) => {
    try {
      const res = await $api.getMemberTotal(data)
      console.log(res)
      if (res) {
        setMember(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const data = getDateTostring(formValue)
    getCategory({ ...data, consumer: consumerVal })
    getMemberTotal(data)
  }, [formValue, consumerVal])

  return (
    <>
      <Row gutter={16} className="home-section">
        <Col span={12}>
          <Card title="支出" bordered={false} extra={ConsumerCpt}>
            <Pie data={category} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="成员消费" bordered={false}>
            <Pie data={member} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
