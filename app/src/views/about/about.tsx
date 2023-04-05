import React from 'react'
import { Tabs } from 'antd'
import './about.less'
import RuleTable from './rule-table'
import BudgetTable from './budget-table'
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
]

const App: React.FC = () => (
  <div className="card-container">
    <Tabs type="card" items={items} tabPosition="left" />
  </div>
)

export default App
