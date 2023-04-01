import { category_type } from '@/core/api/const/category'
import { cpt_const } from '@/core/api/const/web'
import RangePickerWrap from '@/src/components/form/RangePickerWrap'
import SelectWrap from '@/src/components/form/SelectWrap'
import { getDateTostring, toNumberOrUndefiend } from '@/src/components/utils'
import {
  Button,
  Cascader,
  Drawer,
  Form,
  Input,
  message,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from 'antd'
import moment from 'moment'

import React, { useEffect, useState } from 'react'
import TableView from './daily-table'
import './accounting.less'
import RuleForm from '../about/rule-form'
const { Search } = Input

const AdvancedSearchForm = (props: {
  onChange: (a: any) => void
  formValue: any
}) => {
  const { formValue, onChange } = props
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const onFinish = (values: any) => {
    const searchVal = {
      ...values,
      description: values.description
        ? { $regex: values.description }
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
      if (res.modifiedCount) {
        message.success(`成功更行了${res.modifiedCount}条`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form
      form={form}
      initialValues={formValue}
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Space>
          <Form.Item name="exist">
            <Radio.Group>
              <Radio.Button value="1">正常</Radio.Button>
              <Radio.Button value="2">分类无</Radio.Button>
              <Radio.Button value="3">ABC无</Radio.Button>
              <Radio.Button value="4">消费目的无</Radio.Button>
            </Radio.Group>
          </Form.Item>
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
          <Form.Item name="create_date" label="创建">
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

const BatchUpdateArea = (props: {
  onBatchUpdate: (val: any) => void
  onBatchDelete: () => void
}) => {
  const [form] = Form.useForm()
  const { onBatchUpdate, onBatchDelete } = props
  const onFinish = (values: any) => {
    onBatchUpdate(values)
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
          options={category_type}
          onChange={(category) => {
            const found = category_type.find((val) => val.value === category[0])
            const obj: any = found?.children.find(
              (val) => val.value === category[1]
            )

            form.setFieldsValue({
              account_type: undefined,
              payment_type: undefined,
              tag: toNumberOrUndefiend(obj?.tag),
              abc_type: toNumberOrUndefiend(obj?.abc_type),
              consumer: toNumberOrUndefiend(obj?.consumer),
              cost_type: toNumberOrUndefiend(obj?.cost_type),
            })
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
      <Form.Item name="tag">
        <SelectWrap placeholder="标签" options={cpt_const.tag_type} />
      </Form.Item>
      <Form.Item name="payment_type">
        <SelectWrap placeholder="付款方式" options={cpt_const.payment_type} />
      </Form.Item>
      <Form.Item name="consumer">
        <SelectWrap placeholder="消费成员" options={cpt_const.consumer_type} />
      </Form.Item>
      <Form.Item name="abc_type">
        <SelectWrap placeholder="ABC分类" options={cpt_const.abc_type} />
      </Form.Item>
      <Form.Item name="cost_type">
        <SelectWrap placeholder="消费目的" options={cpt_const.cost_type} />
      </Form.Item>
      <Form.Item shouldUpdate>
        <Space.Compact>
          <Button type="primary" htmlType="submit">
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
            <Button>批量删除</Button>
          </Popconfirm>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}

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
const App: React.FC = () => {
  const now = moment() // get the current date/time in Moment.js format

  const firstDayOfYear = now.clone().startOf('year') // get the first day of the current year
  const lastDayOfYear = now.clone().endOf('year') // get
  const initialValues = { type: 'year', date: [firstDayOfYear, lastDayOfYear] }

  const [formValue, setFormValue] = useState(initialValues)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [tableData, setTableData] = useState<any>([])

  useEffect(() => {
    getDailyAmountTotal(formValue)
  }, [formValue])

  const refresh = () => {
    getDailyAmountTotal(formValue)
  }
  const getDailyAmountTotal = async (data: any) => {
    try {
      const res = await $api.getDailyAmountTotal({
        ...data,
        ...getDateTostring(data),
        ...handleExist(data),
      })
      if (res) {
        setTableData(res)
        console.log(res, 'res')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onBatchUpdate = async (val: any) => {
    try {
      const res = await $api.updateMany({
        filter: {
          ids: selectedRows.filter((val: string) => val.length !== 10),
        },
        data: {
          ...val,
          category: val?.category ? JSON.stringify(val.category) : undefined,
        },
      })
      if (res.modifiedCount) {
        getDailyAmountTotal(formValue)
        setSelectedRows([])
        message.success(`成功${res.modifiedCount}记录`)
      }
      console.log(res, 'update sucess')
    } catch (error) {}
  }
  const onBatchDelete = async () => {
    try {
      const res = await $api.deleteMany({
        filter: {
          ids: selectedRows.filter((val: string) => val.length !== 10),
        },
      })
      if (res.deletedCount) {
        getDailyAmountTotal(formValue)
        setSelectedRows([])
        message.success(`成功删除${res.deletedCount}记录`)
      }
    } catch (error) {}
  }

  return (
    <div className="record-page">
      <AdvancedSearchForm onChange={setFormValue} formValue={formValue} />
      <BatchUpdateArea
        onBatchUpdate={onBatchUpdate}
        onBatchDelete={onBatchDelete}
      />
      <TableView
        selectedRows={selectedRows}
        formValue={formValue}
        tableData={tableData}
        setSelectedRows={(a) => {
          setSelectedRows(a)
        }}
      />
    </div>
  )
}

export default App
