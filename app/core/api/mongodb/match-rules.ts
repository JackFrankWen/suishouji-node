import { model, connect } from 'mongoose'
import { I_MatchRuls, matchRuleSchema } from './match-rules-schema'

const MatchRule = model('MatchRule', matchRuleSchema)

/**
 * 查询每个月总支出
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export async function getALlMatchRule() {
  try {
    const res = await MatchRule.find({}).lean()

    return getId(res)
  } catch (error) {
    console.log(error)
  }
}

function getId(data: any) {
  return data.map((val: any) => {
    return {
      ...val,
      m_id: val._id.toString(),
    }
  })
}

/**
 * 查询每个月总支出
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export function UpdateOne(param: { filter: any; update: any }) {
  console.log(param, 'param')
  return new Promise((resolve, reject) => {
    MatchRule.findOneAndUpdate(param.filter, param.update)
      .then((res) => {
        console.log(res)
        resolve({ code: 200 })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
