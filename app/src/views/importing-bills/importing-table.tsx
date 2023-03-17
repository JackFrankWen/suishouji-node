import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  Typography,
} from 'antd'
import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'

export interface DataType {
  id: string
  amount: string
  category: string | null
  description: string | null
  account_type: number
  payment_type: number
  consumer: string
  flow_type: string
  creation_time: Date
  trans_time: Date
  modification_time: Date
  tag: string | null
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: DataType
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const BasicTable = (props: { tableData: any }) => {
  const { tableData } = props
  const [form] = Form.useForm()
  const [data, setData] = useState(tableData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: DataType) => record.id === editingKey

  const edit = (record: DataType) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as DataType
      console.log(row, 'rowrowrow')
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.id)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: '交易时间',
      dataIndex: 'trans_time',
      width: 200,
      defaultCheck: true,
    },
    {
      title: '分类',
      dataIndex: 'category',
      editable: true,
      width: 120,
      defaultCheck: true,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      editable: true,
      width: 100,
      defaultCheck: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      editable: true,
      ellipsis: true,
      defaultCheck: true,
    },
    {
      title: '类型',
      dataIndex: 'flow_type',
      width: 80,
      defaultCheck: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 120,

      render: (_: any, record: DataType) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  const [tableCol, setTablCol] = useState(mergedColumns)

  return (
    <div>
      <Card bordered={false}>
        <Row justify="end" align="middle">
          <Space>
            <Button type="primary">上传</Button>
            <TableSettingTool
              defaultColumns={mergedColumns}
              onChange={(tata) => setTablCol(tata)}
            />
          </Space>
        </Row>

        <Form form={form} component={false}>
          <Table
            rowKey="id"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={data}
            columns={tableCol}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </Card>
    </div>
  )
}
function useContent<T>() {
  const content = (props: { defaultColumns: any; handleChange: any }) => {
    const { defaultColumns, handleChange } = props
    const defaultValue = defaultColumns.map((val: any) => val.dataIndex)
    return (
      <Checkbox.Group
        defaultValue={defaultValue}
        style={{ width: '100%' }}
        onChange={(val) => {
          const data = defaultColumns.filter((data: any) =>
            val.includes(data.dataIndex)
          )
          handleChange(data)
        }}
      >
        <Row style={{ width: '100px' }}>
          {defaultColumns.map((val: any, index: number) => {
            return (
              <Col span={24} key={index}>
                <Checkbox value={val.dataIndex}>{val.title}</Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    )
  }
  const title = () => {
    return (
      <Row>
        <Col span={12}>
          <Checkbox>全选</Checkbox>
        </Col>
      </Row>
    )
  }
  return [content, title]
}

function TableSettingTool<T>(props: {
  defaultColumns: any
  onChange: (data: any) => void
}) {
  const { defaultColumns, onChange } = props
  const [open, setOpen] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const [Content, Title] = useContent()
  console.log()
  return (
    <Popover
      title={<Title defaultColumns={defaultColumns} handleChange={onChange} />}
      content={
        <Content defaultColumns={defaultColumns} handleChange={onChange} />
      }
      trigger="click"
      open={open}
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      <i className="ri-tools-line" style={{ fontSize: '24px' }}></i>
    </Popover>
  )
}

export default BasicTable
