import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/Member'

export default function ReviewCost(props: { formValue: any }) {
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
              { value: 580, name: 'C类（过度不必要消费）' },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )
}
