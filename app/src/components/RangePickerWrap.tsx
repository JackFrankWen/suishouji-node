import { Card, Col, Row, Modal, Space, DatePicker, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
const { RangePicker } = DatePicker

import moment from 'moment'
function getFirstDayAndLastDay(month: number, type: 'year' | 'month') {
  const now = moment() // get the current date/time in Moment.js format

  const lastYear = now.clone().subtract(1, 'year') // go back one year
  const firstDayOfLastYear = lastYear.clone().startOf('year') // get the first day of the previous year
  const lastDayOfLastYear = lastYear.clone().endOf('year') // get the last day of the previous year

  const firstDateOfLastMonth = now
    .clone()
    .subtract(month, 'months')
    .startOf('month')
  const lastDayOfLastMonth = now
    .clone()
    .subtract(month, 'months')
    .endOf('month')
  if (type === 'month') {
    return [firstDateOfLastMonth, lastDayOfLastMonth]
  }
  return [firstDayOfLastYear, lastDayOfLastYear]
}
const Extra = (props: { bordered?: boolean }) => {
  const { bordered = false } = props
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const [date, setDate] = useState<any>([firstDayOfYear, lastDayOfYear])
  const renderExtraFooter = () => {
    const lastMonth = getFirstDayAndLastDay(1, 'month')
    const lastTwoMonth = getFirstDayAndLastDay(2, 'month')
    const lastYear = getFirstDayAndLastDay(1, 'year')
    const lastTwoyear = getFirstDayAndLastDay(2, 'year')
    return (
      <Space>
        <a onClick={() => setDate(lastMonth)}>上月</a>
        <a onClick={() => setDate(lastTwoMonth)}>上上月</a>
        <a onClick={() => setDate(lastYear)}>去年</a>
        <a onClick={() => setDate(lastTwoyear)}>前年</a>
      </Space>
    )
  }
  return (
    <RangePicker
      value={date}
      format="YYYY-MM-DD"
      onChange={(dates) => {
        setDate(dates)
      }}
      bordered={bordered}
      renderExtraFooter={renderExtraFooter}
    />
  )
}

export default Extra
