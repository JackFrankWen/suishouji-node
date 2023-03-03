import { Radio } from 'antd'
import React, { useEffect, useState } from 'react'
function Memerber() {
  return (
    <Radio.Group>
      <Radio.Button value="year">老公</Radio.Button>
      <Radio.Button value="month">老婆</Radio.Button>
    </Radio.Group>
  )
}

export default Memerber
