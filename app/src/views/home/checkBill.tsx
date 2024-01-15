import React from 'react'
import { ReviewMonthBar } from '@/src/views/home/componets/review-month-bar'
import { CheckDetail } from '@/src/views/home/componets/check-detail'
import { Alert } from 'antd'

export function CheckBill(props: { formValue: any }) {
  const { formValue } = props
  const banner = (
    <>
      <p>1.100元上需要改备注</p>
      <p>2.确定消费成员（规则谁使用算谁头，家里一起用算家庭）</p>
      <p>3.确定消费目的</p>
    </>
  )
  return (
    <div>
      {formValue.type === 'year' && (
        <ReviewMonthBar formValue={props.formValue} />
      )}
      <Alert
        style={{ marginTop: 20 }}
        message="对账要求"
        description={banner}
        type="info"
      />
      <CheckDetail formValue={props.formValue} />
    </div>
  )
}
