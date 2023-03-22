import React from 'react'
import { Tabs } from 'antd'
import './about.less'
import RuleTable from './rule-table'
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
]

const App: React.FC = () => (
  <div className="card-container">
    <Tabs type="card" items={items} tabPosition="left" />
  </div>
)

export default App
