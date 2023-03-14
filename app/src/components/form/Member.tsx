import { cpt_const } from '@/core/api/const/web'
import { Radio, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectWrap from './SelectWrap'

function Memerber(props: { placeholder?: string }) {
  const { placeholder } = props || {}
  return <SelectWrap placeholder="成员" options={cpt_const.consumer_type} />
  return (
    <Radio.Group>
      <Radio.Button value="1">文</Radio.Button>
      <Radio.Button value="2">牛</Radio.Button>
      <Radio.Button value="3">牧牧</Radio.Button>
      <Radio.Button value="4">家庭</Radio.Button>
    </Radio.Group>
  )
}
export function useConsumer() {
  const [value, setValue] = useState()
  const cpt = (
    <Select
      allowClear
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="成员"
      options={cpt_const.consumer_type}
    />
  )
  return [value, cpt]
}

export default Memerber
