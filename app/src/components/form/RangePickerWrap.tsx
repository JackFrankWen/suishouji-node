import { Space, DatePicker, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
const { RangePicker } = DatePicker

import moment from 'moment'
function getFirstDayAndLastDay(month: number, type: 'year' | 'month') {
  const now = moment() // get the current date/time in Moment.js format

  const lastYear = now.clone().subtract(month, 'year') // go back one year
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
const RangePickerWrap = (props: {
  placeholder?: string
  bordered?: boolean
  onChange?: (a: any) => void
  value?: any
}) => {
  const { bordered = false, onChange, value, placeholder } = props

  const [date, setDate] = useState<any>(value)
  const [open, setOpen] = useState<boolean>(false)
  const setClickDate = (val: any) => {
    setDate(val)
    setOpen(false)
    if (onChange) onChange(val)
  }
  const renderExtraFooter = () => {
    const lastMonth = getFirstDayAndLastDay(1, 'month')
    const lastTwoMonth = getFirstDayAndLastDay(2, 'month')
    const lastYear = getFirstDayAndLastDay(1, 'year')
    const lastTwoyear = getFirstDayAndLastDay(2, 'year')
    return (
      <Space>
        <a onClick={() => setClickDate(lastMonth)}>上月</a>
        <a onClick={() => setClickDate(lastTwoMonth)}>上上月</a>
        <a onClick={() => setClickDate(lastYear)}>去年</a>
        <a onClick={() => setClickDate(lastTwoyear)}>前年</a>
      </Space>
    )
  }

  return (
    <RangePicker
      value={date}
      open={open}
      format="YYYY-MM-DD"
      onChange={(dates) => setClickDate(dates)}
      bordered={bordered}
      onOpenChange={(visiable) => setOpen(visiable)}
      renderExtraFooter={renderExtraFooter}
    />
  )
}

export default RangePickerWrap
