import { getCategoryObj } from '../const/category'
import { account_type, consumer } from '../const/web'
import { getDb } from '../mongodb/db'
import {
  get_account_total_by_date,
  get_category_total_by_date,
  get_every_month_amount,
  get_member_total_by_date,
} from '../mongodb/transaction'
const start = new Date('2022-01-01 00:00:00')
const end = new Date('2022-12-31 23:59:59')
export async function getView() {
  const db = getDb()
  if (db) {
    const result = await get_every_month_amount({ start, end })
    return getBarData(result)
  }
}
export async function getCategory() {
  const db = getDb()
  if (db) {
    const result = await get_category_total_by_date({
      start: new Date('2023-01-01 00:00:00'),
      end: new Date('2023-01-31 00:00:00'),
    })
    return transferMonthData(result)
  }
}

export async function getMemberTotal() {
  const db = getDb()
  if (db) {
    const result = await get_member_total_by_date({
      start: new Date('2023-01-01 00:00:00'),
      end: new Date('2023-01-31 00:00:00'),
    })
    return transferMeberData(result)
  }
}
export async function getAccountTotal() {
  const db = getDb()
  if (db) {
    const result = await get_account_total_by_date({
      start: new Date('2023-01-01 00:00:00'),
      end: new Date('2023-01-31 00:00:00'),
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
type pp = {
  value: string
  id: string
  name: string
  // child: {
  //   id: string
  //   value: string
  //   name: string
  // }[]
}[]
function transferMonthData(list: any): pp {
  let newList: pp = []
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
            value: (
              Number(obj.value) + Number(element.total.toString())
            ).toString(),
            // @ts-ignore: Unreachable code error

            // child: obj.child.push({
            //   value: element.total.toString(),
            //   id: child_id,
            //   name: category_obj[child_id],
            // }),
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
        // child: [
        //   {
        //     value: element.total.toString(),
        //     id: parent_id,
        //     name: category_obj[child_id],
        //   },
        // ],
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
