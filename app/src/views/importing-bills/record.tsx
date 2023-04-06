import React, { useState } from 'react'
import { Card, Cascader } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import SelectWrap from '@/src/components/form/SelectWrap'
import { cpt_const } from '@/core/api/const/web'
import { category_type } from '@/core/api/const/category'

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
          <Radio.Button value="horizontal">支出</Radio.Button>
          <Radio.Button value="vertical">收入</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="category">
        <Cascader options={category_type} allowClear placeholder="请选择分类" />
      </Form.Item>
      <Form.Item name="account_type">
        <SelectWrap placeholder="账户" options={cpt_const.account_type} />
      </Form.Item>
      <Form.Item name="tag">
        <SelectWrap placeholder="标签" options={cpt_const.tag_type} />
      </Form.Item>
      <Form.Item name="payment_type">
        <SelectWrap placeholder="付款方式" options={cpt_const.payment_type} />
      </Form.Item>
      <Form.Item name="cost_type">
        <SelectWrap placeholder="消费目的" options={cpt_const.cost_type} />
      </Form.Item>
      <Form.Item name="abc_type">
        <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
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
