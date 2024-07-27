import React, { useState } from 'react'
import { TableRowSelection } from 'antd/es/table/interface'
import { message, Table } from 'antd'
import BatchUpdateArea from '@/src/views/accounting/batch-update'
import { detailTableCol } from '@/src/components/DetailTableCol'
import { DataType } from '@/src/components/CategoryTable'

export function DetailTable(props: {
  modalData: any
  refresh: () => void
  columns: any
  defaultPageSize?: number
}) {
  const [selectedRows, setSelectedRows] = useState<any>([])
  const [chosenItem, setChoseItem] = useState<any>([])
  const { modalData, refresh, columns, defaultPageSize } = props
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      setSelectedRows(selectedRowKeys)
      setChoseItem(selectedRows)
    },
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
        refresh()
        setSelectedRows([])
        message.success(`成功${res.modifiedCount}记录`)
      }
      console.log(res, 'update sucess')
    } catch (error) {
      console.log(error)
    }
  }
  const onBatchDelete = async () => {
    try {
      const res = await $api.deleteMany({
        filter: {
          ids: selectedRows.filter((val: string) => val.length !== 10),
        },
      })
      if (res.deletedCount) {
        refresh()
        setSelectedRows([])
        message.success(`成功删除${res.deletedCount}记录`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const selectRow = (record: any) => {
    const selectedRowKeys = [...selectedRows]
    console.log(record, 'record')
    if (selectedRowKeys.indexOf(record.m_id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.m_id), 1)
    } else {
      selectedRowKeys.push(record.m_id)
    }
    setSelectedRows(selectedRowKeys)
  }
  console.log(selectedRows, 'modalData')
  const selectedAmount = chosenItem.reduce((pre: number, cur: any) => {
    return pre + Number(cur.amount)
  }, 0)
  return (
    <>
      <div style={{ padding: '8px 0' }}>
        <BatchUpdateArea
          disabled={selectedRows.length === 0}
          onBatchUpdate={onBatchUpdate}
          onBatchDelete={onBatchDelete}
        />
      </div>
      {selectedRows.length > 0 && (
        <div style={{ padding: '8px 0' }}>
          <span>选中金额 {selectedAmount} 元</span>
        </div>
      )}
      <Table
        pagination={{
          defaultPageSize, // default show 10 records per page
          pageSizeOptions: [10, 50, 100],
          showSizeChanger: true,
        }}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record)
          },
        })}
        rowSelection={rowSelection}
        rowKey="m_id"
        columns={columns}
        dataSource={modalData}
        size="small"
        scroll={{ y: 400 }}
      />
    </>
  )
}
