import React, { useRef } from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeries from '../TimeSeries'
import Location from './Location'

interface DataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function MainBoard() {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px + 5 * 16px)',
      fixed: 'left',
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '50%',
      render: () => (
        <div style={{ marginLeft: 48 }}>
          <TimeSeries width={1000} />
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '60px',
      // fixed: "right",
      render: () => <Badge status="success" text="OK" style={{ width: 100 }} />,
    },
  ]

  const data: DataType[] = [
    {
      key: 0,
      name: 'Headquartes',
      value: 1,
      status: 'OK',
    },
    {
      key: 1,
      name: 'Sales Office',
      value: 1,
      status: 'OK',
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender: Location, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        style={{ width: '100%' }}
        pagination={false}
      />
    </>
  )
}