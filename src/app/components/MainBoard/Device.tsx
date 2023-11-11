import React from 'react'
import type { TableColumnsType } from 'antd'
import { Badge, Table } from 'antd'
import TimeSeriesSimulation from '../TimeSeriesSimulation'
import Link from 'next/link'
import TimeSeriesGraphite from '../TimeSeriesGraphite'

interface DeviceDataType {
  key: React.Key
  name: string
  value: number
  status: string
  inputMetric: string
}

export default function Device() {
  const columns: TableColumnsType<DeviceDataType> = [
    {
      title: 'Device',
      dataIndex: 'name',
      key: 'name',
      width: 'calc(350px)',
      fixed: 'left',
      render: (value: string, rowData: DeviceDataType) => (
        <Link href={`/?deviceId=${value}`}>
          {value}
        </Link>
      ),
    },
    {
      title: '',
      dataIndex: 'series',
      key: 'series',
      width: '50%',
      render: (value: string, rowData: DeviceDataType) => {
        console.log(rowData.inputMetric)
        return <div style={{ marginLeft: 0 }}>
          <TimeSeriesGraphite width={1000} inputMetric={rowData.inputMetric} />
        </div>
      },
    },
    {
      title: 'Status',
      key: 'status',
      width: '60px',
      // fixed: "right",
      render: () => <Badge status="error" text="MISSING" style={{ width: 100 }} />,
    },
  ]

  const data: DeviceDataType[] = [
    {
      key: 0,
      name: 'Device 1',
      value: 0,
      status: 'OK',
      inputMetric: 'sprecometer.demo.building.0.entrance.reception', // Power Shelly
    },
    {
      key: 1,
      name: 'Device 2',
      value: 0,
      status: 'OK',
      inputMetric: 'sprecometer.demo.building.0.entrance.chandelier', // Windows CPU daemon
    },
  ]

  return <Table columns={columns} showHeader={false} dataSource={data} pagination={false} />
}