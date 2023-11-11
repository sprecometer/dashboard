import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeries from '../TimeSeries'

interface EqiupmentDataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function Device() {
  const columns: TableColumnsType<EqiupmentDataType> = [
    {
      title: 'Device',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px)',
      fixed: 'left',
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '50%',
      render: () => (
        <div style={{ marginLeft: 0 }}>
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

  const data: EqiupmentDataType[] = [
    {
      key: 0,
      name: 'Device 1',
      value: 0,
      status: 'OK',
    },
    {
      key: 1,
      name: 'Device 2',
      value: 0,
      status: 'OK',
    },
  ]

  return <Table columns={columns} showHeader={false} dataSource={data} pagination={false} />
}