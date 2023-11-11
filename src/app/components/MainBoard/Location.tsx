import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeriesSimulation from '../TimeSeriesSimulation'
import Room from './Room'
import Link from 'next/link'

interface LocationDataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function Location() {
  const columns: TableColumnsType<LocationDataType> = [
    {
      title: 'Location',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px + 3 * 16px)',
      fixed: 'left',
      render: (value: string, rowData: LocationDataType) => (
        <Link href={`/?locationId=${value}`}>
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
        <div style={{ marginLeft: 32 }}>
          <TimeSeriesSimulation width={1000} />
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

  const data: LocationDataType[] = [
    {
      key: 0,
      name: '1st Floor',
      value: 0,
      status: 'OK',
    },
    {
      key: 1,
      name: '2nd Floor',
      value: 0,
      status: 'OK',
    },
    {
      key: 1,
      name: '3rd Floor',
      value: 0,
      status: 'OK',
    },
  ]

  return <Table
    columns={columns}
    showHeader={false}
    expandable={{ expandedRowRender: Room, defaultExpandedRowKeys: ['1'] }}
    dataSource={data}
    // style={{ width: '100%' }}
    pagination={false}
  />
}