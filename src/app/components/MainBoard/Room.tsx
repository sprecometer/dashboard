import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeries from '../TimeSeries'
import Equipment from './Equipment'
import Link from 'next/link'

interface RoomDataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function Room() {
  const columns: TableColumnsType<RoomDataType> = [
    {
      title: 'Room',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px + 2 * 16px)',
      fixed: 'left',
      render: (value: string, rowData: RoomDataType) => (
        <Link href={`/?roomId=${value}`}>
          {value}
        </Link>
      ),
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '50%',
      render: () => (
        <div style={{ marginLeft: 16 }}>
          <TimeSeries width={800} />
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '60px',
      // fixed: "right",
      render: () => <Badge status="success" text="OK" />,
    },
  ]

  const data: RoomDataType[] = [
    {
      key: 0,
      name: 'Room 1',
      value: 0,
      status: 'OK',
    },
    {
      key: 1,
      name: 'Room 2',
      value: 0,
      status: 'OK',
    },
    {
      key: 1,
      name: 'Room 3',
      value: 0,
      status: 'OK',
    },
  ]

  return <Table
    columns={columns}
    showHeader={false}
    expandable={{ expandedRowRender: Equipment, defaultExpandedRowKeys: ['2'] }}
    dataSource={data}
    // style={{ width: '100%' }}
    pagination={false}
  />
}