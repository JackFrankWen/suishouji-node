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
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  },
]

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<ExpandedDataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
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

const expandedRowRender = (record: DataType) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    {
      title: '交易日期',
      width: 120,
      dataIndex: 'trans_time',
      key: 'trans_time',
    },
    {
      title: '描述',
      width: 120,
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
    { title: '付款方式', dataIndex: 'payment_type', key: 'payment_type' },
    { title: '标签', dataIndex: 'tag', key: 'tag' },
    { title: '消费目的', dataIndex: 'tag', key: 'tag' },
    { title: 'ABC分类', dataIndex: 'tag', key: 'tag', ellipsis: true },
    {
      title: '创建日期',
      dataIndex: 'creation_time',
      key: 'creation_time',
      ellipsis: true,
    },
    {
      title: '最后修改',
      dataIndex: 'modification_time',
      key: 'modification_time',
      ellipsis: true,
    },
  ]
  console.log(record.child, '====record')
  return (
    <Table
      id="m_id"
      columns={columns}
      rowSelection={{ ...rowSelection }}
      dataSource={record.child}
      pagination={false}
      scroll={{ y: 300 }}
    />
  )
}

const TableView = (props: { formValue: any }) => {
  const { formValue } = props

  const [tableData, setTableData] = useState<any>([])

  const getDailyAmountTotal = async (data: any) => {
    try {
      const res = await $api.getDailyAmountTotal(getDateTostring(data))
      if (res) {
        setTableData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDailyAmountTotal(formValue)
  }, [formValue])
  return (
    <div className="edit-area">
      <Table
        id="date"
        columns={columns}
        expandable={{
          indentSize: 0,
          expandedRowRender: expandedRowRender,
        }}
        dataSource={tableData}
      />
    </div>
  )
}

export default TableView
