import { Tag } from 'antd'
import React from 'react'

export function getConsumerTag(val: number | number) {
  const consumer_type = {
    1: '老公',
    2: '老婆',
    3: '家庭',
    4: '牧牧',
    5: '爷爷奶奶',
    6: '溪溪',
    7: '姥姥姥爷',
  }
  if (val === 1) {
    return <Tag color="cyan">{consumer_type[val]}</Tag>
  } else if (val === 2) {
    return <Tag color="magenta">{consumer_type[val]}</Tag>
  } else if (val === 3) {
    return <Tag color="geekblue">{consumer_type[val]}</Tag>
  } else if (val === 4) {
    return <Tag color="purple">{consumer_type[val]}</Tag>
  } else if (val === 5) {
    return <Tag color="lime">{consumer_type[val]}</Tag>
  } else if (val === 6) {
    return <Tag color="orange">{consumer_type[val]}</Tag>
  } else if (val === 7) {
    return <Tag color="gold">{consumer_type[val]}</Tag>
  }
  return consumer_type[val]
}
