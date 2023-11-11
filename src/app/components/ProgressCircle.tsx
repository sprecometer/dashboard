import React from 'react'
import { Progress, Space } from 'antd'

const ProgressCircle: React.FC = () => (
  <Space align='center' style={{ marginTop: '20px', width: '100%' }}>
    <Progress type="circle" percent={100} />
  </Space>
)

export default ProgressCircle