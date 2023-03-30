import { Modal, Table, Tag, Tooltip } from 'antd'
import type { TableColumnsType } from 'antd'
import { getDateTostring, roundToTwoDecimalPlaces } from './utils'
import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table/interface'
import useModal from './ModalWrap'

interface ExpandedDataType {
  name: string
  age: number
  category: string
}
interface DataType {
  name: string
  age: number
  child: ExpandedDataType[]
}
const columns: ColumnsType<DataType> = [
  {
    title: '一级分类',
    dataIndex: 'name',
    width: '33%',
  },
  {
    title: '二级分类',
    dataIndex: 'oo',
    width: '33%',
  },

  {
    title: '金额',
    dataIndex: 'value',
    key: 'value',
    render: (val) => roundToTwoDecimalPlaces(val),
  },
]
const columns2 = [
  {
    title: '金额',
    dataIndex: 'amount',
    width: 80,
  },
  {
    title: '内容',
    dataIndex: 'description',

    ellipsis: true,
  },
  {
    title: '消费对象',
    width: 80,
    dataIndex: 'consumer',
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
      }
      return <Tag color="orange">{consumer_type[val]}</Tag>
    },
  },
  {
    title: '交易时间',
    width: 200,
    dataIndex: 'trans_time_formate',
    key: 'trans_time_formate',
  },
]
const expandedRowRender = (toggle: any) => (record: DataType) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: '一级分类', width: '35%', dataIndex: '' },
    { title: '二级分类', width: '33%', dataIndex: 'name' },
    {
      title: '金额',
      dataIndex: 'value',
      key: 'value',
      render: (val) => roundToTwoDecimalPlaces(val),
    },
  ]

  return (
    <>
      <Table
        onRow={(rowCol) => {
          return {
            onClick: () => {
              toggle(rowCol.category)
            }, // 点击行
          }
        }}
        rowClassName={(record, index) => {
          const className = index % 2 === 0 ? 'oddRow' : 'evenRow'
          return className
        }}
        showHeader={false}
        columns={columns}
        dataSource={record.child}
        pagination={false}
      />
    </>
  )
}

const CategoryTable = (props: { data: DataType[]; formValue: any }) => {
  const { data, formValue } = props
  const [show, toggle] = useModal()
  const [cate, setCate] = useState<string>('')
  const [modalData, setModaldata] = useState()
  const getCategory = async (data: any, category: string) => {
    try {
      const p = getDateTostring(data)
      const res = await $api.getCost({ ...p, category })
      if (res) {
        console.log(res, '===fff')
        setModaldata(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory(formValue, cate)
  }, [formValue, cate])

  const onRowClick = (val: string) => {
    toggle()
    setCate(val)
  }
  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        expandable={{
          indentSize: 0,
          expandRowByClick: true,
          expandedRowRender: expandedRowRender(onRowClick),
        }}
        dataSource={props.data}
        pagination={false}
      />
      {show && (
        <Modal width={1000} footer={null} open={show} onCancel={toggle}>
          <Table
            columns={columns2}
            dataSource={modalData}
            size="small"
            scroll={{ y: 300 }}
          />
        </Modal>
      )}
    </>
  )
}
export default CategoryTable
