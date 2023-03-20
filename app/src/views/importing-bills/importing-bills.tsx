import React, { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import './importing-bills.less'
import WechatUpload from './upload-wetchat'
import AlipayUpload from './upload-alipay'

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
      label: (
        <span>
          <a className="ri-alipay-fill"></a>
          支付宝
        </span>
      ),
      key: '1',
      children: <AlipayUpload ruleData={ruleData} />,
    },
    {
      label: (
        <span>
          <i style={{ color: '#17c317' }} className="ri-wechat-fill"></i>
          微信
        </span>
      ),
      key: '2',
      children: <WechatUpload ruleData={ruleData} />,
    },
  ]
  return <Tabs defaultActiveKey="1" centered items={items} />
}

export default Home
