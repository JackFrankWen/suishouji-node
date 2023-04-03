import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/useSelect'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'
import ReviewCost from './componets/review-cost'
import ReviewPerson from './componets/review-person'
import Summarize from './componets/review-sum'
import TableSection from './componets/review-table'
import BarBudget from '@/src/components/app-echart/BarBudget'

function MonthReivew(props: { formValue: any }) {
  return (
    <>
      <Summarize formValue={props.formValue} />
      <Row gutter={16} className="home-section">
        <Col span={24}>
          <Card title="预算对比" bordered={false}>
            <BarBudget />
          </Card>
        </Col>
      </Row>
      <TableSection formValue={props.formValue} />
      <ReviewPerson formValue={props.formValue} />
      <ReviewCost formValue={props.formValue} />
    </>
  )
}
export default MonthReivew
