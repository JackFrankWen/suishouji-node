import { roundToTwoDecimalPlaces } from '@/src/components/utils'
import moment from 'moment'
import { getCategoryObj } from '../const/category'
import { get_daily_amount_by_date } from '../mongodb/transaction'

export async function getDailyAmountTotal(params: {
  start: string
  end: string
}) {
  const { start, end } = params

  const result = await get_daily_amount_by_date({
    start: new Date(start),
    end: new Date(end),
  })
  return tranferDailyAmountTotal(result)
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
