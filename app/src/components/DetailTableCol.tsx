import { Tooltip, Typography } from 'antd'
import {
  abc_type,
  account_type,
  cost_type,
  tag_type,
} from '@/core/api/const/web'
import React from 'react'
import { getCategoryObj } from '@/core/api/const/category'
import { getConsumerTag } from '@/src/components/GetConsumerTag'

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
    title: '消费成员',
    width: 80,
    dataIndex: 'consumer',
    key: 'consumer',
    render: (val: number) => {
      return getConsumerTag(val)
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
  (val) => !['category'].includes(val.dataIndex)
)
