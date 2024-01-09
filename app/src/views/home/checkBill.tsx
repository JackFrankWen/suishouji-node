import React from 'react'
import { ReviewMonthBar } from '@/src/views/home/componets/review-month-bar'
import { CheckDetail } from '@/src/views/home/componets/check-detail'

export function CheckBill(props: { formValue: any }) {
  const { formValue } = props
  return (
    <div>
      {formValue.type === 'year' && (
        <ReviewMonthBar formValue={props.formValue} />
      )}
      <CheckDetail formValue={props.formValue} />
    </div>
  )
}
