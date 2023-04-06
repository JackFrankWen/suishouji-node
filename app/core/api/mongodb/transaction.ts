import moment from 'moment'
import { getCollection } from './db'
import { I_Transaction } from './transaction-schema'

interface MyObject {
  [key: string]: any
}
export function removeUndefinedProps(obj: MyObject): MyObject {
  const newObj: MyObject = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
export function getComonMatch(param: any) {
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
    description,
  } = param
  console.log(
    {
      start,
      end,
    },
    'dddd'
  )

  const match = removeUndefinedProps({
    trans_time: {
      $gte: moment(start).toDate(),
      $lte: moment(end).toDate(),
    },
    flow_type: 1,
    description,
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
        timezone: '+08:00',
      },
    },
    trans_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$trans_time',
        timezone: '+08:00',
      },
    },
    creation_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$creation_time',
        timezone: '+08:00',
      },
    },
    modification_time_formate: {
      $dateToString: {
        format: '%Y-%m-%d %H:%M:%S',
        date: '$modification_time',
        timezone: '+08:00',
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

function calculateMonthDiff(startDate: string, endDate: string) {
  const momentStartDate = moment(startDate)
  const momentEndDate = moment(endDate).add(1, 'day')

  const diffInMonths = momentEndDate.diff(momentStartDate, 'months')

  // 如果相差的天数小于一个月的天数，则算作一个月
  return diffInMonths
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
    const monthsDiff = calculateMonthDiff(param.start, param.end)

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
          avg: { $divide: ['$total_amount', monthsDiff] },
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
 * 查询成员汇总
 * @param {any} param:any
 * @returns {any}
 */
export async function get_abc_total_by_date(param: any) {
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
      {
        $group: {
          _id: {
            abc_type: '$abc_type',
          },
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.abc_type',
          value: '$total',
        },
      },
    ])
    return res
  }
  return []
}
export async function get_cost_type_total_by_date(param: any) {
  const collection = getCollection()
  if (collection) {
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
      {
        $group: {
          _id: {
            cost_type: '$cost_type',
          },
          total: {
            $sum: '$amount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.cost_type',
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
    console.log(getComonMatch(param), 'getComonMatch(param)s')
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
          trans_time_formate: -1,
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
export async function update_many(param: {
  filter: { ids: string[] }
  data: any
}) {
  const { data, filter } = param
  const collection = getCollection()
  console.log(removeUndefinedProps(data), '      removeUndefinedProps(data')
  if (collection) {
    const res = await collection.updateMany(
      {
        _id: { $in: filter.ids },
      },
      removeUndefinedProps(data)
    )
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
export async function update_many_with_diff_value(
  param: {
    query: any
    update: any
  }[]
) {
  const collection = getCollection()
  if (collection) {
    const bulkOps = param.map((obj) => ({
      updateOne: {
        filter: obj.query,
        update: {
          $set: { ...obj.update },
        },
      },
    }))
    return new Promise((resolve, reject) => {
      collection
        .bulkWrite(bulkOps)
        .then((result: any) => {
          resolve(result)
          console.log(`${result.modifiedCount} transactions updated.`)
        })
        .catch((err: any) => {
          reject(err)
          console.error(err)
        })
    })
  }
  return []
}
export async function delete_many(param: { filter: any }) {
  const { filter } = param
  const collection = getCollection()
  if (collection) {
    const res = await collection.deleteMany({
      _id: { $in: filter.ids },
    })
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

/**
 * 查询
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function find(param: any) {
  const collection = getCollection()
  return new Promise((resovle, reject) => {
    collection
      .find(getComonMatch(param))
      .then((res: any) => {
        resovle(res)
      })
      .catch((error: any) => {
        console.log(error)
        reject(error)
      })
  })
}
/**
 * 查询折线图
 * @date 2023-03-06
 * @param {any} param:any
 * @returns {any}
 */
export async function get_category_line_by_data(param: any) {
  const collection = getCollection()
  if (collection) {
    console.log(getComonMatch(param), 'getComonMatch(param)')
    const res = await collection.aggregate([
      { $match: getComonMatch(param) },
      {
        $group: {
          _id: {
            category: '$category',
            year: {
              $year: {
                date: {
                  $toDate: '$trans_time',
                },
              },
            },
            month: {
              $month: {
                date: {
                  $toDate: '$trans_time',
                },
              },
            },
          },
          amount: {
            $sum: '$amount',
          },
        },
      },
      // Then, group documents again by category and accumulate monthly amounts
      {
        $group: {
          _id: {
            category: '$_id.category',
          },
          monthlyAmounts: {
            $push: {
              month: '$_id.month',
              year: '$_id.year',
              amount: '$amount',
            },
          },
        },
      },
      // Finally, format the result and sort by year/month
      {
        $project: {
          _id: 0,
          category: '$_id.category',
          amount: {
            $map: {
              input: {
                $range: [1, 13],
              },
              as: 'm',
              in: {
                $reduce: {
                  input: '$monthlyAmounts',
                  initialValue: 0,
                  in: {
                    $cond: [
                      {
                        $eq: ['$$this.month', '$$m'],
                      },
                      '$$this.amount',
                      '$$value',
                    ],
                  },
                },
              },
            },
          },
          date: {
            $map: {
              input: {
                $range: [1, 13],
              },
              as: 'm',
              in: {
                $dateToString: {
                  date: {
                    $dateFromParts: {
                      year: {
                        $max: '$monthlyAmounts.year',
                      },
                      month: '$$m',
                      day: 1,
                    },
                  },
                  format: '%Y-%m',
                },
              },
            },
          },
        },
      },
    ])
    return res
  }
  return []
}
