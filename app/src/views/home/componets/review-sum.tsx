import { Card, Col, Divider, Progress, Row, Statistic, Typography } from 'antd'
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
    <>
      {/* <Row className="home-section">
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
      </Row> */}
      <Row className="home-section" gutter={24}>
        {staticData.map((item: any, key: any) => {
          return (
            <Col span={6} key={key}>
              <Card hoverable>
                <Statistic title={item.name} prefix="¥" value={item.value} />
                <Divider />
                <Typography.Text> 微信： 33</Typography.Text>
                <Typography.Text> 支付宝： 33</Typography.Text>
              </Card>
            </Col>
          )
        })}
        <Col span={6}>
          <Card hoverable>
            <Statistic title="本月预算" prefix="¥" value="10000" />

            <Divider />
            <Typography.Text> 上月已经超： 33</Typography.Text>
          </Card>
        </Col>
      </Row>
    </>
  )
}
