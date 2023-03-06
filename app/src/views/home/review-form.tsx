import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import RangePickerWrap from '@/src/components/RangePickerWrap'

const ReviewForm: React.FC = () => {
  const [form] = Form.useForm()

  const onFormLayoutChange = (val: any) => {
    console.log(val)
  }
  const onFinish = (val: any) => {
    console.log(val)
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        type: 'year',
      }}
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
}
export default ReviewForm
