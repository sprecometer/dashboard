import React from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'

const { Option } = Select

const EditDeviceDrawer = ({ onClose, open, name }: any) => {


  return (
    <>
      <Drawer
        title='Edit Device'
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
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter a device name' }]}
                initialValue={name}
              >
                <Input placeholder="Please enter a device name" value={name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="device"
                label="Device type"
                rules={[{ required: true, message: 'Please select a device type' }]}
              >
                <Select placeholder="Please select a device type">
                  <Option value="light">Light</Option>
                  <Option value="printer">Printer</Option>
                  <Option value="computer">Computer</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Sensor type"
                rules={[{ required: true, message: 'Please select a sensor type' }]}
              >
                <Select placeholder="Please select s sensor type">
                  <Option value="power">Power</Option>
                  <Option value="bistable">Bistable</Option>
                  <Option value="cpu">CPU</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ip"
                label="IP / Device URL"
                rules={[{ required: true, message: 'Please enter a device URL or IP' }]}
              >
                <Input placeholder="Please enter a device URL or IP" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}

export default EditDeviceDrawer