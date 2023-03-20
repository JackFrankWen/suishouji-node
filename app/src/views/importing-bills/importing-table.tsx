import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import TableSettingTool from '@/src/components/TableSettingTool'
import { getCategoryString } from '@/core/api/const/category'
import { abc_type, cost_type, cpt_const, tag_type } from '@/core/api/const/web'

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

const BasicTable = (props: { tableData: any; tableHeader: any }) => {
  const { tableData, tableHeader } = props
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
      width: 180,
      defaultCheck: true,
      fixed: 'left',
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
      title: '分类',
      dataIndex: 'category',
      width: 120,
      defaultCheck: false,
      render: (val: string) => {
        const list = val ? JSON.parse(val) : []
        console.log(list, 'list')
        return list.length > 0 ? getCategoryString(list) : ''
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      editable: true,
      ellipsis: true,
      defaultCheck: true,
    },
    {
      title: '对象',
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
      render: (val: number) => (val === 1 ? '支出' : '收入'),
    },
    {
      title: '标签',
      dataIndex: 'tag',
      width: 80,
      defaultCheck: false,
      render: (val: number) => (val ? tag_type[val] : ''),
    },
    {
      title: 'ABC类',
      dataIndex: 'abc_type',
      width: 80,
      defaultCheck: false,
      render: (val: number) => (val ? abc_type[val] : ''),
    },
    {
      title: '消费方式',
      dataIndex: 'cost_type',
      width: 120,
      defaultCheck: false,
      render: (val: number) => (val ? cost_type[val] : ''),
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
  const [tableCol, setTablCol] = useState<any>()
  const [checkedCol, setCheckedCol] = useState<any>()
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
    console.log(editingKey, 'editingKey')
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

  const tableSummary = (pageData: any) => {
    let totalCost = 0
    let totalIncome = 0
    pageData.forEach((obj: any) => {
      if (obj.flow_type === 1) {
        totalCost += Number(obj.amount)
      } else {
        totalIncome += Number(obj.amount)
      }
    })
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>支出</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <a>{totalCost}</a>
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>收入</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <a>{totalIncome}</a>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    )
  }
  return (
    <div>
      <Card bordered={false}>
        <Row align="middle" justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '24px' }}>收入 50600.00元</span>
            <span style={{ fontSize: '24px', marginLeft: '12px' }}>
              支出 14297.50元
            </span>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Space>
            <span style={{ fontSize: '12px' }}>账号:{tableHeader?.name}</span>
            <span style={{ fontSize: '12px' }}>{tableHeader?.date}</span>
          </Space>
          <Space>
            <Button type="primary" onClick={submit}>
              上传
            </Button>
            <TableSettingTool
              defaultColumns={mergedColumns}
              onChange={(checkedGroup: string[]) => {
                setCheckedCol(checkedGroup)
                const data = mergedColumns.filter((data: any) =>
                  checkedGroup.includes(data.dataIndex)
                )
                setTablCol(data)
              }}
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
            size="small"
            columns={tableCol}
            rowClassName="editable-row"
            summary={tableSummary}
            scroll={{ x: 1500 }}
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
