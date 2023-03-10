import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'

import Pie from '@/src/components/app-echart/Pie'
import Memerber from '@/src/components/form/Member'
import CategoryTable from '@/src/components/CategoryTable'
import { getDateTostring } from '@/src/components/utils'
import ReviewCost from './review-cost'
import ReviewPerson from './review-person'
import Summarize from './review-sum'
import TableSection from './review-table'

function MonthReivew(props: { formValue: any }) {
  return (
    <>
      <Summarize formValue={props.formValue} />
      <TableSection formValue={props.formValue} />
      <ReviewPerson formValue={props.formValue} />
      <ReviewCost formValue={props.formValue} />
    </>
  )
}
export default MonthReivew
