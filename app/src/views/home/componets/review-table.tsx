import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'
import { useConsumer } from '@/src/components/form/Member'

export default function TableSection(props: { formValue: any }) {
  const { formValue } = props
  const [consumerVal, ConsumerCpt] = useConsumer()

  const [category, setCategory] = useState<any>([])

  const getCategory = async (data: any) => {
    try {
      const res = await $api.getCategory(getDateTostring(data))
      if (res) {
        setCategory(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory({
      ...formValue,
      consumer: consumerVal,
    })
  }, [formValue, consumerVal])
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <Card title="分类" bordered={false} extra={ConsumerCpt}>
          <CategoryTable
            data={category}
            formValue={{
              ...formValue,
              consumer: consumerVal,
            }}
          />
        </Card>
      </Col>
    </Row>
  )
}
