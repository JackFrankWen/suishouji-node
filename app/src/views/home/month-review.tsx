import {
  Card,
  Col,
  Row,
  Modal,
  Space,
  DatePicker,
  Statistic,
  PageHeader,
  Radio,
} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import './home.less'
import Pie from '@/src/components/Pie'
import Memerber from '@/src/components/Member'
function Summarize() {
  const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
  }
  return (
    <Row className="lvl-2">
      <Col span={24}>
        <Card title="汇总">
          <Card.Grid style={gridStyle}>
            <Statistic title="总支出" prefix="$" value={112893} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <Statistic title="饮食消费" value={112893} />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Statistic title="娱乐消费" value={112893} />
          </Card.Grid>
          <Card.Grid style={gridStyle}>
            <Statistic title="投资消费" value={112893} />
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  )
}
function Content() {
  return (
    <Row gutter={16} className="lvl-3">
      <Col span={12}>
        <Card title="消费行为" bordered={false} extra={<Memerber />}>
          <Pie
            data={[
              { value: 1048, name: '餐饮' },
              { value: 735, name: '交通' },
              { value: 580, name: '住房' },
            ]}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="ABC类消费分析"
          bordered={false}
          extra={<a href="#">quni</a>}
        >
          <Pie
            data={[
              { value: 1048, name: 'A类（必须开支）' },
              { value: 735, name: 'B类（可有可恶）' },
              { value: 580, name: 'C类（可以削减）' },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )
}
function ContentSec() {
  return (
    <Row gutter={16} className="lvl-4">
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
        <Card title="成员消费占比" bordered={false} extra={<Memerber />}>
          <Pie
            data={[
              { value: 1048, name: 'A类（必须开支）' },
              { value: 735, name: 'B类（可有可恶）' },
              { value: 580, name: 'C类（可以削减）' },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )
}

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
