import { roundToTwoDecimalPlaces } from '@/src/components/utils'
import moment from 'moment'
import { getCategoryObj } from '../const/category'
import { abc_type, account_type, consumer_type, cost_type } from '../const/web'
import {
  get_abc_total_by_date,
  get_account_total_by_date,
  get_category_line_by_data,
  get_category_total_by_date,
  get_cost_record,
  get_cost_type_total_by_date,
  get_every_month_amount,
  get_member_total_by_date,
  get_account_and_payment_total_by_date,
} from '../mongodb/transaction'

export async function getEveryMonthAmount(params: {
  start: string
  end: string
}) {
  const result = await get_every_month_amount(params)
  return getBarData(result)
}

export async function getCategoryLine(params: any) {
  try {
    const result = await get_category_line_by_data(params)
    return transferCategoryName(result)
  } catch (error) {
    console.log(error)
  }
}

function transferCategoryName(arr: { category: string; amount: any }[]) {
  const category_obj = getCategoryObj()
  return arr.map((val) => {
    const arr = val.category ? JSON.parse(val.category) : []
    const [, child_id] = arr
    return {
      ...val,
      name: category_obj[child_id],
      amount: val.amount.map((val: any) => Number(val.toString())),
    }
  })
}
export async function getCategory(params: { start: string; end: string }) {
  const result = await get_category_total_by_date(params)
  return sortByValue(transferCategory(result))
}
export async function getCategoryAvg(params: { start: string; end: string }) {
  const { start, end } = params

  const result = await get_category_total_by_date(params)
  const data = transferCategory(result)
  const div = getMonthDiff(start, end)
  return getBarData2(sortByValue(divideValues(data, div)))
}

export async function getMemberTotal(params: { start: string; end: string }) {
  const result = await get_member_total_by_date(params)
  return transferMeberData(result)
}
export async function getCostTypeToal(params: { start: string; end: string }) {
  const result = await get_cost_type_total_by_date(params)
  return transferCostTypeData(result)
}
export async function getABCTotal(params: {
  start: string
  end: string
}): Promise<PieData[]> {
  const result = await get_abc_total_by_date(params)
  return transferABCData(result)
}
export async function getAccountTotal(params: { start: string; end: string }) {
  const result = await get_account_total_by_date(params)
  return transferAccountrData(result)
}
export async function getSumrize(params: { start: string; end: string }) {
  // const total = find({...params,})
  const acc = get_account_and_payment_total_by_date(params)
  const total = get_account_total_by_date(params)
  const input = get_category_total_by_date({
    ...params,
    flow_type: 2,
  })

  return new Promise((resolve) => {
    Promise.all([acc, input, total]).then((res) => {
      resolve(loadData(res))
      // resolve(res)
    })
  })
}
function loadData(data: any) {
  try {
    const [acc, income, accSum] = data
    const incomeTotal = income.reduce((acc: any, curr: any) => {
      return acc + Number(curr.total.toString())
    }, 0)
    const total = accSum.reduce((acc: any, curr: any) => {
      return acc + Number(curr.value.toString())
    }, 0)

    const obj: any = {
      husband: {
        wechat: 0,
        alipay: 0,
        total: 0,
      },
      wife: {
        wechat: 0,
        alipay: 0,
        total: 0,
      },
      total: roundToTwoDecimalPlaces(total),
      income: roundToTwoDecimalPlaces(incomeTotal),
    }
    acc.forEach((val: any) => {
      if (val.account_type === 1) {
        // 老公
        if (val.payment_type === 1) {
          obj.husband.alipay = val.value.toString()
        } else if (val.payment_type === 2) {
          obj.husband.wechat = val.value.toString()
        }
      } else if (val.account_type === 2) {
        // 老婆
        if (val.payment_type === 1) {
          obj.wife.alipay = val.value.toString()
        } else if (val.payment_type === 2) {
          obj.wife.wechat = val.value.toString()
        }
      }
    })
    accSum.forEach((val: any) => {
      if (val.name === 1) {
        // 老公
        obj.husband.total = val.value.toString()
      } else if (val.name === 2) {
        // 老婆
        obj.wife.total = val.value.toString()
      }
    })

    return obj
  } catch (error) {
    console.log(error)
  }
}
export async function getCost(params: {
  start: string
  end: string
  category: string
}) {
  const result = await get_cost_record(params)
  return mapData(result)
}

function mapData(arr: any) {
  return arr.map((obj: any) => ({
    ...obj,
    m_id: obj._id.toString(),
    amount: obj.amount.toString(),
  }))
}
function getMonthDiff(date1: string, date2: string) {
  const moment1 = moment(date1)
  const moment2 = moment(date2)

  return moment2.diff(moment1, 'months')
}
function divideValues(arr: CategoryReturnType, divisor: number) {
  return arr.map((obj) => {
    return {
      ...obj,
      value: roundToTwoDecimalPlaces(Number(obj.value) / divisor),
      child: obj.child.map((childObj) => ({
        ...childObj,
        value: roundToTwoDecimalPlaces(Number(childObj.value) / divisor),
      })),
    }
  })
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
function getBarData2(list: any) {
  const label: string[] = []
  const value: string[] = []
  list.forEach((element: any) => {
    label.push(`${element.name}`)
    value.push(element.value)
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
  avg: string
  child: {
    avg: string
    category: string
    id: string
    value: string
    name: string
  }[]
}[]

function transferCategory(list: any): CategoryReturnType {
  let newList: CategoryReturnType = []
  const category_obj = getCategoryObj()
  list.forEach((element: { total: string; category: string; avg: string }) => {
    const arr = element.category ? JSON.parse(element.category) : []
    const [parent_id, child_id] = arr

    const check = newList.find((val) => val.id === parent_id)
    if (check) {
      newList = newList.map((obj) => {
        if (obj.id === parent_id) {
          return {
            ...obj,
            value: roundToTwoDecimalPlaces(
              Number(obj.value) + Number(element.total.toString())
            ),
            avg: roundToTwoDecimalPlaces(
              Number(obj.avg) + Number(element.avg.toString())
            ),

            child: [...obj.child].concat({
              value: element.total.toString(),
              category: element.category,
              avg: element.avg.toString(),
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
        avg: element.avg.toString(),
        name: category_obj[parent_id],
        child: [
          {
            value: element.total.toString(),
            id: parent_id,
            avg: element.avg.toString(),
            category: element.category,
            name: category_obj[child_id],
          },
        ],
      })
    }
  })
  return newList
}
function sortByValue(arr: CategoryReturnType) {
  return arr.sort((a, b) => Number(b.value) - Number(a.value))
}

type PieData = {
  name: string
  type: number
  value: string
}

function transferMeberData(list: any): PieData[] {
  return list.map((val: PieData) => ({
    name: consumer_type[val.name],
    type: val.name,
    value: val.value.toString(),
  }))
}
function transferCostTypeData(list: any): PieData[] {
  return list.map((val: PieData) => ({
    name: cost_type[val.name],
    type: val.name,

    value: val.value.toString(),
  }))
}
function transferABCData(list: any): PieData[] {
  return list.map((val: PieData) => ({
    name: abc_type[val.name],
    type: val.name,

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
      (pre: number, cur: PieData) =>
        roundToTwoDecimalPlaces(Number(pre) + Number(cur.value)),
      0
    ),
  })
  return newList
}
