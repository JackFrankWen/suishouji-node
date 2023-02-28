import React, { useEffect } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload, Tabs } from 'antd'
import Papa from 'papaparse'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  beforeUpload: (file) => {
    Papa.parse(file, {
      header: false,
      encoding: 'gb18030',
      skipEmptyLines: true,
      complete: function (results: any) {
        console.log(results)
      },
    })

    // Prevent upload
    return false
  },
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const WechatUpload: React.FC = () => {
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </Dragger>
  )
}

const items = [
  {
    label: (
      <span>
        <a style={{ color: '#17c317' }} className="ri-wechat-fill"></a>
        微信导入
      </span>
    ),
    key: '1',
    children: (
      <>
        <WechatUpload />
      </>
    ),
  },
  {
    label: (
      <span>
        <a style={{ width: '32px' }} className="ri-alipay-fill"></a>
        支付宝导入
      </span>
    ),
    key: '2',
    children: (
      <>
        <WechatUpload />
      </>
    ),
  },
]
const Home: React.FC = () => <Tabs defaultActiveKey="1" centered items={items} />

export default Home
