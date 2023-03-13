import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
function Memerber(props: { placeholder?: string }) {
  const { placeholder } = props || {}
  return (
    <Radio.Group>
      <Radio.Button value="1">文</Radio.Button>
      <Radio.Button value="2">牛</Radio.Button>
      <Radio.Button value="3">牧牧</Radio.Button>
      <Radio.Button value="4">家庭</Radio.Button>
    </Radio.Group>
  )
}

export default Memerber
