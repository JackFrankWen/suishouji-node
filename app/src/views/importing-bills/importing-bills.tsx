import React, { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import './importing-bills.less'
import WechatUpload from './record'
import AlipayUpload from './upload'
import Record from './record'

const Home: React.FC = () => {
  const [ruleData, setRuleData] = useState<any>()
  const getRuleData = async () => {
    try {
      const res = await $api.getALlMatchRule()
      console.log(res, 'rule')
      if (res) {
        setRuleData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getRuleData()
  }, [])
  const items = [
    {
      label: '导入文件',
      key: '1',
      children: <AlipayUpload ruleData={ruleData} />,
    },
    {
      label: '手动输入',
      key: '2',
      children: <Record />,
    },
  ]
  return <Tabs defaultActiveKey="1" centered items={items} />
}

export default Home
