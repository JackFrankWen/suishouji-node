import React, { useState } from 'react'
import { Card } from 'antd'
import { Button, Form, Input, Radio } from 'antd'

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
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  )
}

const About: React.FC<PageProps> = () => {
  return (
    <div className="about flex column center" style={{ height: '100%' }}>
      <Card title="去分析" hoverable>
        <App />
      </Card>
    </div>
  )
}

export default About
