import { getCollection, getDb } from './db'
const collectionName = 'transaction'

const start = new Date('2022-01-01 00:00:00')
const end = new Date('2022-12-31 23:59:59')

async function get_category_total_by_date(param: any) {
  const collection = getCollection(collectionName)
  if (collection) {
    const res = await collection
      .aggregate([
        { $match: { trans_time: { $gte: start, $lte: end } } },
        {
          $group: {
            _id: '$category',
            total_amount: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            amount: '$total_amount',
          },
        },
      ])
      .toArray()
    return res
  }
  return null
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

export async function get_every_month_amount(param: any) {
  const collection = getCollection(collectionName)
  if (collection) {
    const res = await collection
      .aggregate([
        { $match: { trans_time: { $gte: start, $lte: end }, flow_type: '1' } },
        {
          $group: {
            _id: {
              year: { $year: '$trans_time' },
              month: { $month: '$trans_time' },
            },
            total: {
              $sum: '$amount',
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            total: 1,
          },
        },
        { $sort: { month: 1 } },
      ])
      .toArray()
    return res
  }
  return []
}
