import { Card, Col, Radio, Row } from 'antd'
import React, { useEffect, useState } from 'react'

import ReviewCost from './componets/review-cost'
import ReviewPerson from './componets/review-person'
import Summarize from './componets/review-sum'
import TableSection from './componets/review-table'
import BarBudget from '@/src/components/app-echart/BarBudget'
import { getDateTostring } from '@/src/components/utils'
import { abc_type_budget, cost_type_budget } from '@/core/api/const/web'

function BudgetArea(props: { formValue: any }) {
  const { formValue } = props
  const [abcTotal, setABCtotal] = useState<any>([])
  const [costPieData, setCostPiedata] = useState<any>([])
  const [budgetData, setData] = useState<any>([])
  const getABCTotal = async (data: any) => {
    try {
      const res = await $api.getABCTotal(data)
      console.log(res, 'abc')
      if (res) {
        const budgetData = res.map((val) => ({
          ...val,
          budget: abc_type_budget[val.type],
        }))
        setABCtotal(budgetData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const data = getDateTostring(formValue)
    getCost({ ...data })
  }, [formValue])

  const getCost = async (data: any) => {
    try {
      const res = await $api.getCostTypeToal(data)
      console.log(res)
      if (res) {
        const budgetData = res.map((val) => {
          return {
            ...val,
            budget: cost_type_budget[val.type],
          }
        })
        setCostPiedata(budgetData)
        setData(budgetData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const data = getDateTostring(formValue)
    getABCTotal(data)
  }, [formValue])

  return (
    <Row gutter={16} className="home-section">
      <Col span={24}>
        <Card
          hoverable
          title="预算对比"
          bordered={false}
          extra={
            <Radio.Group
              defaultValue="cost_type"
              options={[
                // { label: 'tag', value: 'tag' },
                { label: '消费目的', value: 'cost_type' },
                { label: ' ABC分类', value: 'abc_type' },
              ]}
              onChange={(e) => {
                if (e.target.value === 'cost_type') {
                  setData(costPieData)
                } else if (e.target.value === 'abc_type') {
                  setData(abcTotal)
                }
              }}
              optionType="button"
            />
          }
        >
          <BarBudget data={budgetData} />
        </Card>
      </Col>
    </Row>
  )
}

function MonthReivew(props: { formValue: any }) {
  return (
    <>
      <Summarize formValue={props.formValue} />
      <BudgetArea formValue={props.formValue} />
      <TableSection formValue={props.formValue} />
      <ReviewPerson formValue={props.formValue} />
      <ReviewCost formValue={props.formValue} />
    </>
  )
}
export default MonthReivew
