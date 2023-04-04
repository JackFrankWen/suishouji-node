import { getDateTostring, toNumberOrUndefiend } from '@/src/components/utils'
import { message } from 'antd'
import moment from 'moment'

import React, { useEffect, useState } from 'react'
import DailyTable from './daily-table'
import './accounting.less'
import AdvancedSearchForm from './search-form'
import BatchUpdateArea from './batch-update'

function handleExist(data: any) {
  const exsit: any = {}
  if (data.exist === 1) {
  } else if (data.exist === '2') {
    exsit.category = { $exists: false }
  } else if (data.exist === '3') {
    exsit.abc_type = { $exists: false }
  } else if (data.exist === '4') {
    exsit.cost_type = { $exists: false }
  }
  return { ...exsit }
}
function handleCategory(data: any) {
  if (data.category && Array.isArray(data.category)) {
    return {
      ...data,
      category: { $in: data.category.map((val: []) => JSON.stringify(val)) },
    }
  }
  return { ...data }
}
const App: React.FC = () => {
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const initialValues = { date: [firstDayOfYear, lastDayOfYear] }

  const [formValue, setFormValue] = useState(initialValues)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState<any>([])

  useEffect(() => {
    getDailyAmountTotal(formValue)
  }, [formValue])

  const refresh = () => {
    getDailyAmountTotal(formValue)
  }
  const getDailyAmountTotal = async (data: any) => {
    try {
      const res = await $api.getDailyAmountTotal({
        ...data,
        ...getDateTostring(data),
        ...handleExist(data),
        ...handleCategory(data),
      })
      if (res) {
        setTableData(res)
        console.log(res, 'res')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onBatchUpdate = async (val: any) => {
    try {
      const res = await $api.updateMany({
        filter: {
          ids: selectedRows.filter((val: string) => val.length !== 10),
        },
        data: {
          ...val,
          category: val?.category ? JSON.stringify(val.category) : undefined,
        },
      })
      if (res.modifiedCount) {
        getDailyAmountTotal(formValue)
        setSelectedRows([])
        message.success(`成功${res.modifiedCount}记录`)
      }
      console.log(res, 'update sucess')
    } catch (error) {}
  }
  const onBatchDelete = async () => {
    try {
      const res = await $api.deleteMany({
        filter: {
          ids: selectedRows.filter((val: string) => val.length !== 10),
        },
      })
      if (res.deletedCount) {
        getDailyAmountTotal(formValue)
        setSelectedRows([])
        message.success(`成功删除${res.deletedCount}记录`)
      }
    } catch (error) {}
  }

  return (
    <div className="record-page">
      <AdvancedSearchForm onChange={setFormValue} formValue={formValue} />
      <BatchUpdateArea
        onBatchUpdate={onBatchUpdate}
        onBatchDelete={onBatchDelete}
      />
      <DailyTable
        selectedRows={selectedRows}
        formValue={formValue}
        tableData={tableData}
        setSelectedRows={(a) => {
          setSelectedRows(a)
        }}
      />
    </div>
  )
}

export default App
