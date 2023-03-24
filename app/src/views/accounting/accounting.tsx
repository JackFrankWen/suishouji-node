import { category_type } from '@/core/api/const/category'
import { cpt_const } from '@/core/api/const/web'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import SelectWrap from '@/src/components/form/SelectWrap'
import { getDateTostring } from '@/src/components/utils'
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from 'antd'
import moment from 'moment'

import React, { useEffect, useState } from 'react'
import TableView from './daily-table'
import './accounting.less'
const { Option } = Select

const useAdvancedSearchForm = () => {
  const [form] = Form.useForm()
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const initialValues = { type: 'year', date: [firstDayOfYear, lastDayOfYear] }
  const [formData, setFormData] = useState(initialValues)

  const onFinish = (values: any) => {
    console.log('搜索', values)
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
            <Radio.Group>
              <Radio.Button value="1">正常</Radio.Button>
              <Radio.Button value="2">分类无</Radio.Button>
              <Radio.Button value="3">ABC无</Radio.Button>
              <Radio.Button value="4">可削减</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="account_type">
            <SelectWrap
              style={{ width: '100px' }}
              placeholder="账户"
              options={cpt_const.account_type}
            />
          </Form.Item>
          <Form.Item name="tag">
            <SelectWrap placeholder="标签" options={cpt_const.tag_type} />
          </Form.Item>
          <Form.Item name="abc_type">
            <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
          </Form.Item>
          <Form.Item name="cost_type">
            <SelectWrap placeholder="消费目的" options={cpt_const.cost_type} />
          </Form.Item>
          <Form.Item name="payment_type">
            <SelectWrap
              placeholder="付款方式"
              options={cpt_const.payment_type}
            />
          </Form.Item>
        </Space>
      </Row>
      <Row>
        <Space>
          <Form.Item name="date" label="交易">
            <RangePickerWrap bordered placeholder="placeholder" />
          </Form.Item>
          <Form.Item name="create_date" label="创建时间">
            <RangePickerWrap bordered placeholder="placeholder" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="输入描述" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Space>
      </Row>
    </Form>
  )
  return [formData, cpt]
}

const BatchUpdateArea = (props: { onBatchUpdate: (val: any) => void }) => {
  const [form] = Form.useForm()
  const { onBatchUpdate } = props
  const onFinish = (values: any) => {
    onBatchUpdate(values)
    console.log('Finish:', values)
  }
  const onValuesChange = (data: any) => {
    console.log(data, 'data')
  }
  return (
    <Form
      form={form}
      className="batch-update-area"
      layout="inline"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Form.Item name="categroy">
        <Cascader options={category_type} placeholder="请选择分类" />
      </Form.Item>
      <Form.Item name="account_type">
        <SelectWrap
          style={{ width: '100px' }}
          placeholder="账户"
          options={cpt_const.account_type}
        />
      </Form.Item>
      <Form.Item name="tag">
        <SelectWrap placeholder="标签" options={cpt_const.tag_type} />
      </Form.Item>
      <Form.Item name="payment_type">
        <SelectWrap placeholder="付款方式" options={cpt_const.payment_type} />
      </Form.Item>
      <Form.Item name="abc_type">
        <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
      </Form.Item>
      <Form.Item name="cost_type">
        <SelectWrap placeholder="消费目的" options={cpt_const.cost_type} />
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
  const [selectedRows, setSelectedRows] = useState()
  const [tableData, setTableData] = useState<any>([])

  useEffect(() => {
    getDailyAmountTotal(formValue)
  }, [formValue])

  const getDailyAmountTotal = async (data: any) => {
    try {
      const res = await $api.getDailyAmountTotal({
        ...data,
        ...getDateTostring(data),
      })
      if (res) {
        setTableData(res)
        console.log(res, 'res')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onBatchUpdate = async (val: any) => {
    console.log({ filter: { selectedRows }, data: { ...val } }, 'updata')
    try {
      const res = await $api.updateMany({
        filter: { category: selectedRows },
        data: { ...val },
      })
      if (res.modifiedCount) {
        getDailyAmountTotal(formValue)
        message.success(`成功${res.modifiedCount}记录`)
      }
      console.log(res, 'update sucess')
    } catch (error) {}
  }

  return (
    <div className="record-page">
      {From}
      <BatchUpdateArea onBatchUpdate={onBatchUpdate} />
      <TableView
        formValue={formValue}
        tableData={tableData}
        setSelectedRows={(a) => {
          setSelectedRows(a)
        }}
      />
    </div>
  )
}

export default App
