import { getCollection, getDb } from './db'
const collectionName = 'transaction'

// async function get_catetory_avg_by_date(param: any) {
//   const { start, end } = param
//   const collection = getCollection(collectionName)

//   if (!collection) return []
//   const res = await collection
//     .aggregate([
//       { $match: { trans_time: { $gte: start, $lte: end } } },
//       { $group: { _id: '$category', total_amount: { $sum: '$amount' } } },
//       { $project: { _id: 0, category: '$_id', amount: '$total_amount' } },
//     ])
//     .toArray()
//   return res
// }

/**
 * 查询每个月总支出
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export async function get_every_month_amount(param: { start: any; end: any }) {
  const { start, end } = param
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

/**
 * 查询各类支出汇总
 * @param {any} param:any
 * @returns {any}
 */
export async function get_category_total_by_date(param: any) {
  const { start, end } = param

  const collection = getCollection(collectionName)
  if (collection) {
    const res = await collection
      .aggregate([
        { $match: { trans_time: { $gte: start, $lte: end }, flow_type: '1' } },
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
            total: '$total_amount',
          },
        },
      ])
      .toArray()
    return res
  }
  return null
}
/**
 * 查询成员汇总
 * @param {any} param:any
 * @returns {any}
 */
export async function get_member_total_by_date(param: any) {
  const { start, end } = param

  const collection = getCollection(collectionName)
  if (collection) {
    const res = await collection
      .aggregate([
        { $match: { trans_time: { $gte: start, $lte: end }, flow_type: '1' } },
        {
          $group: {
            _id: {
              consumer: '$consumer',
            },
            total: {
              $sum: '$amount',
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id.consumer',
            value: '$total',
          },
        },
      ])
      .toArray()
    return res
  }
  return []
}
/**
 * 获取账户金额
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function get_account_total_by_date(param: any) {
  const { start, end } = param

  const collection = getCollection(collectionName)
  if (collection) {
    const res = await collection
      .aggregate([
        { $match: { trans_time: { $gte: start, $lte: end }, flow_type: '1' } },
        {
          $group: {
            _id: {
              name: '$account_type',
            },
            total: {
              $sum: '$amount',
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id.name',
            value: '$total',
          },
        },
      ])
      .toArray()
    return res
  }
  return []
}
