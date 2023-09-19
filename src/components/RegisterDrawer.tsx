import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import ConductorType from '../types/ConductorType';
import CategoryType from '../types/CategoryType';
import {createUser, loginUser} from '../lib/apiWrapper'

type registerProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
    logUserIn:(user:ConductorType) => void
}
const RegisterDrawer = ({logUserIn, flashMessage}: registerProps) => {

    const navigate = useNavigate();

    // FORM DATA -------------------------------------------
    const [userFormData, setUserFormData] = useState<Partial<ConductorType>>(
        {
            id:0,
            firstName :'',
            lastName :'',
            username :'',
            email :'',
            password :'',
            date_created:'',
            token:'',
            token_expiration:'',
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        let response = await createUser(userFormData)
        if (response.error){
            flashMessage(response.error, 'error')
        } else {
            const newUser = response.data
            let loginResponse = await loginUser(userFormData.username!, userFormData.password!)
            localStorage.setItem('token', loginResponse.data?.token!)
            localStorage.setItem('tokenExp', loginResponse.data?.token_exp!)
            logUserIn(newUser!);
            navigate('/dashboard')
        }
    }

    // DRAWER -------------------------------------------
    const [open, setOpen] = useState(false);
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
    layout="vertical">
        
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
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input 
                name="lastName"
                placeholder="Please enter your name" 
                onChange={handleInputChange} 
                value={userFormData.lastName}
            />
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
            <Input.Password 
                name="password"
                onChange={handleInputChange} 
                value={userFormData.password}/>
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
            <Input 
                name="email"
                onChange={handleInputChange} 
                value={userFormData.email}
            />
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







