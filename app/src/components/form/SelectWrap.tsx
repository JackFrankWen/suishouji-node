import React from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

function SelectWrap(props: SelectProps) {
  return <Select {...props} />
}

export default SelectWrap
