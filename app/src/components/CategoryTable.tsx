import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { roundToTwoDecimalPlaces } from './utils'
import React, { useState } from 'react'
import { ColumnsType } from 'antd/es/table/interface'

interface ExpandedDataType {
  name: string
  age: number
}
interface DataType {
  name: string
  age: number
  child: ExpandedDataType[]
}
const columns: ColumnsType<DataType> = [
  {
    title: '一级分类',
    dataIndex: 'name',
    width: '33%',
  },
  {
    title: '二级分类',
    dataIndex: 'oo',
    width: '33%',
  },

  {
    title: '金额',
    dataIndex: 'value',
    key: 'value',
    render: (val) => roundToTwoDecimalPlaces(val),
  },
]

const expandedRowRender = (record: DataType) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: '一级分类', width: '35%', dataIndex: '' },
    { title: '二级分类', width: '33%', dataIndex: 'name' },
    {
      title: '金额',
      dataIndex: 'value',
      key: 'value',
      render: (val) => roundToTwoDecimalPlaces(val),
    },
  ]

  return (
    <Table
      showHeader={false}
      columns={columns}
      dataSource={record.child}
      pagination={false}
    />
  )
}
const CategoryTable = (props: { data: DataType[] }) => (
  <Table
    rowKey="id"
    columns={columns}
    expandable={{
      indentSize: 0,
      expandedRowRender: expandedRowRender,
    }}
    dataSource={props.data}
    pagination={false}
  />
)
export default CategoryTable
