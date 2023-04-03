import { Card, Col, Row, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import './home.less'
import useReviewForm from './componets/review-form'
import MonthReivew from './month-review'
import YearReview from './year-review'

const App: React.FC = () => {
  const [formValue, Form] = useReviewForm()
  // useEffect(() => {
  //   Modal.success({
  //     title: '使用手册',
  //     content: (
  //       <ul>
  //         <li>1、了解自己的财务状况和支出水平，制定合理的生活标准。</li>
  //         <li>2】</li>
  //         <li>3.了解自己的消费结构，减少冲动消费，合理分配收入。</li>
  //       </ul>
  //     ),
  //   })
  // }, [])
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
              {Form}
            </Card>
          </Col>
        </Row>
        {formValue.type === 'month' && <MonthReivew formValue={formValue} />}
        {formValue.type === 'year' && <YearReview formValue={formValue} />}
      </div>
    </div>
  )
}

export default App
