import React, { useEffect, useState } from 'react'
import { useConsumer } from '@/src/components/form/useSelect'
import { cpt_const } from '@/core/api/const/web'
import { getDateTostring } from '@/src/components/utils'
import { Card, Col, Row, Space } from 'antd'
import { DetailTable } from '@/src/components/DetailTable'
import { detailTableCol } from '@/src/components/DetailTableCol'

export function CheckDetail(props: { formValue: any }) {
  const { formValue } = props
  const [modalData, setModaldata] = useState()
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

  const extra = (
    <>
      <Space>
        {accountTypeCpt}
        {PaymentCpt}
        {ConsumerCpt}
      </Space>
    </>
  )
  const getCategory = async (data: any) => {
    try {
      const p = getDateTostring(data)
      const res = await $api.getCost({ ...p })
      if (res) {
        console.log(res, 'modalta')
        setModaldata(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory({
      ...formValue,

      consumer: consumerVal,
      account_type: accountTypeVal,
      payment: paymentVal,
    })
  }, [formValue, consumerVal, accountTypeVal, paymentVal])
  return (
    <>
      <Row gutter={16} className="home-section">
        <Col span={24}>
          <Card bordered={false} extra={extra}>
            <DetailTable
              modalData={modalData}
              refresh={() => getCategory(formValue)}
              columns={detailTableCol}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
