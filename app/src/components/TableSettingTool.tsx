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
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
const Content = (props: { defaultColumns: any; onChange: any; value: any }) => {
  const { defaultColumns, value, onChange } = props

  return (
    <Checkbox.Group value={value} style={{ width: '100%' }} onChange={onChange}>
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

function TableSettingTool(props: {
  defaultColumns: any
  onChange: (data: any) => void
}) {
  const { defaultColumns, onChange } = props
  const [open, setOpen] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const defaultValue = defaultColumns.map((val: any) => val.dataIndex)
  const [value, setValue] = useState(defaultValue)
  const Title = () => {
    return (
      <Row>
        <Col span={12}>
          <Checkbox>全选</Checkbox>
        </Col>
      </Row>
    )
  }
  const CheckBoxChange = (val: string[]) => {
    const data = defaultColumns.filter((data: any) =>
      val.includes(data.dataIndex)
    )
    setIndeterminate(!!val.length && val.length < defaultValue.length)

    setValue(val)
    onChange(data)
  }
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked ? defaultValue : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return (
    <Popover
      title={
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
      }
      content={
        <Content
          defaultColumns={defaultColumns}
          value={value}
          onChange={CheckBoxChange}
        />
      }
      placement="bottomRight"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <i className="ri-list-settings-line"></i>
    </Popover>
  )
}

export default TableSettingTool
