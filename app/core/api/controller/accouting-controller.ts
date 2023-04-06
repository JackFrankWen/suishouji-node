import { toNumberOrUndefiend } from '@/src/components/utils'
import { isValidElement } from 'react'
import { category_type, getCategoryObj } from '../const/category'
import {
  CreateRule,
  getALlMatchRule,
  RuleFind,
  UpdateOne,
} from '../mongodb/match-rules'
import { I_MatchRuls } from '../mongodb/match-rules-schema'
import {
  delete_many,
  find,
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
    console.log(dataList, 'dataList')
    console.log(data, 'data')
    const result = await update_many_with_diff_value(data)

    return result
  } catch (error) {
    console.log(error)
  }
}
// 更新
export async function updateOrInsertRule(params: {
  rule: string
  category: string
  consumer?: string
  abc_type?: number
  cost_type?: number
  tag?: string
}) {
  try {
    const obj = removeUndefinedProps(params)
    const newRule = obj.rule
    delete obj.rule
    console.log()
    const res = await RuleFind(obj)
    let response: any
    console.log(res, 'res')
    if (res) {
      response = await UpdateOne({
        filter: { _id: res._id.toString() },
        update: {
          rule: `${res.rule}|${newRule}`,
        },
      })
    } else {
      response = await CreateRule({ ...obj, rule: newRule })
    }
    return response
  } catch (error) {
    console.log(error)
  }
}
function getDataForUpdate(dataList: any, rules: any): any {
  const newList: any = []
  dataList.forEach((element: any) => {
    rules.forEach((rule: I_MatchRuls) => {
      const rightReg = new RegExp(rule.rule)
      console.log(rule.rule, element.description)
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

// 修复历史category 包含空格
export async function correntHistorySpace(): Promise<any> {
  try {
    const dataList = await find({})

    const filterData = filterCategoryNone(dataList)
    const updateData = getUpdate(filterData)
    console.log(updateData, 'cangsu ')
    const result = await update_many_with_diff_value(updateData)
    return result
  } catch (error) {
    console.log(error)
  }
}
function getRuleList(data: any) {
  return data.flatMap((category: any) => category.children)
}
// 修复历史 abc 消费目的
export async function correntHistoryCost(): Promise<any> {
  try {
    const dataList = (await find({
      trans_time: { $lt: new Date('2023-01-01') },
    })) as I_Transaction[]
    console.log(dataList, 'cost')
    // const filterData = filterCategoryNone(dataList)
    const rules = getRuleList(category_type)
    const tableData = set_abc_and_cost(dataList, rules)

    console.log(tableData, 'tableData ')
    const updateData = getUpdateCost(tableData)
    const result = await update_many_with_diff_value(updateData)
    return result
  } catch (error) {
    console.log(error)
  }
}
function set_abc_and_cost(dataList: I_Transaction[], rules: any) {
  return dataList.map((val: any) => {
    for (const element of rules) {
      const reg = new RegExp(element.value)
      const hasRule = reg.test(val.category)
      if (hasRule) {
        return {
          _id: val._id.toString(),
          cost_type: toNumberOrUndefiend(element.cost_type),
          abc_type: toNumberOrUndefiend(element.abc_type),
        }
      }
    }
    return {
      _id: val._id.toString(),
    }
  })
}
const filterCategoryNone = (list: any) =>
  list.filter((val: any) => val.category)

const getUpdate = (list: any) =>
  list.map((element: any) => ({
    query: { _id: element._id.toString() },

    update: {
      category: (element.category || '').replace(/\s/g, ''),
    },
  }))
const getUpdateCost = (list: any) =>
  list.map((element: any) => ({
    query: { _id: element._id },

    update: {
      cost_type: element.cost_type,
      abc_type: element.abc_type,
    },
  }))
