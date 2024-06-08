import { category_type } from '@/core/api/const/category'
import { cpt_const } from '@/core/api/const/web'
import SelectWrap from '@/src/components/form/SelectWrap'
import { getDateTostring, toNumberOrUndefiend } from '@/src/components/utils'
import {
  Button,
  Cascader,
  Form,
  InputNumber,
  Popconfirm,
  Space,
  Input,
} from 'antd'
import type { DefaultOptionType } from 'antd/es/cascader'

import React, { useEffect, useState } from 'react'

const BatchUpdateArea = (props: {
  disabled: boolean
  onBatchUpdate: (val: any) => void
  onBatchDelete: () => void
}) => {
  const [form] = Form.useForm()
  const { onBatchUpdate, onBatchDelete, disabled } = props
  const onFinish = (values: any) => {
    onBatchUpdate(values)
    if (values.amount || values.description) {
      form.resetFields()
    }
  }
  return (
    <Form
      form={form}
      className="batch-update-area"
      layout="inline"
      onFinish={onFinish}
    >
      <Form.Item name="category">
        <Cascader
          style={{ minWidth: '120px' }}
          options={category_type}
          showSearch={{
            filter: (inputValue: string, path: DefaultOptionType[]) =>
              path.some(
                (option) =>
                  (option.label as string)
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) > -1
              ),
          }}
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
          allowClear
          placeholder="请选择分类"
        />
      </Form.Item>
      <Form.Item name="account_type">
        <SelectWrap
          style={{ width: '100px' }}
          placeholder="账户"
          options={cpt_const.account_type}
        />
      </Form.Item>
      <Form.Item name="payment_type">
        <SelectWrap placeholder="付款方式" options={cpt_const.payment_type} />
      </Form.Item>
      <Form.Item name="consumer">
        <SelectWrap placeholder="消费成员" options={cpt_const.consumer_type} />
      </Form.Item>
      <Form.Item name="amount">
        <InputNumber placeholder="金额" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="描述" />
      </Form.Item>
      <Form.Item shouldUpdate>
        <Space.Compact>
          <Button type="primary" htmlType="submit" disabled={disabled}>
            批量修改
          </Button>
          <Popconfirm
            title="是否批量删除"
            onConfirm={() => {
              onBatchDelete()
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <Button disabled={disabled}>批量删除</Button>
          </Popconfirm>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}

export default BatchUpdateArea
