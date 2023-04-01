import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import { getDateTostring } from '@/src/components/utils'

export default function Summarize(props: { formValue: any }) {
  const { formValue } = props
  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
  }
  const [staticData, setStaticData] = useState<any>([])

  const getMemberTotal = async (date: any) => {
    try {
      const res = await $api.getAccountTotal(date)
      if (res) {
        setStaticData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMemberTotal(getDateTostring(formValue))
  }, [formValue])
  return (
    <Row className="home-section">
      <Col span={24}>
        <Card title="汇总">
          {staticData.map((item: any, key: any) => {
            return (
              <Card.Grid style={gridStyle} key={key}>
                <Statistic title={item.name} prefix="¥" value={item.value} />
              </Card.Grid>
            )
          })}
        </Card>
      </Col>
    </Row>
  )
}
