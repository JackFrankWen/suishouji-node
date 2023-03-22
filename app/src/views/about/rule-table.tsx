import {
  abc_type,
  account_type,
  cost_type,
  tag_type,
} from '@/core/api/const/web'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { getCategoryString } from '@/core/api/const/category'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: '分类',
    dataIndex: 'category',
    width: 120,
    render: (val: string) => {
      const list = val ? JSON.parse(val) : []
      console.log(list, 'list')
      return list.length > 0 ? getCategoryString(list) : ''
    },
  },
  {
    title: '对象',
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
    title: '标签',
    dataIndex: 'tag',
    width: 80,
    render: (val: number) => (val ? tag_type[val] : ''),
  },
  {
    title: '规则',
    dataIndex: 'rule',
  },
  {
    title: '账户',
    dataIndex: 'account_type',
    width: 80,
    render: (val: number) => (val ? account_type[val] : ''),
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
    width: 120,
    render: (val: number) => (val ? cost_type[val] : ''),
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const RuleTable = () => {
  const [ruleData, setRuleData] = useState<any>()
  const getRuleData = async () => {
    try {
      const res = await $api.getALlMatchRule()
      console.log(res, 'rule')
      if (res) {
        setRuleData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getRuleData()
  }, [])
  return <Table columns={columns} dataSource={ruleData} />
}
export default RuleTable
