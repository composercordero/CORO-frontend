import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import ConductorType from '../types/ConductorType';

type registerProps = {

}
const RegisterDrawer = (props: registerProps) => {

const [open, setOpen] = useState(false);
const { Option } = Select;
const [form] = Form.useForm();

const showDrawer = () => { setOpen(true); };
const onClose = () => { setOpen(false); };

return (<>
    
    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    Create a New Account
    </Button>

    <Drawer
    title="Create a conductor account"
    width={720}
    onClose={onClose}
    open={open}
    bodyStyle={{ paddingBottom: 80 }}
    extra={
        <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} type="primary">
            Submit
        </Button>
        </Space>
    }
    >
    <Form 
    form={form}
    name="register"
    onFinish={handleSubmitForm}
    layout="vertical">
        
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input placeholder="Please enter your name" />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input placeholder="Please enter your name" />
            </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!', },]}
            hasFeedback
            >
            <Input.Password />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[ { required: true, message: 'Please confirm your password!', },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
                },
            }),
            ]}
            >
            <Input.Password />
            </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="email"
            label="E-mail"
            rules={[ { type: 'email', message: 'The input is not valid E-mail!', },
            { required: true, message: 'Please input your E-mail!', }, ]}
            >
            <Input />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="confirmEmail"
            label="Confirm E-mail"
            dependencies={['email']}
            hasFeedback
            rules={[ { required: true, message: 'Please confirm your e-mail!', },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('email') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The new e-mail that you entered do not match!'));
                },
            }),
            ]}
            >
            <Input />
            </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={24}>
            <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter username' }]}
            >
            <Input placeholder="Please enter your username" />
            </Form.Item>
        </Col>
        </Row>

    </Form>
    </Drawer>
</>
);
}

export default RegisterDrawer







