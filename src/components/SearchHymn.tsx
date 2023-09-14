import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, Form, Input, Col, Row } from 'antd';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
//   console.log(dateString)
// };

type searchProps = {}

const SearchHymn = ({}: searchProps) => {

    const [form] = Form.useForm();

return(<>
        <Form 
            form={form}
            name="register"
            onFinish={()=> console.log('finish')}
            layout="vertical">
            
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter the hymn title' }]}
                >
                <Input 
                    name="title"
                    placeholder="Please enter the hymn title"
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
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>

                </Col>
            </Row>
            </Form>
        </>);
}

export default SearchHymn;