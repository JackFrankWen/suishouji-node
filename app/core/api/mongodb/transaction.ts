import { getCollection } from './db'
import { I_Transaction } from './transaction-schema'

interface MyObject {
  [key: string]: any
}
function removeUndefinedProps(obj: MyObject): MyObject {
  const newObj: MyObject = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
function getComonMatch(param: any) {
  const {
    start,
    end,
    consumer,
    category,
    abc_type,
    tag,
    account_type,
    payment_type,
    cost_type,
  } = param

  const match = removeUndefinedProps({
    trans_time: { $gte: new Date(start), $lte: new Date(end) },
    flow_type: 1,
    consumer,
    tag,
    category,
    abc_type,
    payment_type,
    account_type,
    cost_type,
  })
  return match
}
function addCommonFeilds() {
  return {
    date: {
      $dateToString: {
        format: '%Y-%m-%d',
        date: '$trans_time',
      },
    },
    trans_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$trans_time',
      },
    },
    creation_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$creation_time',
      },
    },
    modification_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$modification_time',
      },
    },
  }
}
/**
 * 查询每个月总支出
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export async function get_every_month_amount(param: { start: any; end: any }) {
  const collection = getCollection()
  if (collection) {
    const match = getComonMatch(param)

    const res = await collection
      // @ts-ignore
      .aggregate([
        { $match: match },
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
  const collection = getCollection()
  if (collection) {
    const match = getComonMatch(param)
    const res = await collection.aggregate([
      { $match: match },
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
      {
        $sort: {
          total: 1,
        },
      },
    ])
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
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
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
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
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
      {
        $sort: {
          value: 1,
        },
      },
    ])
    return res
  }
  return []
}

/**
 * 获取日期内每日金额
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function get_daily_amount_by_date(param: any) {
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },

      {
        $addFields: addCommonFeilds(),
      },
      {
        $sort: { trans_time: -1 },
      },
      {
        $group: {
          _id: {
            date: '$date',
          },
          amount: {
            $sum: '$amount',
          },
          children: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          children: 1,
          amount: 1,
          trans_time_formate: '$_id.date',
          m_id: '$_id.date',
        },
      },
      {
        $sort: {
          trans_time_formate: 1,
        },
      },
    ])
    return res
  }
  return []
}

/**
 * 获取明细
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function get_cost_record(param: any) {
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
      {
        $addFields: addCommonFeilds(),
      },

      {
        $sort: { trans_time: -1 },
      },
    ])
    return res
  }
  return []
}

/**
 * 批量更新
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function update_many(param: { filter: any; data: any }) {
  const { data, filter } = param
  const collection = getCollection()
  if (collection) {
    const res = await collection.updateMany(
      {
        _id: { $in: filter.category },
      },
      removeUndefinedProps(data)
    )
    return res
  }
  return []
}
/**
 * 批量插入
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function insert_many(param: I_Transaction[]) {
  const collection = getCollection()
  return new Promise((resovle, reject) => {
    collection
      .insertMany(param)
      .then((res: any) => {
        resovle(res)
      })
      .catch((error: any) => {
        console.log(error)
        reject(error)
      })
  })
}
