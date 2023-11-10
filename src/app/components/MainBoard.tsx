import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeries from './TimeSeries'

interface DataType {
  key: React.Key
  name: string
  value: number
  status: string
}

interface ExpandedDataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function MainBoard() {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: 'Equipment',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        fixed: 'left',
      },
      {
        title: '',
        dataIndex: 'series',
        key: 'series',
        width: '60%',
        render: (children) => (
          <div style={{ marginLeft: 20 }}>
            {children}
            <TimeSeries />
          </div>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        width: '20%',
        fixed: "right",
        render: () => <Badge status="success" text="OK" />,
      },
    ]

    const data: ExpandedDataType[] = [
      {
        key: 0,
        name: 'Lights',
        value: 0,
        status: 'OK',
      },
      {
        key: 1,
        name: 'AC',
        value: 0,
        status: 'OK',
      },
      {
        key: 1,
        name: 'Printers',
        value: 0,
        status: 'OK',
      },
      {
        key: 1,
        name: 'PCs / Laptops',
        value: 0,
        status: 'OK',
      },
      {
        key: 1,
        name: 'Servers',
        value: 0,
        status: 'OK',
      },
    ]

    return <Table columns={columns} showHeader={false} dataSource={data} pagination={false} />
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      fixed: 'left',
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '60%',
      render: (children) => (
        <div style={{ marginLeft: 20 }}>
          {children}
          <TimeSeries />
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '20%',
      fixed: "right",
      render: () => <Badge status="success" text="OK" />,
    },
  ]

  const data: DataType[] = [
    {
      key: 0,
      name: 'Room 1',
      value: 1,
      status: 'OK',
    },
    {
      key: 0,
      name: 'Room 2',
      value: 1,
      status: 'OK',
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        style={{ width: '100%' }}
        pagination={false}
      />
    </>
  )
}