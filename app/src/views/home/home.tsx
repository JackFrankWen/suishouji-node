import {
  Card,
  Col,
  Row,
  Modal,
  Space,
  DatePicker,
  Statistic,
  PageHeader,
  Avatar,
} from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ReactECharts from 'echarts-for-react'
import './home.less'
import ReviewForm from './review-form'
import RangePickerWrap from '@/src/components/RangePickerWrap'
import Pie from '@/src/components/app-echart/Pie'
import MonthReivew from './month-review'

const App: React.FC = () => {
  useEffect(() => {
    Modal.success({
      title: '使用手册',
      content: (
        <ul>
          <li>1、了解自己的财务状况和支出水平，制定合理的生活标准。</li>
          <li>2】</li>
          <li>3.了解自己的消费结构，减少冲动消费，合理分配收入。</li>
        </ul>
      ),
    })
  }, [])
  return (
    <div>
      {/* <div className="page-home-header">
        <Row gutter={16} className="lvl-1">
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="月分析"
            subTitle="This is a subtitle"
          >
            <Row>
              <Statistic title="Status" value="Pending" />
              <Statistic
                title="Price"
                prefix="$"
                value={568.08}
                style={{
                  margin: '0 32px',
                }}
              />
              <Statistic title="Balance" prefix="$" value={3345.08} />
            </Row>
          </PageHeader>
        </Row>
      </div> */}
      <div className="page-home">
        <Row className="home-section">
          <Col span={24}>
            <Card bordered={false} hoverable>
              <ReviewForm />
            </Card>
          </Col>
        </Row>

        <MonthReivew />
      </div>
    </div>
  )
}

export default App
