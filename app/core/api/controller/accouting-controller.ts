import {
  roundToTwoDecimalPlaces,
  toNumberOrUndefiend,
} from '@/src/components/utils'
import moment from 'moment'
import { getCategoryObj } from '../const/category'
import { getCollection } from '../mongodb/db'
import { getALlMatchRule } from '../mongodb/match-rules'
import { I_MatchRuls } from '../mongodb/match-rules-schema'
import {
  delete_many,
  find,
  getComonMatch,
  get_daily_amount_by_date,
  removeUndefinedProps,
  update_many,
  update_many_with_diff_value,
} from '../mongodb/transaction'
import { I_Transaction } from '../mongodb/transaction-schema'

export async function getDailyAmountTotal(params: {
  start: string
  end: string
}) {
  const result = await get_daily_amount_by_date(params)
  return tranferDailyAmountTotal(result)
}

export async function updateMany(params: { filter: any; data: any }) {
  const result = await update_many(params)
  return result
}

export async function deleteMany(params: { filter: any }) {
  const result = await delete_many(params)
  return result
}

// 自动分类
export async function autoClassify(params: {
  start: string
  end: string
}): Promise<any> {
  try {
    const dataList = await find(params)
    const rules = await getALlMatchRule()
    const data = getDataForUpdate(dataList, rules)
    console.log(data, 'data')
    const result = await update_many_with_diff_value(data)

    return result
  } catch (error) {
    console.log(error)
  }
}
function getDataForUpdate(dataList: any, rules: any): any {
  const newList: any = []
  dataList.forEach((element: any) => {
    rules.forEach((rule: I_MatchRuls) => {
      const rightReg = new RegExp(rule.rule)
      if (rightReg.test(element.description)) {
        console.log(element, 'element')
        const p = {
          category: rule.category,
          abc_type: toNumberOrUndefiend(rule.abc_type),
          tag: toNumberOrUndefiend(rule.tag),
          consumer: toNumberOrUndefiend(rule.consumer),
          cost_type: toNumberOrUndefiend(rule.cost_type),
        }
        const appendObj = {
          query: { _id: element._id.toString() },
          update: {
            ...removeUndefinedProps(p),
          },
        }
        newList.push(appendObj)
      }
    })
  })
  return newList
}

function tranferDailyAmountTotal(data: any) {
  return data.map((lvlF: any) => ({
    ...lvlF,
    amount: lvlF.amount.toString(),
    children: tranferDailyChild(lvlF.children),
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
