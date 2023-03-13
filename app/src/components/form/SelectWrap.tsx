import React from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

function SelectWrap(props: {
  placeholder: string
  options: SelectProps['options']
}) {
  const { placeholder, options } = props
  return <Select placeholder={placeholder} allowClear options={options} />
}

export default SelectWrap
