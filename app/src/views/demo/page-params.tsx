import { Tabs } from 'antd'
import React from 'react'
import TableView from '../accounting/accounting'
import './page-params.less'

const items = [
  {
    label: '趋势表',
    key: '1',
    children: (
      <>
        <TableView />
      </>
    ),
  },
  {
    label: '成员表',
    key: '2',
    children: (
      <>
        <TableView />
      </>
    ),
  },
  {
    label: '对账表',
    key: '3',
    children: (
      <>
        <TableView />
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
