import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import OrganizationType from '../types/OrganizationType';
import CategoryType from '../types/CategoryType';
import {createChoir, createOrganization} from '../lib/apiWrapper'

type registerProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}
const CreateOrgDrawer = ({flashMessage}: registerProps) => {

    // FORM DATA -------------------------------------------
    const [orgFormData, setOrgFormData] = useState<Partial<OrganizationType>>(
        {
            name:'',
            phone:'',
            email:'',
            website:'',
            choirName:'',
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOrgFormData({...orgFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        let token = localStorage.getItem('token')
        let response = await createOrganization(token!, orgFormData)
        let responseChoir = await createChoir(token!, orgFormData)
        if (response.error){
            flashMessage(response.error, 'error')
        } else {
            flashMessage('Success', 'success')
        }
    }

    // DRAWER -------------------------------------------
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => { setOpen(true); };
    const onClose = () => { setOpen(false); };

return (<>
    
    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
    Create an Organization
    </Button>

    <Drawer
    title="Create an organization"
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
      >
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="name"
            label="Organization Name"
            rules={[{ required: true, message: 'Please enter the organization\'s name' }]}
            >
            <Input 
                name="name"
                placeholder="Please enter the organization's name"
                onChange={handleInputChange} 
                value={orgFormData.name} 
            />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter the organization\'s phone number' }]}
            >
            <Input 
                name="phone"
                placeholder="Please enter the organization's phone number" 
                onChange={handleInputChange} 
                value={orgFormData.phone}
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
            { required: true, message: 'Please input the organization\'s E-mail!', }, ]}
            >
            <Input 
                name="email"
                onChange={handleInputChange} 
                value={orgFormData.email}
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
        <Col span={12}>
            <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true, message: 'Please enter the organization\'s website' }]}
            >
            <Input 
                name="website"
                placeholder="Please enter the organization's website" 
                onChange={handleInputChange} 
                value={orgFormData.website}
            />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
            name="choirName"
            label="Choir"
            rules={[{ required: true, message: 'Please enter the choir\'s name' }]}
            >
            <Input 
                name="choirName"
                placeholder="Please enter the choir's website" 
                onChange={handleInputChange} 
                value={orgFormData.choirName}
            />
            </Form.Item>
        </Col>
        </Row>

    </Form>
    </Drawer>
</>
);
}

export default CreateOrgDrawer







