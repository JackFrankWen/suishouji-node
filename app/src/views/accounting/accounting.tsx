import { cpt_const } from '@/core/api/const/web'
import Memerber from '@/src/components/form/Member'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import SelectWrap from '@/src/components/form/SelectWrap'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space, Table } from 'antd'
import moment from 'moment'

import React, { useState } from 'react'
import TableView from './daily-table'
import './log-viewer.less'
const { Option } = Select

const useAdvancedSearchForm = () => {
  const [form] = Form.useForm()
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const initialValues = { type: 'year', date: [firstDayOfYear, lastDayOfYear] }
  const [formData, setFormData] = useState(initialValues)

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    setFormData(values)
  }

  const cpt = (
    <Form
      form={form}
      initialValues={formData}
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Space>
          <Form.Item name="member">
            <Memerber placeholder="placeholder" />
          </Form.Item>
          <Form.Item name="account_type">
            <SelectWrap placeholder="账户" options={cpt_const.account_type} />
          </Form.Item>
          <Form.Item name="tag">
            <SelectWrap placeholder="标签" options={cpt_const.tag} />
          </Form.Item>
          <Form.Item name="date" label="交易">
            <RangePickerWrap bordered placeholder="placeholder" />
          </Form.Item>
        </Space>
      </Row>
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
        </Col>
      </Row>
    </Form>
  )
  return [formData, cpt]
}

const BatchUpdateArea: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Finish:', values)
  }

  return (
    <Form
      form={form}
      className="batch-update-area"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Select>
          <Option value="1">1</Option>
          <Option value="2">sss</Option>
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button type="primary" htmlType="submit">
            批量修改
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}
const App: React.FC = () => {
  const [formValue, From] = useAdvancedSearchForm()
  return (
    <div className="record-page">
      {From}
      <BatchUpdateArea />
      <TableView formValue={formValue} />
    </div>
  )
}

export default App
