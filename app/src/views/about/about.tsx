import React from 'react'
import { List, Tabs } from 'antd'
import './about.less'
import RuleTable from './rule-table'
import BudgetTable from './budget-table'

function ReadMe() {
  const data: string[] = ['1.每月账单对账', '2.对账结果分析', '3.对账结果确认']
  return (
    <div>
      <List
        header={<div>设计</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

const items = [
  {
    label: '规则编辑',
    key: '1',
    children: (
      <>
        <RuleTable />
      </>
    ),
  },
  {
    label: '预算',
    key: '2',
    children: (
      <>
        <BudgetTable />
      </>
    ),
  },
  {
    label: '使用手册',
    key: '3',
    children: (
      <>
        <ReadMe />
      </>
    ),
  },
]

const App: React.FC = () => (
  <div className="card-container">
    <Tabs type="card" items={items} tabPosition="left" />
  </div>
)

export default App
