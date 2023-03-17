import React, { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import moment from 'moment'
import Papa from 'papaparse'
import './importing-bills.less'
import BasicTable from './importing-table'
const { Dragger } = Upload

function formateToTableData(
  arr: string[][],
  account_type: number,
  payment_type: number
) {
  return arr.map((subArr) => {
    // 0: "交易时间"
    // 1: "交易类型"
    // 2: "交易对方"
    // 3: "商品"
    // 4: "收/支"
    // 5: "金额(元)"
    // 6: "支付方式"
    // 7: "当前状态"
    // 8: "交易单号"
    // 9: "商户单号"
    // 10: "备注"
    return {
      id: subArr[8],
      amount: subArr[5],
      category: null,
      description: `${subArr[3]}（${subArr[2]}）${subArr[10]}`,
      account_type: account_type,
      payment_type: payment_type,
      consumer: null,
      flow_type: null,
      creation_time: moment().format('YYYY-MM-DD HH:MM:SS'),
      trans_time: subArr[0],
      modification_time: moment().format('YYYY-MM-DD HH:MM:SS'),
      tag: null,
    }
  })
}
function setCategory(arr: any, rules: any) {
  return arr.map((val: any) => {
    for (const element of rules) {
      const reg = new RegExp(element.rule)
      const pp = reg.test(val.description)
      if (pp) {
        return {
          ...val,
          ...element,
        }
      }
    }
    return {
      ...val,
    }
  })
}
const WechatUpload = (props: { ruleData: any }) => {
  const [tableData, setTableData] = useState([])
  const [uploadVisable, setUploadVisiable] = useState(true)
  const [tableVisable, setTableVisable] = useState(false)

  const uploadProps: UploadProps = {
    name: 'file',
    beforeUpload: (file) => {
      Papa.parse(file, {
        header: false,
        encoding: 'gb18030',
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log(results)
          const csvData = results.data || []
          const csvHeader = csvData.slice(0, 17)
          const csvContent = csvData.slice(17)
          let pp: any = formateToTableData(csvContent, 1, 2)
          pp = setCategory(pp, props.ruleData)
          // setTableData()
          console.log(csvHeader, 'ppp')
          setTableData(pp)
          setTableVisable(true)
          setUploadVisiable(false)
        },
      })

      // Prevent upload
      return false
    },
  }

  return (
    <>
      {uploadVisable && (
        <div className="upload-wrap">
          <Dragger {...uploadProps}>
            <div className="upload-cus-container">
              <a
                style={{ color: '#17c317', fontSize: '128px', opacity: '0.4' }}
                className="ri-wechat-fill"
              ></a>
              <p>点击或拖拽上传csv文件</p>
            </div>
          </Dragger>
        </div>
      )}
      {tableVisable && (
        <div className="container">
          <BasicTable tableData={tableData} />
        </div>
      )}
    </>
  )
}

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
          <a style={{ color: '#17c317' }} className="ri-wechat-fill"></a>
          微信导入
        </span>
      ),
      key: '1',
      children: <WechatUpload ruleData={ruleData} />,
    },
    {
      label: (
        <span>
          <a style={{ width: '32px' }} className="ri-alipay-fill"></a>
          支付宝导入
        </span>
      ),
      key: '2',
      children: <WechatUpload ruleData={ruleData} />,
    },
  ]
  return <Tabs defaultActiveKey="1" centered items={items} />
}

export default Home
