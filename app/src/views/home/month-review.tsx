import { Card, Col, Row, Modal, Space, DatePicker, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/Member'
import CategoryTable from '@/src/components/CategoryTable'
function Summarize() {
  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
  }
  const [staticData, setStaticData] = useState<any>([])

  const getMemberTotal = async () => {
    try {
      const res = await $api.getAccountTotal()
      if (res) {
        setStaticData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMemberTotal()
  }, [])
  console.log(staticData, 'staticData')
  return (
    <Row className="home-section">
      <Col span={24}>
        <Card title="汇总">
          {staticData.map((item: any, key: any) => {
            return (
              <Card.Grid style={gridStyle} key={key}>
                <Statistic title={item.name} prefix="$" value={item.value} />
              </Card.Grid>
            )
          })}
        </Card>
      </Col>
    </Row>
  )
}
function Content() {
  const [category, setCategory] = useState<any>([])
  const [member, setMember] = useState<any>([])
  const getCategory = async () => {
    try {
      const res = await $api.getCategory()
      if (res) {
        setCategory(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getMemberTotal = async () => {
    try {
      const res = await $api.getMemberTotal()
      console.log(res)
      if (res) {
        setMember(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory()
    getMemberTotal()
  }, [])

  return (
    <>
      <Row gutter={16} className="home-section">
        <Col span={24}>
          <CategoryTable data={category} />
        </Col>
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
function ContentSec() {
  return (
    <Row gutter={16} className="home-section">
      <Col span={12}>
        <Card title="消费目的" bordered={false} extra={<Memerber />}>
          <Pie
            data={[
              { value: 1048, name: '生存开销' },
              { value: 735, name: '发展开销' },
              { value: 580, name: '享受开销' },
            ]}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="abc消费占比" bordered={false} extra={<Memerber />}>
          <Pie
            data={[
              { value: 1048, name: 'A类（必须开支' },
              { value: 735, name: 'B类（可有可无）' },
              { value: 580, name: 'C类（可以削减）' },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )
}
function TableView() {}
function MonthReivew() {
  return (
    <>
      <Summarize />
      <Content />
      <ContentSec />
    </>
  )
}
export default MonthReivew
