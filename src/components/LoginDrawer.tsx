// import Node Modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import ant d elements
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
// import types
import ConductorType from '../types/ConductorType';
import CategoryType from '../types/CategoryType';
// import apiWrapper functions
import {loginUser, getMe} from '../lib/apiWrapper'

type registerProps = {
    isLoggedIn: boolean,
    logUserIn:(user:ConductorType) => void
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}
const LoginDrawer = ({isLoggedIn, logUserIn, flashMessage}: registerProps) => {

    const navigate = useNavigate();

    if (isLoggedIn){
        navigate('/dashboard');
    }

    // FORM DATA -------------------------------------------
    const [user, setUser] = useState<Partial<ConductorType>>({username: '', password: ''})
    
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>):void => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        // e.preventDefault();
        console.log(e)
        const response = await loginUser(user.username!, user.password!)
        console.log(response)
        if (response.error){
            flashMessage(response.error, 'error')
        } else{
            localStorage.setItem('token', response.data?.token as string);
            localStorage.setItem('tokenExp', response.data?.token_exp as string);
            const userResponse = await getMe(response.data?.token as string)
            logUserIn(userResponse.data!);
            navigate('/dashboard');
        }
    }

    // DRAWER -------------------------------------------
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => { setOpen(true); };
    const onClose = () => { setOpen(false); };

return (<>
    
    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    Login
    </Button>

    <Drawer
    title="Login"
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
    name="login"
    onFinish={handleFormSubmit}
    layout="vertical">
        
        <Row gutter={16}>
        <Col span={24}>
            <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input 
                name="username"
                placeholder="Please enter your username"
                onChange={handleInputChange} 
                value={user.username} 
            />
            </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={24}>
            <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!', },]}
            hasFeedback
            >
            <Input.Password 
                name="password"
                onChange={handleInputChange} 
                value={user.password}/>
            </Form.Item>
        </Col>
        </Row>
    </Form>
    </Drawer>
</>
);
}

export default LoginDrawer