import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/Member'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'

function Summarize(props: { formValue: any }) {
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
function Content(props: { formValue: any }) {
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
        <Col span={24}>
          <CategoryTable data={category} />
        </Col>
      </Row>
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
function ContentSec(props: { formValue: any }) {
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
function MonthReivew(props: { formValue: any }) {
  return (
    <>
      <Summarize formValue={props.formValue} />
      <Content formValue={props.formValue} />
      <ContentSec formValue={props.formValue} />
    </>
  )
}
export default MonthReivew
