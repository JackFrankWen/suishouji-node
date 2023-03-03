import React, { useState } from 'react'
import { Button, Form, Input, Radio } from 'antd'
import RangePickerWrap from '@/src/components/RangePickerWrap'

type LayoutType = Parameters<typeof Form>[0]['layout']

const ReviewForm: React.FC = () => {
  const [form] = Form.useForm()

  const onFormLayoutChange = (val: any) => {
    console.log(val)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Layout" name="layout">
        <Radio.Group>
          <Radio.Button value="horizontal">年度账单分析</Radio.Button>
          <Radio.Button value="vertical">月支出分析</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="时间">
        <RangePickerWrap bordered />
      </Form.Item>
      <Form.Item>
        <Button type="primary">复盘</Button>
      </Form.Item>
    </Form>
  )
}
export default ReviewForm
