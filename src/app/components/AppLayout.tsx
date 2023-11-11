import React, { useState } from 'react'
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ConfigProvider, Layout, Menu, theme } from 'antd'
import Logo from './Logo'
import EditDeviceDrawer from './EditDeviceDrawer'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import EditLocationDrawer from './EditLocationDrawer'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Area Building', '1', <PieChartOutlined />),
  getItem('Floors', '2', <PieChartOutlined />),
  getItem('Rooms', '3', <PieChartOutlined />),
  getItem('Equipments', '4', <PieChartOutlined />),
  getItem('Elevators', '5', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '6'),
    getItem('Bill', '7'),
    getItem('Alex', '8'),
  ]),
]

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

export default function AppLayout({ children }: any) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const locationId = searchParams.get('locationId')
  const roomId = searchParams.get('roomId')
  const deviceId = searchParams.get('deviceId')

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#20FC8F',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: 'rgba(52, 57, 91, 0.60)' }}>
        <Sider collapsible collapsed={true} onCollapse={(value) => setCollapsed(value)} style={{ backgroundColor: '#171123 !important' }} >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ backgroundColor: '#171123' }} />
        </Sider>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center', height: '100px', backgroundColor: '#171123' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ backgroundColor: '#171123' }}>
              <Logo /><span style={{ fontFamily: 'Electrolize, sans-serif', fontSize: '40px', color: '#20FC8F', marginLeft: '20px' }}>Sprecometer</span>
              <div style={{ fontFamily: 'Electrolize, sans-serif', fontSize: '20px', color: '#20FC8F', marginLeft: '15px', paddingLeft: '15px', borderLeft: '1px solid #20FC8F' }}>Office Manager</div>
            </Menu>
          </Header>

          <div style={{ width: '100%' }}>
            <Content style={{ margin: '0 16px' }}>
              {children}
            </Content>
          </div>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
        <EditLocationDrawer open={locationId} onClose={() => router.push('/')} name={locationId} />
        <EditLocationDrawer open={roomId} onClose={() => router.push('/')} name={roomId} />
        <EditDeviceDrawer open={deviceId} onClose={() => router.push('/')} name={deviceId} />
      </Layout>
    </ConfigProvider>
  )
}

