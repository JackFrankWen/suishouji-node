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
export function UpdateOne(param: I_MatchRuls & { m_id: string }) {
  const filter = { _id: param.m_id }
  const update: Partial<I_MatchRuls & { m_id: string; _id: any }> = { ...param }
  delete update.m_id
  delete update._id
  delete update.creation_time
  delete update.modification_time
  return new Promise((resolve, reject) => {
    MatchRule.findOneAndUpdate(filter, update)
      .then(() => {
        resolve({ code: 200 })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
