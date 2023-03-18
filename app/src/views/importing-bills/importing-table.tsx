import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import TableSettingTool from '@/src/components/TableSettingTool'
import { getCategoryString } from '@/core/api/const/category'

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
  const onDelete = (record: DataType) => {
    setEditingKey(record.id)
    const newData = data.filter((obj: DataType) => obj.id !== record.id)
    setData(newData)
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
      width: 120,
      defaultCheck: true,
      render: (val: string) => {
        const list = val ? JSON.parse(val) : []
        console.log(list, 'list')
        return list.length > 0 ? getCategoryString(list) : ''
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      render: (val: string) => {
        return val ? `¥${val}` : ''
      },
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
      title: '消费对象',
      width: 80,
      dataIndex: 'consumer',
      defaultCheck: false,

      key: 'consumer',
      render: (val: number) => {
        const consumer_type = {
          1: '老公',
          2: '老婆',
          3: '家庭',
          4: '牧牧',
        }
        if (val === 1) {
          return <Tag color="cyan">{consumer_type[val]}</Tag>
        } else if (val === 2) {
          return <Tag color="magenta">{consumer_type[val]}</Tag>
        } else if (val === 3) {
          return <Tag color="geekblue">{consumer_type[val]}</Tag>
        } else if (val === 4) {
          return <Tag color="orange">{consumer_type[val]}</Tag>
        }
      },
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
          <Space>
            <i
              className="ri-delete-bin-line"
              onClick={() => onDelete(record)}
              style={{ color: 'red' }}
            ></i>
          </Space>
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
  useEffect(() => {
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
    setTablCol(mergedColumns)
  }, [editingKey])

  const submit = async () => {
    try {
      //
      const res = await $api.insert_many(data)
      console.log(res, 'res')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Card bordered={false}>
        <Row justify="end" align="middle">
          <Space>
            <Button type="primary" onClick={submit}>
              上传
            </Button>
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
            onRow={(record) => {
              return {
                onDoubleClick: () => edit(record),
              }
            }}
            dataSource={data}
            columns={tableCol}
            rowClassName="editable-row"
            pagination={{
              showSizeChanger: true,
              onChange: cancel,
            }}
          />
        </Form>
      </Card>
    </div>
  )
}

export default BasicTable
