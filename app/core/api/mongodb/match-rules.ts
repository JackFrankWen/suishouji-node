import { model, connect } from 'mongoose'
import { matchRuleSchema } from './match-rules-schema'

const MatchRule = model('MatchRule', matchRuleSchema)

/**
 * 查询每个月总支出
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export async function getALlMatchRule() {
  const res = await MatchRule.find({}).lean()

  return res
}
