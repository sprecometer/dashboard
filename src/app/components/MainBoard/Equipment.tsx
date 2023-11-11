import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeries from '../TimeSeries'
import Device from './Device'
import LightIcon from '../icons/LightIcon'
import AirIcon from '../icons/AirIcon'
import ComputerIcon from '../icons/ComputerIcon'
import PrinterIcon from '../icons/PrinterIcon'
import ServerIcon from '../icons/ServerIcon'

interface EqiupmentDataType {
  key: React.Key
  name: string
  value: number
  status: string
}

export default function Equipment() {
  const columns: TableColumnsType<EqiupmentDataType> = [
    {
      title: 'Equipment',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px + 16px)',
      fixed: 'left',
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '50%',
      render: () => (
        <div style={{ marginLeft: 0 }}>
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

  const data: EqiupmentDataType[] = [
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

  return <Table
    columns={columns}
    showHeader={false}
    expandable={{ expandedRowRender: Device, defaultExpandedRowKeys: ['3'] }}
    dataSource={data}
    // style={{ width: '100%' }}
    pagination={false}
  />
}