import { Card, Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'

export default function TableSection(props: { formValue: any }) {
  const { formValue } = props

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
    getCategory(formValue)
  }, [formValue])
  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <CategoryTable data={category} formValue={formValue} />
      </Col>
    </Row>
  )
}
