// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Import Globals
import { Col, Form, Input, Row, Typography } from 'antd';
// Import Types
// import { CategoryType } from '../types';

type contactProps = {
  // flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Contact = ({}: contactProps) => {

  // const navigate = useNavigate()
  const [form] = Form.useForm();
  const { TextArea } = Input;
  
// const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
//     e.preventDefault();
//     let response = await 
//     if (response.error){
//         flashMessage(response.error, 'error')
//     } else {
//         const newUser = response.data
//         let loginResponse = await loginUser(userFormData.username!, userFormData.password!)
//         localStorage.setItem('token', loginResponse.data?.token!)
//         localStorage.setItem('tokenExp', loginResponse.data?.token_exp!)
//         logUserIn(newUser!);
//         navigate('/dashboard')
//     }
// }

//   this.contact_number.value = Math.random() * 100000 | 0;
//   emailjs.sendForm('contact_service', 'contact_form', this)

  return (<>

    <Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>

      <Col span={24} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>Get in Touch With Us</Typography.Title>

        <Typography.Paragraph style={{marginTop:25, marginBottom:50, color:'#fff0f4'}}>Let us know how we can best be there for you. CORO is an app that will continue to improve with your help! Since we are a small team, please allow us a few days to respond. We are excited to hear from you and hope you join this journey with us.</Typography.Paragraph>

      <Form 
        form={form}
        name="register"
        onFinish={()=> console.log('finish')}
        layout="vertical">
        
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
            >
            <Input 
                name="name"
                placeholder="Please enter your name"
                onChange={()=> console.log('change')} 
                value={1} 
            />
            </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[ { type: 'email', message: 'The input is not valid E-mail!', },
            { required: true, message: 'Please input your E-mail!', }, ]}
            >
            <Input 
                name="email"
                placeholder="Please enter your e-mail"

                onChange={()=> console.log('change')} 
                value={1} 
            />
          </Form.Item>
        </Col>
        </Row>

        <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please input your message!', }, ]}
            >
            <TextArea rows={4}
                name="textarea"
                placeholder="Please enter your message."
                onChange={()=> console.log('change')} 
                value={1} 
            />
          </Form.Item>

          </Col>
        </Row>
      </Form>
      
      </Col>
    </Row>
    </>)
}

export default Contact