import { model, connect } from 'mongoose'
import { Await } from 'react-router-dom'
import { I_MatchRuls, matchRuleSchema } from './match-rules-schema'
import { removeUndefinedProps } from './transaction'
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
  // return new Promise((resolve,reject)=>{
  //   MatchRule.find({}).then()
  // })
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
 * findANdupadte
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export function UpdateOne(param: { filter: any; update: any }) {
  console.log(param, 'param')
  return new Promise((resolve, reject) => {
    MatchRule.findOneAndUpdate(param.filter, removeUndefinedProps(param.update))
      .then((res) => {
        resolve({ code: 200, ...res })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export async function CreateRule(param: any) {
  try {
    const p = new MatchRule({ ...param })
    const res = await p.save()
    return { code: 200, ...res }
  } catch (error) {}
}
/**
 * findANdupadte
 * @param {any} param:{start:any;end:any}
 * @returns {any}
 */
export async function RuleFind(param: any) {
  try {
    console.log(param, 'param')
    const query = MatchRule.findOne({ ...param }).lean()
    return query
  } catch (error) {
    console.log(error)
  }
}
