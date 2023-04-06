import { category_type } from '@/core/api/const/category'
import { cpt_const } from '@/core/api/const/web'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import SelectWrap from '@/src/components/form/SelectWrap'
import { getDateTostring } from '@/src/components/utils'
import {
  Button,
  Cascader,
  Drawer,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Space,
} from 'antd'
import type { MenuProps } from 'antd'

const { confirm } = Modal

import React, { useEffect, useState } from 'react'
import RuleForm from '../about/rule-form'
const { Search } = Input

function handleExist(data: any) {
  const exsit: any = {}
  if (data.exist === 1) {
  } else if (data.exist === '2') {
    exsit.category = { $exists: false }
  } else if (data.exist === '3') {
    exsit.abc_type = { $exists: false }
  } else if (data.exist === '4') {
    exsit.cost_type = { $exists: false }
  }
  return { ...exsit }
}
const AdvancedSearchForm = (props: {
  onChange: (a: any) => void
  refresh: () => void
  formValue: any
}) => {
  const { formValue, onChange, refresh } = props
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const onFinish = (values: any) => {
    const searchVal = {
      ...values,
      description: values.description
        ? { $regex: '.*' + values.description + '.*' }
        : undefined,
    }
    onChange(searchVal)
  }
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const classifyItem = async () => {
    const data = form.getFieldsValue(true)
    try {
      const res = await $api.autoClassify({
        ...data,
        ...getDateTostring(data),
        ...handleExist({ exist: '2' }),
      })
      console.log(res, 'autoClassify')
      if (res.modifiedCount) {
        refresh()
        message.success(`成功更行了${res.modifiedCount}条`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onValuesChange = ({
    exist,
    category,
  }: {
    exist: string
    category: any
  }) => {
    if (exist) {
      form.setFieldValue('category', [])
      form.setFieldValue('abc_type', undefined)
      form.setFieldValue('cost_type', undefined)
      const val = form.getFieldsValue()
      onChange({ ...val, ...getDateTostring(val), ...handleExist({ exist }) })
    }
  }
  const onMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === '1') {
      try {
        const res = await $api.correntHistory()
        console.log(res, 'ressss')
        if (res.modifiedCount) {
          refresh()
          message.success(`成功更行了${res.modifiedCount}条`)
        }
      } catch (error) {}
    }
    console.log('click', e)
  }

  return (
    <Form
      form={form}
      initialValues={formValue}
      onValuesChange={onValuesChange}
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row>
        <Space>
          <Form.Item name="exist">
            <Radio.Group>
              <Radio.Button value="1">正常</Radio.Button>
              <Radio.Button value="2">分类无</Radio.Button>
              <Radio.Button value="3">ABC无</Radio.Button>
              <Radio.Button value="4">消费目的无</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="create_date" label="创建">
            <RangePickerWrap bordered placeholder="placeholder" />
          </Form.Item>
        </Space>
      </Row>
      <Row>
        <Space>
          {form.getFieldValue('exist') !== '2' && (
            <Form.Item name="category">
              <Cascader
                options={category_type}
                allowClear
                multiple
                showCheckedStrategy="SHOW_CHILD"
                maxTagCount={3}
                style={{ width: '100%', minWidth: '120px' }}
                placeholder="请选择分类"
              />
            </Form.Item>
          )}
          <Form.Item name="account_type">
            <SelectWrap
              style={{ width: '100px' }}
              placeholder="账户"
              options={cpt_const.account_type}
            />
          </Form.Item>
          <Form.Item name="consumer">
            <SelectWrap
              placeholder="消费成员"
              options={cpt_const.consumer_type}
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
          <Form.Item name="description">
            <Search
              placeholder="请输入描述"
              onSearch={(val) => {
                console.log(val, 'string')
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={showDrawer}>规则</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={classifyItem}>一键分类</Button>
          </Form.Item>
          <Form.Item>
            <Dropdown.Button
              menu={{
                items: [
                  {
                    key: '1',
                    label: '修复历史数据空格',
                  },
                  {
                    key: '2',
                    label: '2nd item',
                  },
                  {
                    key: '3',
                    label: '3rd item',
                  },
                ],
                onClick: onMenuClick,
              }}
            >
              慎用
            </Dropdown.Button>
          </Form.Item>
          {open && (
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              maskClosable={false}
              open={open}
            >
              <RuleForm
                refresh={() => {
                  onClose()
                }}
              />
            </Drawer>
          )}
        </Space>
      </Row>
    </Form>
  )
  // return [formData, cpt]
}

export default AdvancedSearchForm
