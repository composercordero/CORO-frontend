import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space, Layout } from 'antd';
import ConductorType from '../types/ConductorType';
import CategoryType from '../types/CategoryType';
import { editUser } from '../lib/apiWrapper'

type registerProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
    loggedInUser: ConductorType|null,

}
const RegisterDrawer = ({loggedInUser, flashMessage}: registerProps) => {

    const navigate = useNavigate();

    // FORM DATA -------------------------------------------
    const [userFormData, setUserFormData] = useState<Partial<ConductorType>>(
        {
            firstName: loggedInUser?.firstName, 
            lastName: loggedInUser?.lastName,
            email: loggedInUser?.email,
            username: loggedInUser?.username,
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        let token = localStorage.getItem('token')
        let response = await editUser(token!, userFormData)
        if (response.error){
            flashMessage(response.error, 'error')
        } else {
            flashMessage('You\'ve successfully updated your information', 'success')
            setOpen(false)
        }
    }

    // DRAWER -------------------------------------------
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => { setOpen(true); };
    const onClose = () => { setOpen(false); };

return (<>
    
    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    Update Your Account
    </Button>

    <Drawer
    title="Edit conductor account"
    width={720}
    onClose={onClose}
    open={open}
    bodyStyle={{ paddingBottom: 80 }}
    extra={
        <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleFormSubmit} type="primary">
            Submit
        </Button>
        </Space>
    }
    >
   <Form 
      form={form}
      name="register"
      onFinish={handleFormSubmit}
      layout="vertical"
      initialValues={{ 
        firstName: loggedInUser?.firstName, 
        lastName: loggedInUser?.lastName,
        email: loggedInUser?.email,
        username: loggedInUser?.username, }}
      >
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input 
                name="firstName"
                placeholder="Please enter your name"
                onChange={handleInputChange} 
                value={userFormData.firstName} 
            />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter user last name' }]}
            >
            <Input 
                name="lastName"
                placeholder="Please enter your last name" 
                onChange={handleInputChange} 
                value={userFormData.lastName}
            />
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
            <Input 
                name="email"
                placeholder="Please enter your email" 
                onChange={handleInputChange} 
                value={userFormData.email}
            />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter username' }]}
            >
            <Input 
                name="username"
                placeholder="Please enter your username" 
                onChange={handleInputChange} 
                value={userFormData.username}
            />
            </Form.Item>
        </Col>
        </Row>

    </Form>
    </Drawer>
</>
);
}

export default RegisterDrawer







