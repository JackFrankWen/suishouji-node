import {
  abc_type,
  account_type,
  cost_type,
  tag_type,
} from '@/core/api/const/web'
import { Input, message, Modal, Space, Table, Tag } from 'antd'
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
  const columns: ColumnsType<DataType> = [
    {
      title: '分类',
      dataIndex: 'category',
      width: 120,
      render: (val: string) => {
        const list = val ? JSON.parse(val) : []

        return list.length > 0 ? getCategoryString(list) : ''
      },
    },
    {
      title: '规则',
      dataIndex: 'rule',
      render: (ru: string) => {
        const arr = ru.split('|')
        return arr.map((str: string, key: number) => {
          return <Tag key={key}>{str}</Tag>
        })
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
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setVisiable(true)
              setRecord(record)
              console.log(record)
            }}
          >
            新增
          </a>
          <i className="ri-edit-box-line"></i>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    getRuleData()
  }, [])
  const [visiable, setVisiable] = useState(false)
  const [input, setInput] = useState<string>('')
  const [record, setRecord] = useState<any>()
  const onSubmit = async () => {
    if (!input) {
      message.info('比天')
      return
    }
    try {
      const res: any = await $api.UpdateOne({
        ...record,
        rule: record.rule.concat(`|${input}`),
      })
      if (res.code === 200) {
        setVisiable(false)
      }

      console.log(res, 'res')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Table columns={columns} dataSource={ruleData} scroll={{ x: 1500 }} />
      <Modal
        title="新增规则"
        open={visiable}
        onOk={onSubmit}
        onCancel={() => setVisiable(false)}
      >
        <Input
          placeholder="输入规则"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}
export default RuleTable
