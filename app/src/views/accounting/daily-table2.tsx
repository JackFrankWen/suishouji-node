import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
export default (props: {
  formValue: any
  tableData: any
  setSelectedRows: (a: any) => void
}) => {
  const { formValue, tableData, setSelectedRows } = props
  const [parentSelectedRowKeys, setParentSelectedRowKeys] = useState<any>([])
  const [childSelectedRowKeys, setChildSelectedRowKeys] = useState<any>([])
  console.log(parentSelectedRowKeys, 'parentSelectedRowKeys')
  console.log(childSelectedRowKeys, 'childSelectedRowKeys')
  const dataSource: any = [
    {
      key: '1',
      title: '餐饮酒店/服务员',
      number: '8家门店，共8人',
      time: '2020.05.25 15:35',
      childData: [
        {
          key: '1.1',
          jobTitle: '大桶大足浴-保安',
          num: '2人',
        },
        {
          key: '1.2',
          jobTitle: '大桶大足浴-保安',
          num: '5人',
        },
      ],
    },
    {
      key: '2',
      title: '餐饮酒店/收银员',
      number: '无门店，共5人',
      time: '2020.06.06 11:35',
      childData: [
        {
          key: '2.1',
          jobTitle: '大桶大足浴',
          num: '0人',
        },
        {
          key: '2.2',
          jobTitle: '大桶大足浴',
          num: '1人',
        },
      ],
    },
  ]
  const parentColumns: any = [
    {
      title: '工种',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '关联门店数',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
  ]
  const expandedRowRender = (
    record: any,
    index: any,
    indent: any,
    expanded: any
  ) => {
    const childData = record.childData
    const childColumns: any = [
      {
        title: '岗位名称',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
      },
      {
        title: '招聘人数',
        dataIndex: 'num',
        key: 'num',
      },
    ]
    return (
      <Table
        columns={childColumns}
        dataSource={childData}
        pagination={false}
        rowSelection={childRowSelection}
      />
    )
  }
  const onParentSelectChange = (
    record: any,
    selected: any,
    selectedRows: any
  ) => {
    const patentArr: any = [...parentSelectedRowKeys]
    let childArr: any = [...childSelectedRowKeys]
    //setChildArr：选择父Table下的所有子选项
    const setChildArr = dataSource
      .find((d: any) => d.key === record.key)
      .childData.map((item: any) => item.key)
    //第一步  判断selected   true：选中，false，取消选中
    if (selected) {
      //第二步，父Table选中，子Table全选中
      patentArr.push(record.key)
      childArr = Array.from(new Set([...setChildArr, ...childArr]))
    } else {
      //第二步，父Table取消选中，子Table全取消选中
      patentArr.splice(
        patentArr.findIndex((item: any) => item === record.key),
        1
      )
      childArr = childArr.filter(
        (item: any) => !setChildArr.some((e: any) => e === item)
      )
    }
    //第三步，设置父，子的SelectedRowKeys
    setParentSelectedRowKeys(patentArr)
    setChildSelectedRowKeys(childArr)
  }
  const onParentSelectAll = (
    selected: any,
    selectedRows: any,
    changeRows: any
  ) => {
    let patentArr: any = [...parentSelectedRowKeys]
    let setChildArr: any = []
    changeRows.forEach((e: any) => {
      setChildArr = [
        ...setChildArr,
        ...e.childData.map((item: any) => item.key),
      ]
    })
    //第一步判断selected   true：全选，false：取消全选
    if (selected) {
      //第二步：父Table选中，子Table全选中，设置子Table的SelectedRowKeys
      patentArr = Array.from(
        new Set([...patentArr, ...changeRows.map((item: any) => item.key)])
      )
      setChildSelectedRowKeys(setChildArr)
    } else {
      //第二步：父Table取消选中，子Table全取消选中，设置子Table的SelectedRowKeys
      patentArr = patentArr.filter(
        (item: any) => !changeRows.some((e: any) => e.key === item)
      )
      setChildSelectedRowKeys([])
    }
    //第三步：设置父Table的SelectedRowKeys
    setParentSelectedRowKeys(patentArr)
  }
  const onChildSelectChange = (
    record: any,
    selected: any,
    selectedRows: any
  ) => {
    //record:当前操作行
    //selected选中状态
    //selectedRows:选择的数组
    const childArr: any = [...childSelectedRowKeys]
    //第一步  判断selected   true：选中，false：取消选中
    if (selected) {
      childArr.push(record.key)
    } else {
      childArr.splice(
        childArr.findIndex((item: any) => item === record.key),
        1
      )
    }
    const neWselectedRows = selectedRows.filter((a: any) => a !== undefined)
    //第二步，判断selectedRows的长度是否为data中child的长度，相等，就将父table选中，不等就不选中
    for (let item of dataSource) {
      if (item.childData.find((d: any) => d.key === record.key)) {
        let parentArr: any = [...parentSelectedRowKeys]
        if (item.childData.length === neWselectedRows.length) {
          parentArr.push(item.key)
        } else {
          if (parentArr.length && parentArr.find((d: any) => d === item.key)) {
            parentArr.splice(
              parentArr.findIndex((item1: any) => item1 === item.key),
              1
            )
          }
        }
        setParentSelectedRowKeys(parentArr)
        break
      }
    }
    setChildSelectedRowKeys(childArr)
  }
  const onChildSelectAll = (
    selected: any,
    selectedRows: any,
    changeRows: any
  ) => {
    //selected:全选true  取消全选false
    //selectedRows:改变后的
    //changeRows：改变的所有数组
    //第一步：判断selected，true：将子Table全部选中，false：将子Table全部取消选中
    let childArr: any = [...childSelectedRowKeys]
    if (selected) {
      //全选
      childArr = Array.from(
        new Set([...childArr, ...changeRows.map((item: any) => item.key)])
      )
    } else {
      //取消全选
      childArr = childArr.filter(
        (item: any) => !changeRows.some((e: any) => e.key === item)
      )
    }
    //第二步：找到子Table对应的父Table的所在行，再判断selected，true：将父Table所在行选中，false：将父Table所在行取消选中
    for (let item of dataSource) {
      if (item.childData.find((d: any) => d.key === changeRows[0].key)) {
        let parentArr: any = [...parentSelectedRowKeys]
        if (selected) {
          //全选
          parentArr.push(item.key)
        } else {
          //取消全选
          parentArr.splice(
            parentArr.findIndex((item: any) => item === item.key),
            1
          )
        }
        setParentSelectedRowKeys(parentArr)
        break
      }
    }
    setChildSelectedRowKeys(childArr)
  }
  const childRowSelection = {
    selectedRowKeys: childSelectedRowKeys,
    onSelect: onChildSelectChange,
    onSelectAll: onChildSelectAll,
  }
  const parentRowSelection = {
    selectedRowKeys: parentSelectedRowKeys,
    onSelect: onParentSelectChange,
    onSelectAll: onParentSelectAll,
  }

  return (
    <div className="edit-area">
      <Table
        rowKey="date"
        size="small"
        columns={parentColumns}
        dataSource={tableData}
        expandable={{
          expandedRowKeys: tableData.map((val: any) => val.date),
          expandIcon: () => <></>,
          expandedRowRender,
        }}
        rowSelection={parentRowSelection}
      />
    </div>
  )
}
