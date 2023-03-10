import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/Member'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'

export default function ReviewPerson(props: { formValue: any }) {
  const [category, setCategory] = useState<any>([])
  const [member, setMember] = useState<any>([])
  const getCategory = async (data: any) => {
    try {
      const res = await $api.getCategory(data)
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
    const data = getDateTostring(props.formValue)
    getCategory(data)
    getMemberTotal(data)
  }, [])

  return (
    <>
      <Row gutter={16} className="home-section">
        <Col span={12}>
          <Card title="支出" bordered={false} extra={<Memerber />}>
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
