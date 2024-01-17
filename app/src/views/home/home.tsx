import { Affix, Button, Card, Col, Modal, Row } from 'antd'
import React from 'react'
import './home.less'
import useReviewForm from './componets/review-form'
import MonthReivew from './month-review'
import YearReview from './year-review'
import { CheckBill } from '@/src/views/home/checkBill'

function AnalysBill(props: { formValue: any }) {
  return (
    <div>
      {props.formValue.type === 'month' && (
        <MonthReivew formValue={props.formValue} />
      )}
      {props.formValue.type === 'year' && (
        <YearReview formValue={props.formValue} />
      )}
    </div>
  )
}

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
        {formValue.action === 'review' && <AnalysBill formValue={formValue} />}
        {formValue.action === 'check' && <CheckBill formValue={formValue} />}
        <Affix
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          offsetBottom={120}
        >
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              Modal.info({
                title: '记账规则',
                content: (
                  <div>
                    <p>1.分类.</p>
                    <p>2.对账（a.确认导入总金额 b.确认分类正确）</p>
                    <p>
                      3.分析（a、总支出多少 b、每个人支出多少 c、超预算多少
                      d、确定哪些享受开销）
                    </p>
                    <p>4.控制下月支出</p>
                  </div>
                ),
                onOk() {},
              })
            }}
          >
            手册
          </Button>
        </Affix>
      </div>
    </div>
  )
}

export default App
