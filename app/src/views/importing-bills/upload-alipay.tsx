import React, { useEffect, useState } from 'react'
import type { UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import Papa from 'papaparse'
import './importing-bills.less'
import BasicTable from './importing-table'
import { toNumberOrUndefiend } from '@/src/components/utils'
const { Dragger } = Upload
function trimString(str: unknown) {
  if (typeof str !== 'string') {
    return str // If the input is not a string, return it as is
  }
  return str.trim() // If the input is a string, trim it and return the result
}

function formateToTableAlipay(
  arr: string[][],
  account_type: number,
  payment_type: number
) {
  console.log(arr, 'arr')
  let costArr = arr.filter((subArr: string[]) => !/退款成功/.test(subArr[11]))
  costArr = costArr.filter((subArr: string[]) => !/交易关闭/.test(subArr[11]))
  costArr = costArr.filter((subArr: string[]) => !/资金转移/.test(subArr[15]))
  return costArr.map((subArr) => {
    // 0: "交易号"
    // 1: "商家订单号"
    // 2: "交易创建时间"
    // 3: "付款时间"
    // 4: "最近修改时间"
    // 5: "交易来源地"
    // 6: "类型"
    // 7: "交易对方"
    // 8: "商品名称"
    // 9: "金额（元）"
    // 10: "收/支"
    // 11: "交易状态 "
    // 12: "服务费（元）"
    // 13: "成功退款（元）"
    // 14: "备注                  "
    // 15: "资金状态 "
    const amount = subArr[9] || ''
    const description = `${trimString(subArr[7])}（${trimString(
      subArr[8]
    )}）${trimString(subArr[14])}`

    return {
      id: subArr[0],
      amount: amount.trim(),
      description: description,
      account_type: account_type,
      payment_type: payment_type,
      flow_type: /支出/.test(subArr[15]) ? 1 : 2,
      category: undefined,
      consumer: undefined,
      tag: undefined,
      cost_type: undefined,
      abc_type: undefined,
      creation_time: undefined,
      trans_time: (subArr[2] || '').trim(),
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
  // 0: ['支付宝交易记录明细查询']
  // 1: ['账号:[79071077@qq.com]']
  // 2: ['起始日期:[2023-01-01 00:00:00]    终止日期:[2023-03-19 21:14:30]']
  // 3: ['---------------------------------交易记录明细列表------------------------------------']
  // 4: (17) ['交易号                  ', '商家订单号               ', '交易创建时间              ', '付款时间                ', '最近修改时间              ', '交易来源地     ', '类型              ', '交易对方            ', '商品名称                ', '金额（元）   ', '收/支     ', '交易状态    ', '服务费（元）   ', '成功退款（元）  ', '备注                  ', '资金状态     ', '']
  // 5: ['------------------------------------------------------------------------------------']
  // 6: ['共201笔记录']
  // 7: (2) ['已收入:2笔', '13.67元']
  // 8: (2) ['待收入:0笔', '0.00元']
  // 9: (2) ['已支出:55笔', '1999.92元']
  // 10: (2) ['待支出:0笔', '0.00元']
  // 11: ['导出时间:[2023-03-19 21:14:30]    用户:文素能'
  const regex = /用户:(.*)/
  // a regular expression to match the text inside square brackets
  console.log(arr[11], 'arr[11s')
  return {
    name: arr?.[11]?.[0].match(regex)[1],
    date: arr?.[2],
    titleCostLabel: arr[9][0],
    titleCost: arr[9][1],
    titleIncome: arr[7][1],
    titleIncomeLabel: arr[7][0],
  }
}

const AlipayUpload = (props: { ruleData: any }) => {
  const [tableData, setTableData] = useState([])
  const [tableHeader, setTableHeader] = useState({})

  const [uploadVisable, setUploadVisiable] = useState(true)
  const [tableVisable, setTableVisable] = useState(false)
  const ALIPAY = 1
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
          const csvHeader = [...csvData.slice(0, 5), ...csvData.slice(-7)]
          const csvContent = csvData.slice(5, csvData.length - 7)
          let tableProps: any = formateToTableWechatHeader(csvHeader)
          let tableData: any = formateToTableAlipay(csvContent, ALIPAY, 2)

          console.log(tableData, 'csvContent')
          // console.log(csvContent, 'csvHeader')
          tableData = setCategory(tableData, props.ruleData)
          //   // setTableData()
          console.log(csvHeader, 'ppp')
          //   console.log(tableData, '222')
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

  return (
    <>
      {uploadVisable && (
        <div className="upload-wrap">
          <Dragger {...uploadProps}>
            <div className="upload-cus-container">
              <i
                style={{ color: '#0080ff', fontSize: '128px', opacity: '0.4' }}
                className="ri-alipay-fill"
              ></i>
              <p
                className="ant-upload-text"
                style={{
                  position: 'absolute',
                  top: '50%',
                  marginTop: '60px',
                }}
              >
                点击或拖拽上传支付宝csv文件
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

export default AlipayUpload
