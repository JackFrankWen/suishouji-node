export const account_type = {
  1: '老公钱包',
  2: '老婆钱包',
  3: '爷爷钱包',
}
export const paymentType = {
  1: '支付宝',
  2: '微信',
  3: '银行卡',
  4: '现金',
}
export const consumer = {
  1: '老公',
  2: '老婆',
  3: '家庭',
  4: '牧牧',
}
export const tag = {
  1: '日常支出',
  2: '变动支出',
  3: '固定支出',
}
export const abc_type = {
  1: 'A类（必要）',
  2: 'B类（可有可无）',
  3: 'C类（可削减）',
}
export const cost_type = {
  1: '生存开销',
  2: '发展开销',
  3: '享受开销',
}

export const transform = (obj: any) => {
  return Object.keys(obj).map((key) => ({
    label: obj[key],
    value: Number(key),
  }))
}
