import { Table, Tag } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import { ColumnsType } from 'antd/es/table/interface'
import type { TableColumnsType } from 'antd'

import React, { useEffect, useState } from 'react'
import './log-viewer.less'
import TableSettingTool from '@/src/components/TableSettingTool'

import { getDateTostring } from '@/src/components/utils'
import {
  abc_type,
  account_type,
  cost_type,
  payment_type,
  tag_type,
} from '@/core/api/const/web'
import moment from 'moment'

interface DataType {
  name: string
  age: number
  address: string
  m_id: string

  child: ExpandedDataType[]
}

interface ExpandedDataType {
  m_id: string
  trans_time_formate: string
  amount: string
  category: string
  description: string
  account_type: number
  payment_type: number
  consumer: number
  flow_type: number
  tag: number
  abc_type: number
  cost_type: number
  creation_time: Date
  trans_time: Date
  modification_time: Date
}
const formatTime = (val: string) =>
  val ? moment(val).format('YYYY-MM-DD HH:MM:SS') : ''
const columns: ColumnsType<DataType> = [
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

  {
    title: '消费者',
    width: 80,
    dataIndex: 'consumer',
    key: 'consumer',
    render: (val: number) => {
      const consumer_type = {
        1: '老公',
        2: '老婆',
        3: '家庭',
        4: '牧牧',
      }
      if (val === 1) {
        return <Tag color="cyan">{consumer_type[val]}</Tag>
      } else if (val === 2) {
        return <Tag color="magenta">{consumer_type[val]}</Tag>
      } else if (val === 3) {
        return <Tag color="geekblue">{consumer_type[val]}</Tag>
      } else if (val === 4) {
        return <Tag color="orange">{consumer_type[val]}</Tag>
      }
    },
  },

  {
    title: '付款方式',
    dataIndex: 'payment_type',
    width: 90,
    render: (val: number) => (val ? payment_type[val] : ''),
  },
  {
    title: '账户',
    dataIndex: 'account_type',
    width: 90,
    render: (val: number) => (val ? account_type[val] : ''),
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: 90,
    render: (val: number) => (val ? tag_type[val] : ''),
  },
  {
    title: 'ABC类',
    dataIndex: 'abc_type',
    width: 80,
    render: (val: number) => (val ? abc_type[val] : ''),
  },
  {
    title: '消费方式',
    dataIndex: 'cost_type',
    width: 100,
    render: (val: number) => (val ? cost_type[val] : ''),
  },
  {
    title: '创建日期',
    dataIndex: 'creation_time',
    render: formatTime,
    key: 'creation_time',
    ellipsis: true,
  },
  {
    title: '最后修改',
    dataIndex: 'modification_time_formate',
    render: formatTime,

    key: 'modification_time',
    ellipsis: true,
  },
]

const TableView = (props: {
  formValue: any
  tableData: any
  selectedRows: React.Key[]
  setSelectedRows: (a: any) => void
}) => {
  const { selectedRows = [], setSelectedRows, tableData } = props
  const [tableCol, setTableCol] = useState(columns)
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      setSelectedRows(selectedRowKeys)
    },
  }
  console.log(selectedRows, 'selectedRows')
  const selectRow = (record: ExpandedDataType | DataType) => {
    const selectedRowKeys = [...selectedRows]
    console.log(record, 'record')
    if (selectedRowKeys.indexOf(record.m_id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.m_id), 1)
    } else {
      selectedRowKeys.push(record.m_id)
    }
    setSelectedRows(selectedRowKeys)
  }
  return (
    <div className="edit-area">
      <TableSettingTool
        defaultColumns={[...columns]}
        onChange={(checkedGroup: string[]) => {
          const data = columns.filter((data: any) =>
            checkedGroup.includes(data.dataIndex)
          )
          setTableCol(data)
        }}
      />
      <Table
        rowKey="m_id"
        size="small"
        columns={tableCol}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record)
          },
        })}
        expandable={{
          expandIcon: () => <></>,
          defaultExpandAllRows: true,
          expandedRowKeys: tableData.map((val: any) => val.trans_time_formate),
        }}
        rowSelection={{ ...rowSelection, checkStrictly: false }}
        dataSource={tableData}
        pagination={{
          defaultPageSize: 5,
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
        }}
      />
    </div>
  )
}

export default TableView
