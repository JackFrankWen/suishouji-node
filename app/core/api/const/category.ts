const general_cost = 1,
  variable_cost = 2,
  fix_cost = 3
const husband = 1,
  wife = 2,
  family = 3,
  son = 4

export const category_type = [
  {
    value: 10000,
    label: '食品(吃喝)',
    children: [
      {
        value: 10001,
        label: '买菜',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 10002,
        label: '超市',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 10003,
        label: '水果',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 10004,
        label: '零食（宵夜）',
        tag: variable_cost,
      },
      {
        value: 10005,
        label: '工作餐（早午晚）',
        tag: general_cost,
      },
      {
        value: 10006,
        label: '下馆子',
        tag: variable_cost,
        consumer: family,
      },
    ],
  },
  {
    value: 50000,
    label: '购物消费',
    children: [
      {
        value: 50001,
        label: '衣裤鞋帽',
        tag: variable_cost,
      },
      {
        value: 50002,
        label: '日常用品',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 50003,
        label: '电子数码',
        tag: variable_cost,
      },
      {
        value: 50004,
        label: '厨房用品',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 50005,
        label: '化妆美容品',
        tag: variable_cost,
        consumer: wife,
      },
      {
        value: 50006,
        label: '宠物支出',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 50007,
        label: '汽车用品',
        tag: variable_cost,
        consumer: family,
      },
      {
        value: 50008,
        label: '家装家电',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 50009,
        label: '乐器',
        tag: variable_cost,
        consumer: family,
      },
    ],
  },
  {
    value: 20000,
    label: '家庭杂费',
    children: [
      {
        value: 20001,
        label: '水费',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 20002,
        label: '电费',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 20003,
        label: '燃气费',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 20004,
        label: '物业费',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 20005,
        label: '快递费',
        tag: general_cost,
        consumer: family,
      },
      {
        value: 20006,
        label: '理发费',
        tag: fix_cost,
      },
      {
        value: 20007,
        label: '手机话费',
        tag: fix_cost,
      },
      {
        value: 20008,
        label: 'VPN年费以及会员费',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 20009,
        label: '家政',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 20010,
        label: '税费',
        tag: fix_cost,
        consumer: family,
      },
    ],
  },
  {
    value: 40000,
    label: '宝宝费用',
    children: [
      {
        value: 40001,
        label: '宝宝尿不湿',
        tag: fix_cost,
        consumer: son,
      },
      {
        value: 40002,
        label: '宝宝玩具',
        tag: variable_cost,
        consumer: son,
      },
      {
        value: 40003,
        label: '宝宝教育',
        tag: fix_cost,
        consumer: son,
      },
      {
        value: 40004,
        label: '宝宝医疗',
        tag: variable_cost,
        consumer: son,
      },
      {
        value: 40005,
        label: '宝宝生活用品',
        tag: fix_cost,
        consumer: son,
      },
      {
        value: 40006,
        label: '宝宝衣物',
        tag: variable_cost,
        consumer: son,
      },
      {
        value: 40007,
        label: '宝宝食品',
        tag: variable_cost,
        consumer: son,
      },
    ],
  },
  {
    value: 30000,
    label: '行车交通',
    children: [
      {
        value: 30001,
        label: '违章罚款',
      },
      {
        value: 30002,
        label: '地铁公交',
        tag: general_cost,
      },
      {
        value: 30003,
        label: '打车',
        tag: general_cost,
      },
      {
        value: 30004,
        label: '火车飞机等',
        tag: variable_cost,
      },
      {
        value: 30005,
        label: '停车费',
        tag: general_cost,
      },
      {
        value: 30006,
        label: '油费',
        tag: general_cost,
      },
    ],
  },
  {
    value: 60000,
    label: '人情费用',
    children: [
      {
        value: 60001,
        label: '请客',
        tag: variable_cost,
      },
      {
        value: 60002,
        label: '回礼',
        tag: variable_cost,
        consumer: family,
      },
      {
        value: 60003,
        label: '孝敬长辈',
        tag: fix_cost,
        consumer: family,
      },
    ],
  },
  {
    value: 70000,
    label: '休闲娱乐',
    children: [
      {
        value: 70001,
        label: '聚会',
        tag: variable_cost,
      },
      {
        value: 70002,
        label: '游戏（桌游）',
        tag: variable_cost,
      },
      {
        value: 70003,
        label: '其他娱乐',
        tag: variable_cost,
      },
    ],
  },
  {
    value: 80000,
    label: '保险医疗',
    children: [
      {
        value: 80001,
        label: '个人保险',
        tag: fix_cost,
        consumer: family,
      },
      {
        value: 80002,
        label: '医疗费用',
        tag: variable_cost,
      },
      {
        value: 80003,
        label: '医疗杂物',
        tag: fix_cost,
        consumer: family,
      },
    ],
  },
  {
    value: 90000,
    label: '个人投资',
    children: [
      {
        value: 90001,
        label: '摄影',
        tag: variable_cost,
        consumer: wife,
      },
      {
        value: 90002,
        label: '书包杂志',
        tag: variable_cost,
      },
      {
        value: 90003,
        label: '个人投资',
        tag: variable_cost,
      },
    ],
  },
  {
    value: 110000,
    label: '出差旅游',
    children: [
      {
        value: 110001,
        label: '交通费用',
        tag: variable_cost,
      },
      {
        value: 110002,
        label: '住宿费',
        tag: variable_cost,
      },
      {
        value: 110003,
        label: '餐饮费',
        tag: variable_cost,
      },
      {
        value: 110004,
        label: '娱乐费',
        tag: variable_cost,
      },
      {
        value: 110005,
        label: '其他费用',
        tag: variable_cost,
      },
    ],
  },
  {
    value: 100000,
    label: '未分类(请勿使用)',
    children: [
      {
        value: 100001,
        label: '烂账',
      },
      {
        value: 100002,
        label: '导入使用',
      },
      {
        value: 100003,
        label: '历史未分类',
      },
    ],
  },
]

export const getCategoryObj = () => {
  const obj = {}
  category_type.forEach((item) => {
    obj[item.value] = item.label
    item.children.forEach((item) => {
      obj[item.value] = item.label
    })
  })
  return obj
}
