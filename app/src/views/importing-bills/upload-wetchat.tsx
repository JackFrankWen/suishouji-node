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
  let costArr = arr.filter((subArr: string[]) => !/零钱通/.test(subArr[11]))
  return costArr.map((subArr) => {
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
      description: description.replace('[^\u0000-\uFFFF]', ''),
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
function formateToTableWechatHeader(arr: any) {
  // 0: (9) ['微信支付账单明细', '', '', '', '', '', '', '', '']
  // 1: (9) ['微信昵称：[Jack Frank]', '', '', '', '', '', '', '', '']
  // 2: (9) ['起始时间：[2023-02-16 00:00:00] 终止时间：[2023-03-16 10:51:23]', '', '', '', '', '', '', '', '']
  // 3: (9) ['导出类型：[全部]', '', '', '', '', '', '', '', '']
  // 4: (9) ['导出时间：[2023-03-16 10:51:39]', '', '', '', '', '', '', '', '']
  // 5: (9) ['', '', '', '', '', '', '', '', '']
  // 6: (9) ['共91笔记录', '', '', '', '', '', '', '', '']
  // 7: (9) ['收入：1笔 1666.00元', '', '', '', '', '', '', '', '']
  // 8: (9) ['支出：90笔 1221.01元', '', '', '', '', '', '', '', '']
  // 9: (9) ['中性交易：0笔 0.00元', '', '', '', '', '', '', '', '']
  // 10: (9) ['注：', '', '', '', '', '', '', '', '']
  // 11: (9) ['1. 充值/提现/理财通购买/零钱通存取/信用卡还款等交易，将计入中性交易', '', '', '', '', '', '', '', '']
  // 12: (9) ['2. 本明细仅展示当前账单中的交易，不包括已删除的记录', '', '', '', '', '', '', '', '']
  // 13: (9) ['3. 本明细仅供个人对账使用', '', '', '', '', '', '', '', '']
  // 14: (9) ['', '', '', '', '', '', '', '', '']
  // 15: (9) ['----------------------微信支付账单明细列表--------------------', '', '', '', '', '', '', '', '']
  // 16: (11) ['交易时间', '交易类
  const regex = /\[(.*?)\]/ // a regular expression to match the text inside square brackets
  return {
    name: arr[1][0].match(regex)[1],
    date: arr[2],
  }
}
const WechatUpload = (props: { ruleData: any }) => {
  const [tableData, setTableData] = useState([])
  const [tableHeader, setTableHeader] = useState({})
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
          let tableProps: any = formateToTableWechatHeader(csvHeader)
          tableData = setCategory(tableData, props.ruleData)
          // setTableData()
          console.log(tableProps, 'tableProps')
          setTableData(tableData)
          setTableHeader(tableProps)
          setTableVisable(true)
          setUploadVisiable(false)
        },
      })

      // Prevent upload
      return false
    },
  }
  console.log(tableHeader, 'tableHeader')
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
          <BasicTable tableData={tableData} tableHeader={tableHeader} />
        </div>
      )}
    </>
  )
}

export default WechatUpload
