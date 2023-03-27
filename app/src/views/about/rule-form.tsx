import React, { useState } from 'react'
import { Card, Cascader } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import SelectWrap from '@/src/components/form/SelectWrap'
import { cpt_const } from '@/core/api/const/web'
import { category_type } from '@/core/api/const/category'

const RuleForm: React.FC = () => {
  const [form] = Form.useForm()

  const onFormLayoutChange = ({ category }: { category: [number, number] }) => {
    console.log(category, 'category')
    if (category) {
      const found = category_type.find((val) => val.value === category[0])
      const obj = found?.children.find((val) => val.value === category[1])
      if (obj) {
        Object.keys(obj).forEach((key) => {
          console.log(key)
          if (!['value', 'label'].includes(key)) {
            form.setFieldValue(key, obj[key])
          }
        })
      }
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="rule">
        <Input placeholder="规则" />
      </Form.Item>
      <Form.Item name="category">
        <Cascader options={category_type} allowClear placeholder="请选择分类" />
      </Form.Item>
      <Form.Item name="tag">
        <SelectWrap placeholder="标签" options={cpt_const.tag_type} />
      </Form.Item>
      <Form.Item name="consumer">
        <SelectWrap placeholder="消费者" options={cpt_const.consumer_type} />
      </Form.Item>
      <Form.Item name="cost_type">
        <SelectWrap placeholder="消费目的" options={cpt_const.cost_type} />
      </Form.Item>
      <Form.Item name="abc_type">
        <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
      </Form.Item>
      <Form.Item>
        <Button type="primary">提交</Button>
      </Form.Item>
    </Form>
  )
}

export default RuleForm
