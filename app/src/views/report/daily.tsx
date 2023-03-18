import { Button, Col, Form, Input, Row, Select, Table } from 'antd'
import type { TableColumnsType } from 'antd'

import React, { useState } from 'react'
import { ColumnsType } from 'antd/es/table/interface'
const { Option } = Select

interface ExpandedDataType {
  key: React.Key
  date: string
  name: string
  upgradeNum: string
}
const AdvancedSearchForm = () => {
  const [expand, setExpand] = useState(false)
  const [form] = Form.useForm()

  const getFields = () => {
    const count = expand ? 10 : 6
    const children = []
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            {i % 3 !== 1 ? (
              <Input placeholder="placeholder" />
            ) : (
              <Select defaultValue="2">
                <Option value="1">1</Option>
                <Option value="2">sss</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      )
    }
    return children
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Form form={form} className="ant-advanced-search-form" onFinish={onFinish}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields()
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          ></a>
        </Col>
      </Row>
    </Form>
  )
}

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
  description: string
}
const columns: ColumnsType<DataType> = [
  {
    title: '一级分类',
    dataIndex: 'name',
    width: '49%',
    key: 'name',
  },

  {
    title: '金额',
    dataIndex: 'age',
    key: 'age',
  },
]

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
]

const expandedRowRender = () => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: '二级分类', width: '50%', dataIndex: 'date', key: 'date' },
    { title: '金额', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  ]

  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: ' 56',
    })
  }
  return <Table columns={columns} dataSource={data} pagination={false} />
}
const TableView: React.FC = () => (
  <Table
    columns={columns}
    expandable={{
      expandedRowRender: expandedRowRender,
    }}
    dataSource={data}
  />
)

const DailyReport: React.FC = () => (
  <div className="record-page">
    <AdvancedSearchForm />
    <TableView />
  </div>
)

export default DailyReport
