import { category_type } from '@/core/api/const/category'
import { abc_type, cost_type, tag_type } from '@/core/api/const/web'
import { Space, Switch, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import React, { useState } from 'react'

interface DataType {
  label: string

  children?: DataType[]
}

const columns: ColumnsType<DataType> = [
  {
    title: '分类',
    dataIndex: 'label',
  },
  {
    title: '预算',
    dataIndex: 'budget',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: 100,
    render: (val: number) => (val ? tag_type[val] : ''),
  },
  {
    title: 'ABC类',
    dataIndex: 'abc_type',
    width: 100,
    render: (val: number) => (val ? abc_type[val] : ''),
  },
  {
    title: '消费方式',
    dataIndex: 'cost_type',
    width: 100,
    render: (val: number) => (val ? cost_type[val] : ''),
  },
]

const BudgetTable: React.FC = () => {
  return (
    <>
      <Table
        rowKey="value"
        columns={columns}
        dataSource={category_type}
        pagination={false}
        expandable={{
          expandIcon: () => <></>,
          defaultExpandAllRows: true,
          expandedRowKeys: category_type.map((val: any) => val.value),
        }}
      />
    </>
  )
}

export default BudgetTable
