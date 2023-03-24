import React, { useState } from 'react'
import { Card } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import SelectWrap from '@/src/components/form/SelectWrap'
import { cpt_const } from '@/core/api/const/web'

type LayoutType = Parameters<typeof Form>[0]['layout']

const App: React.FC = () => {
  const [form] = Form.useForm()

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {}

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Layout" name="layout">
        <Radio.Group>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
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
      <Form.Item name="payment_type">
        <SelectWrap placeholder="付款方式" options={cpt_const.payment_type} />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  )
}

const Record = () => {
  return (
    <div className="about flex column center" style={{ height: '100%' }}>
      <Card title="去分析" hoverable>
        <App />
      </Card>
    </div>
  )
}

export default Record
