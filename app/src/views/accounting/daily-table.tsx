import { Table } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/es/table/interface'
import type { TableColumnsType } from 'antd'

import React, { useEffect, useState } from 'react'
import './log-viewer.less'
import { getDateTostring } from '@/src/components/utils'

interface DataType {
  name: string
  age: number
  address: string
  child: ExpandedDataType[]
}

interface ExpandedDataType {
  name: string
  age: string
}

const columns: ColumnsType<DataType> = [
  {
    title: '交易日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  },
]

const expandedRowRender = (setSelectedRows: any) => (record: DataType) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    {
      title: '交易日期',
      width: 200,
      dataIndex: 'trans_time_formate',
      key: 'trans_time_formate',
    },
    {
      title: '描述',
      width: 200,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    { title: '分类', dataIndex: 'name', key: 'name', width: 120 },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
    },

    { title: '成员', dataIndex: 'consumer', key: 'consumer' },
    { title: '账户', dataIndex: 'account_type', key: 'account_type' },
    // { title: '付款方式', dataIndex: 'payment_type', key: 'payment_type' },
    // { title: '标签', dataIndex: 'tag', key: 'tag' },
    // { title: '消费目的', dataIndex: 'tag', key: 'tag' },
    // { title: 'ABC分类', dataIndex: 'tag', key: 'tag', ellipsis: true },
    // {
    //   title: '创建日期',
    //   dataIndex: 'creation_time_formate',
    //   key: 'creation_time',
    //   ellipsis: true,
    // },
    // {
    //   title: '最后修改',
    //   dataIndex: 'modification_time_formate',
    //   key: 'modification_time',
    //   ellipsis: true,
    // },
  ]
  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<ExpandedDataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys)
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        typeof selectedRowKeys,
        'selectedRows: ',
        selectedRows
      )
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows)
    },
  }
  return (
    <Table
      rowKey="m_id"
      columns={columns}
      rowSelection={{ ...rowSelection }}
      dataSource={record.child}
      pagination={false}
    />
  )
}

const TableView = (props: {
  formValue: any
  tableData: any
  setSelectedRows: (a: any) => void
}) => {
  const { formValue, setSelectedRows, tableData } = props

  return (
    <div className="edit-area">
      <Table
        rowKey="date"
        size="small"
        columns={columns}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowKeys: tableData.map((val: any) => val.date),
          expandedRowRender: expandedRowRender(setSelectedRows),
        }}
        dataSource={tableData}
      />
    </div>
  )
}

export default TableView
