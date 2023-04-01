import React, { useEffect, useState } from 'react'
import { Button, Result, UploadProps } from 'antd'
import { Upload, Tabs } from 'antd'
import Papa from 'papaparse'
import './importing-bills.less'
import BasicTable from './importing-table'
import { Link } from 'react-router-dom'

import { toNumberOrUndefiend } from '@/src/components/utils'
import {
  formateToTableAlipay,
  formateToTableAlipayHeader,
  formateToTableDataWechat,
  formateToTableWechatHeader,
} from './upload-utils'
const { Dragger } = Upload

function setCategory(arr: any, rules: any) {
  return arr.map((val: any) => {
    for (const element of rules) {
      const reg = new RegExp(element.rule)
      const hasRule = reg.test(val.description)
      if (hasRule) {
        return {
          ...val,
          category: element.category,
          consumer: toNumberOrUndefiend(element.consumer) || val.consumer,
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

const AlipayUpload = (props: { ruleData: any }) => {
  const [tableData, setTableData] = useState([])
  const [tableHeader, setTableHeader] = useState({
    name: '',
    date: '',
    titleCostLabel: '',
    fileName: '',
    titleCost: '',
    titleIncomeLabel: '',
    titleIncome: '',
    account_type: 0,
  })

  const [uploadVisable, setUploadVisiable] = useState(true)
  const [tableVisable, setTableVisable] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const ALIPAY = 1
  const WECHAT = 2
  const uploadProps: UploadProps = {
    name: 'file',
    fileList: [],
    beforeUpload: (file) => {
      Papa.parse(file, {
        header: false,
        encoding: 'gb18030',
        skipEmptyLines: true,
        complete: function (results: any) {
          console.log(results)
          const csvData = results.data || []
          console.log(csvData, 'csvfirs')
          if (/微信/.test(csvData[0][0] || '')) {
            const csvHeader = csvData.slice(0, 17)
            const csvContent = csvData.slice(17)
            try {
              const tableProps = formateToTableWechatHeader(csvHeader)
              let tableData: any = formateToTableDataWechat(
                csvContent,
                tableProps.account_type,
                WECHAT
              )
              tableData = setCategory(tableData, props.ruleData)
              // setTableData()
              console.log(tableProps, 'tableProps')
              setTableData(tableData)
              setTableHeader(tableProps)
              setTableVisable(true)
              setUploadVisiable(false)
            } catch (error) {
              console.error(error)
            }
          } else if (/支付宝/.test(csvData[0][0] || '')) {
            const csvHeader = [...csvData.slice(0, 5), ...csvData.slice(-7)]
            const csvContent = csvData.slice(5, csvData.length - 7)
            try {
              const tableProps = formateToTableAlipayHeader(csvHeader)
              let tableData: any = formateToTableAlipay(
                csvContent,
                tableProps.account_type,
                ALIPAY
              )
              console.log(tableData, 'tableData')

              // console.log(csvContent, 'csvHeader')
              tableData = setCategory(tableData, props.ruleData)
              //   // setTableData()
              console.log(csvHeader, 'ppp')
              //   console.log(tableData, '222')
              setTableData(tableData)
              setTableHeader(tableProps)
              setTableVisable(true)
              setUploadVisiable(false)
              console.log('支付宝')
            } catch (error) {
              console.error(error)
            }
          }
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
              <div>
                <i
                  style={{
                    color: '#0080ff',
                    fontSize: '128px',
                    opacity: '0.4',
                  }}
                  className="ri-alipay-fill"
                ></i>
                <i
                  style={{
                    color: '#17c317',
                    fontSize: '128px',
                    opacity: '0.4',
                  }}
                  className="ri-wechat-fill"
                ></i>
              </div>
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
          <BasicTable
            onSubmitSuccess={() => {
              setTableVisable(false)
              setUploadVisiable(false)
              setShowResult(true)
            }}
            tableData={tableData}
            tableHeader={tableHeader}
            onCancel={() => {
              setTableVisable(false)
              setUploadVisiable(true)
            }}
          />
        </div>
      )}
      {showResult && (
        <Result
          status="success"
          title="上传成功"
          // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              key={1}
              type="primary"
              onClick={() => {
                setTableVisable(false)
                setUploadVisiable(true)
                setShowResult(false)
              }}
            >
              继续导入
            </Button>,
            <Link key={2} to="/Accounting">
              <Button>去查看</Button>
            </Link>,
          ]}
        />
      )}
    </>
  )
}

export default AlipayUpload
