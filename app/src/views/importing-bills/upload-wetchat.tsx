import React, { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import moment from 'moment'
import Papa from 'papaparse'
import './importing-bills.less'
import BasicTable from './importing-table'
import { toNumberOrUndefiend } from '@/src/components/utils'
const { Dragger } = Upload

function formateToTableDataWechat(
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
    const amount = subArr[5] || ''
    const description = `${subArr[3]}（${subArr[2]}）${subArr[10]}`
    return {
      id: subArr[8],
      amount: amount.replace('¥', ''),
      description: description.replace('\\', ''),
      account_type: account_type,
      payment_type: payment_type,
      flow_type: subArr[4] === '支出' ? 1 : 2,
      category: undefined,
      consumer: undefined,
      tag: undefined,
      cost_type: undefined,
      abc_type: undefined,
      creation_time: undefined,
      trans_time: subArr[0],
      modification_time: undefined,
    }
  })
}
function setCategory(arr: any, rules: any) {
  return arr.map((val: any) => {
    for (const element of rules) {
      const reg = new RegExp(element.rule)
      const hasRule = reg.test(val.description)
      if (hasRule) {
        return {
          ...val,
          category: element.category,
          consumer: toNumberOrUndefiend(element.consumer),
          tag: toNumberOrUndefiend(element.tag),
          cost_type: toNumberOrUndefiend(element.cost_type),
          abc_type: toNumberOrUndefiend(element.abc_type),
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
          let tableData: any = formateToTableDataWechat(csvContent, 1, 2)
          tableData = setCategory(tableData, props.ruleData)
          // setTableData()
          console.log(csvHeader, 'ppp')
          console.log(tableData, '222')
          setTableData(tableData)
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
              <i
                style={{ color: '#17c317', fontSize: '128px', opacity: '0.4' }}
                className="ri-wechat-fill"
              ></i>
              <p
                className="ant-upload-text"
                style={{
                  position: 'absolute',
                  top: '50%',
                  marginTop: '60px',
                }}
              >
                点击或拖拽上传微信csv文件
              </p>
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

export default WechatUpload
