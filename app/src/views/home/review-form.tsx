import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import moment from 'moment'

const useReviewForm = () => {
  const [form] = Form.useForm()
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const initialValues = { type: 'year', date: [firstDayOfYear, lastDayOfYear] }
  const [formData, setFormData] = useState(initialValues)

  const onFormLayoutChange = (val: any) => {
    console.log(val)
  }
  const onFinish = (val: any) => {
    setFormData(val)
  }
  const cpt = (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="分析种类" name="type">
        <Radio.Group>
          <Radio.Button value="year">年度账单分析</Radio.Button>
          <Radio.Button value="month">月支出分析</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="时间" name="date">
        <RangePickerWrap bordered />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          复盘
        </Button>
      </Form.Item>
    </Form>
  )
  return [formData, cpt]
}
export default useReviewForm
