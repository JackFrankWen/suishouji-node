import { roundToTwoDecimalPlaces } from '@/src/components/utils'
import moment from 'moment'
import { getCategoryObj } from '../const/category'
import { get_daily_amount_by_date, update_many } from '../mongodb/transaction'

export async function getDailyAmountTotal(params: {
  start: string
  end: string
}) {
  console.log(params, 'getDailyAmountTotal')
  const result = await get_daily_amount_by_date(params)
  return tranferDailyAmountTotal(result)
}
export async function updateMany(params: { filter: any; data: any }) {
  const result = await update_many(params)
  return result
}

function tranferDailyAmountTotal(data: any) {
  return data.map((lvlF: any) => ({
    ...lvlF,
    amount: lvlF.amount.toString(),
    child: tranferDailyChild(lvlF.child),
  }))
}

function tranferDailyChild(data: any) {
  const category_obj = getCategoryObj()

  return data.map((val: any) => {
    const arr = val.category ? JSON.parse(val.category) : []
    return {
      ...val,
      m_id: val._id.toString(),
      name: category_obj[arr[1]],
      amount: val.amount.toString(),
    }
  })
}
