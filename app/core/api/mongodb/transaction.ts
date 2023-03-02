import { getDb } from './db'
const collectionName = 'transaction'

const start = new Date('2022-01-01 00:00:00')
const end = new Date('2022-12-31 23:59:59')

export async function getView() {
  const db = getDb()
  if (db) {
    const collection = db.collection(collectionName)
    const result = await get_every_month_amount(collection)
    return result
  }
}

/**
 * 描述搜索日期内 所有分总额
 * @date 2023-03-01
 * @param {any} collection:any
 * @returns {any}
 */
async function get_category_total_by_date(collection: any) {
  const a = await collection
    .aggregate([
      { $match: { trans_time: { $gte: start, $lte: end } } },
      { $group: { _id: '$category', total_amount: { $sum: '$amount' } } },
      { $project: { _id: 0, category: '$_id', amount: '$total_amount' } },
    ])
    .toArray()
  return a
}

async function get_catetory_avg_by_date(collection: any) {
  const res = await collection
    .aggregate([
      { $match: { trans_time: { $gte: start, $lte: end } } },
      { $group: { _id: '$category', total_amount: { $sum: '$amount' } } },
      { $project: { _id: 0, category: '$_id', amount: '$total_amount' } },
    ])
    .toArray()
  return res
}

async function get_every_month_amount(collection: any) {
  const res = await collection
    .aggregate([
      { $match: { trans_time: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: {
            year: { $year: '$trans_time' },
            month: { $month: '$trans_time' },
          },
          totalAmount: {
            $sum: '$amount',
          },
        },
      },
      { $project: { _id: 0, year: '$_id.year', month: '$_id.month', totalAmount: 1 } },
      { $sort: { month: 1 } },
    ])
    .toArray()
  return res
}
