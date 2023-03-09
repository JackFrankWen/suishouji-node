import { getCategoryObj } from '../const/category'
import { account_type, consumer } from '../const/web'
import { getDb } from '../mongodb/db'
import {
  get_account_total_by_date,
  get_category_total_by_date,
  get_every_month_amount,
  get_member_total_by_date,
} from '../mongodb/transaction'
export async function getEveryMonthAmount(params: {
  start: string
  end: string
}) {
  const { start, end } = params

  const db = getDb()
  console.log('params', {
    start: new Date(start),
    end: new Date(end),
  })
  if (db) {
    const result = await get_every_month_amount({
      start: new Date(start),
      end: new Date(end),
    })
    return getBarData(result)
  }
}
export async function getCategory(params: { start: string; end: string }) {
  const { start, end } = params

  const db = getDb()
  if (db) {
    const result = await get_category_total_by_date({
      start: new Date(start),
      end: new Date(end),
    })
    return transferCategory(result)
  }
}
export async function getCategoryAvg(params: { start: string; end: string }) {
  const { start, end } = params

  const db = getDb()
  if (db) {
    const result = await get_category_total_by_date({
      start: new Date(start),
      end: new Date(end),
    })
    return transferCategory(result)
  }
}

export async function getMemberTotal(params: { start: string; end: string }) {
  const { start, end } = params
  const db = getDb()
  if (db) {
    const result = await get_member_total_by_date({
      start: new Date(start),
      end: new Date(end),
    })
    return transferMeberData(result)
  }
}
export async function getAccountTotal(params: { start: string; end: string }) {
  const { start, end } = params

  const db = getDb()
  if (db) {
    const result = await get_account_total_by_date({
      start: new Date(start),
      end: new Date(end),
    })
    return transferAccountrData(result)
  }
}

function convertToChineseNum(num: string): string {
  const chineseNums: string[] = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  ]
  const units: string[] = ['', '十', '百', '千', '万', '亿']
  let result = ''

  for (let i = 0; i < num.length; i++) {
    const digit: number = parseInt(num.charAt(i))
    const unit: string = units[num.length - 1 - i]
    if (digit === 0) {
      if (i !== num.length - 1 && parseInt(num.charAt(i + 1)) !== 0) {
        result += chineseNums[digit]
      }
    } else {
      if (unit === '十' && digit === 1 && i === 0 && num.length === 2) {
        result += '十'
      } else {
        result += chineseNums[digit] + unit
      }
    }
  }

  return result
}

function getBarData(list: any) {
  const label: string[] = []
  const value: string[] = []
  list.forEach((element: any) => {
    label.push(`${convertToChineseNum(element.month.toString())}月`)
    value.push(element.total.toString())
  })
  return {
    label,
    value,
  }
}
type CategoryReturnType = {
  value: string
  id: string
  name: string
  child: {
    id: string
    value: string
    name: string
  }[]
}[]
function transferCategory(list: any): CategoryReturnType {
  let newList: CategoryReturnType = []
  const category_obj = getCategoryObj()
  list.forEach((element: { total: string; category: string }) => {
    const arr = element.category ? JSON.parse(element.category) : []
    const [parent_id, child_id] = arr

    const check = newList.find((val) => val.id === parent_id)
    if (check) {
      newList = newList.map((obj) => {
        if (obj.id === parent_id) {
          return {
            ...obj,
            id: parent_id,
            value: (
              Number(obj.value) + Number(element.total.toString())
            ).toString(),

            child: [...obj.child].concat({
              value: element.total.toString(),
              id: child_id,
              name: category_obj[child_id],
            }),
          }
        }
        return obj
      })
    } else {
      // create
      newList.push({
        value: element.total.toString(),
        id: parent_id,
        name: category_obj[parent_id],
        child: [
          {
            value: element.total.toString(),
            id: parent_id,
            name: category_obj[child_id],
          },
        ],
      })
    }
  })
  return newList
}
type PieData = {
  name: string
  value: string
}

function transferMeberData(list: any): PieData[] {
  return list.map((val: PieData) => ({
    name: consumer[val.name],
    value: val.value.toString(),
  }))
}
function transferAccountrData(list: any): PieData[] {
  const newList = list.map((val: PieData) => ({
    name: account_type[val.name],
    value: val.value.toString(),
  }))
  newList.unshift({
    name: '总支出',
    value: newList.reduce(
      (pre: number, cur: PieData) => Number(pre) + Number(cur.value),
      0
    ),
  })
  return newList
}
