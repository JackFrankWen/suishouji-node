import React, { useEffect, useState } from 'react'
import { useConsumer } from '@/src/components/form/useSelect'
import { cpt_const } from '@/core/api/const/web'
import { getDateTostring } from '@/src/components/utils'
import { Card, Col, Row, Space } from 'antd'
import Bar from '@/src/components/app-echart/Bar'

export function ReviewMonthBar(props: { formValue: any }) {
  const { formValue } = props
  const [monthBar, setMonthbar] = useState<{
    label: string[]
    value: string[]
  }>({ label: [], value: [] })

  const getMonthBar = async (data: any) => {
    try {
      const res = await $api.getEveryMonthAmount(data)
      console.log(res)
      if (res) {
        setMonthbar(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [consumerVal, ConsumerCpt] = useConsumer({
    options: cpt_const.consumer_type,
  })

  const [paymentVal, PaymentCpt] = useConsumer({
    options: cpt_const.payment_type,
    placeholder: '支付方式',
  })
  const [accountTypeVal, accountTypeCpt] = useConsumer({
    options: cpt_const.account_type,
    placeholder: '账号',
  })

  useEffect(() => {
    getMonthBar(
      getDateTostring({
        ...props.formValue,
        consumer: consumerVal,
        account_type: accountTypeVal,
        payment: paymentVal,
      })
    )
  }, [formValue, consumerVal, accountTypeVal])
  const extra = (
    <>
      <Space>
        {accountTypeCpt}
        {PaymentCpt}
        {ConsumerCpt}
      </Space>
    </>
  )
  return (
    <Row className="home-section" gutter={16}>
      <Col span={24}>
        <Card bordered={false} extra={extra}>
          <Bar {...monthBar} />
        </Card>
      </Col>
    </Row>
  )
}
