import { getDb } from '../mongodb/db'
import { get_every_month_amount } from '../mongodb/transaction'

export async function getView() {
  const db = getDb()
  if (db) {
    const result = await get_every_month_amount({})
    return getBarData(result)
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
