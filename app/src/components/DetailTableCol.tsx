import { Tag, Tooltip, Typography } from 'antd'
import {
  abc_type,
  account_type,
  cost_type,
  tag_type,
} from '@/core/api/const/web'
import React from 'react'
import { getCategoryObj } from '@/core/api/const/category'
export const detailTableCol = [
  {
    title: '交易时间',
    width: 200,
    dataIndex: 'trans_time_formate',
    key: 'trans_time_formate',
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'name',
    width: 120,
    render: (txt: string) => {
      const json = JSON.parse(txt)
      const category_obj = getCategoryObj()
      if (json.length && json.length > 0) {
        return `${category_obj[json[1]]}`
      }
      return ''
    },
  },

  {
    title: '内容',
    dataIndex: 'description',
    render: (description: string) => (
      <Tooltip placement="topLeft" title={description}>
        <Typography.Link ellipsis>{description}</Typography.Link>
      </Tooltip>
    ),
  },
  {
    title: '金额',
    dataIndex: 'amount',
    width: 80,
    render: (txt: string) => {
      if (Number(txt) > 100) {
        return <Typography.Text type="danger">{txt}</Typography.Text>
      }
      return txt
    },
  },
  {
    title: '消费对象',
    width: 80,
    dataIndex: 'consumer',
    key: 'consumer',
    render: (val: number) => {
      const consumer_type = {
        1: '老公',
        2: '老婆',
        3: '家庭',
        4: '牧牧',
        5: '爷爷奶奶',
        6: '溪溪',
      }
      if (val === 1) {
        return <Tag color="cyan">{consumer_type[val]}</Tag>
      } else if (val === 2) {
        return <Tag color="magenta">{consumer_type[val]}</Tag>
      } else if (val === 3) {
        return <Tag color="geekblue">{consumer_type[val]}</Tag>
      } else if (val === 4) {
        return <Tag color="purple">{consumer_type[val]}</Tag>
      } else if (val === 5) {
        return <Tag color="lime">{consumer_type[val]}</Tag>
      } else if (val === 6) {
        return <Tag color="orange">{consumer_type[val]}</Tag>
      }
      return <Tag color="orange">{consumer_type[val]}</Tag>
    },
  },

  {
    title: '标签',
    dataIndex: 'tag',
    width: 90,
    render: (val: number) => (val ? tag_type[val] : ''),
  },
  {
    title: '账户',
    dataIndex: 'account_type',
    width: 90,
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
    width: 100,
    render: (val: number) => (val ? cost_type[val] : ''),
  },
]
export const modalTableCol = detailTableCol.filter(
  (val) => !['category', 'account_type'].includes(val.dataIndex)
)
