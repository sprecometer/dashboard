import React from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import ProgressCircle from './ProgressCircle'

const EditLocationDrawer = ({ onClose, open, name }: any) => {

  return (
    <>
      <Drawer
        title='Edit Location'
        width={600}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter a device name' }]}
                initialValue={name}
              >
                <Input placeholder="Please enter a device name" value={name} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter the address' }]}
              >
                <Input placeholder="Please enter the address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="manager"
                label="Manager"
                rules={[{ required: true, message: 'Please enter a manager name' }]}
              >
                <Input placeholder="Please enter a device name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ProgressCircle />
      </Drawer>
    </>
  )
}

export default EditLocationDrawer