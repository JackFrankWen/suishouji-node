import { Card, Col, Row, Modal, Space, DatePicker, Statistic } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

import ReactECharts from 'echarts-for-react'
import './home.less'
import ReviewForm from './review-form'
import RangePickerWrap from '@/src/components/RangePickerWrap'

const ChartComponent = (props: { label: string[]; value: string[] }) => {
  const [chartOptions, setChartOptions] = useState({})
  const { label, value } = props
  useEffect(() => {
    setChartOptions({
      title: {},
      xAxis: {
        data: label,
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside',
              },
            },
          },

          data: value,
        },
      ],
    })
  }, [label, value])

  return <ReactECharts option={chartOptions} />
}
const PieComponent = (props: any) => {
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    setChartOptions({
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
      },
      label: {
        alignTo: 'edge',
        formatter: '{name|{b}}\n{time|{c} 小时}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
        rich: {
          time: {
            fontSize: 10,
            color: '#999',
          },
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }, [])

  return <ReactECharts option={chartOptions} />
}

const App: React.FC = () => {
  const [monthBar, setMonthbar] = useState<{
    label: string[]
    value: string[]
  }>({ label: [], value: [] })
  const test = async () => {
    try {
      const res = await $api.getView()
      console.log(res)
      if (res) {
        setMonthbar(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    test()
    Modal.success({
      title: '使用手册',
      content: (
        <ul>
          <li>1、了解自己的财务状况和支出水平，制定合理的生活标准。</li>
          <li>2】</li>
          <li>3.了解自己的消费结构，减少冲动消费，合理分配收入。</li>
        </ul>
      ),
    })
  }, [])
  return (
    <div className="page-home">
      <Row gutter={16} className="lvl-1">
        <Col span={16}>
          <Card bordered={false}>
            <ReviewForm />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="上月支出" value={112893} />
            <Statistic title="上月支出" value={112893} />
            <Statistic title="上月支出" value={112893} />
          </Card>
        </Col>
      </Row>
      <Row className="lvl-2">
        <Col span={24}>
          <Card title="每月开支" bordered={false} extra={<RangePickerWrap />}>
            <ChartComponent {...monthBar} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="lvl-3">
        <Col span={12}>
          <Card title="消费行为" bordered={false} extra={<RangePickerWrap />}>
            <PieComponent
              data={[
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
              ]}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="ABC类消费分析"
            bordered={false}
            extra={<a href="#">quni</a>}
          >
            <PieComponent
              data={[
                { value: 1048, name: 'A类（必须开支）' },
                { value: 735, name: 'B类（可有可恶）' },
                { value: 580, name: 'C类（可以削减）' },
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="lvl-4">
        <Col span={12}>
          <Card title="消费目的" bordered={false} extra={<a href="#">quni</a>}>
            <PieComponent
              data={[
                { value: 1048, name: '生存开销' },
                { value: 735, name: '发展开销' },
                { value: 580, name: '享受开销' },
              ]}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="ABC类消费分析"
            bordered={false}
            extra={<a href="#">quni</a>}
          >
            <PieComponent
              data={[
                { value: 1048, name: 'A类（必须开支）' },
                { value: 735, name: 'B类（可有可恶）' },
                { value: 580, name: 'C类（可以削减）' },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default App
