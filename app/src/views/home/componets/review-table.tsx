import { Card, Col, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'
import { useConsumer } from '@/src/components/form/useSelect'
import { cpt_const } from '@/core/api/const/web'

export default function TableSection(props: { formValue: any }) {
  const { formValue } = props
  const [consumerVal, ConsumerCpt] = useConsumer({
    options: cpt_const.consumer_type,
  })
  const [abcTypeVal, abcTypeCpt] = useConsumer({
    options: cpt_const.abc_type,
    placeholder: 'ABC分类',
  })
  const [costTypeVal, costTypeCpt] = useConsumer({
    options: cpt_const.cost_type,
    placeholder: '消费目的',
  })

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
      abc_type: abcTypeVal,
      cost_type: costTypeVal,
    })
  }, [formValue, consumerVal, abcTypeVal, costTypeVal])
  const extra = (
    <>
      <Space>
        {abcTypeCpt}
        {ConsumerCpt}
        {costTypeCpt}
      </Space>
    </>
  )
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <Card title="分类" bordered={false} extra={extra}>
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
