import React, { useState } from 'react'
import { Card, Cascader, message } from 'antd'
import { Button, Form, Input, Radio, DatePicker } from 'antd'
import SelectWrap from '@/src/components/form/SelectWrap'
import { cpt_const } from '@/core/api/const/web'
import { category_type } from '@/core/api/const/category'
import { getDateTostring, toNumberOrUndefiend } from '@/src/components/utils'

import moment from 'moment'
type LayoutType = Parameters<typeof Form>[0]['layout']

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {}

  const onSubmit = async (val: any) => {
    try {
      setLoading(true)
      console.log(
        {
          ...val,
          category: JSON.stringify(val.category),
          trans_time: moment(val.trans_time).format('YYYY-MM-DD HH:mm:ss'),
        },
        'val'
      )
      const res = await $api.create_transaction({
        ...val,
        trans_time: moment(val.trans_time).format('YYYY-MM-DD HH:mm:ss'),
        category: JSON.stringify(val.category),
      })
      if (res.code === 200) {
        message.success('添加成功')
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ flow_type: 2 }}
      onFinish={onSubmit}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="类型" name="flow_type">
        <Radio.Group>
          <Radio.Button value={1}>支出</Radio.Button>
          <Radio.Button value={2}>收入</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="category">
        <Cascader
          options={category_type}
          allowClear
          placeholder="请选择分类"
          onChange={(category) => {
            if (category && category[0]) {
              const found = category_type.find(
                (val) => val.value === category[0]
              )
              if (found) {
                // @ts-ignore
                const obj: any = found?.children.find(
                  (val: any) => val.value === category[1]
                )

                form.setFieldsValue({
                  account_type: undefined,
                  payment_type: undefined,
                  tag: toNumberOrUndefiend(obj?.tag),
                  abc_type: toNumberOrUndefiend(obj?.abc_type),
                  consumer: toNumberOrUndefiend(obj?.consumer),
                  cost_type: toNumberOrUndefiend(obj?.cost_type),
                })
              }
            }
          }}
        />
      </Form.Item>
      <Form.Item name="account_type">
        <SelectWrap placeholder="账户" options={cpt_const.account_type} />
      </Form.Item>
      <Form.Item name="amount">
        <Input placeholder="金额" />
      </Form.Item>
      <Form.Item name="trans_time">
        <DatePicker placeholder="交易时间" />
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
      <Form.Item name="consumer">
        <SelectWrap placeholder="消费成员" options={cpt_const.consumer_type} />
      </Form.Item>
      <Form.Item name="abc_type">
        <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
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
