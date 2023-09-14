import { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Button, Form, Input, Col, Row, Space, InputNumber } from 'antd';
import DisplayHymn from './DisplayHymn';
import { CategoryType, HymnType } from '../types';
import { createHymnById, programHymnToService } from '../lib/apiWrapper';


type searchProps = {
    flashMessage: (message:string|null, category:CategoryType|null)=> void
}

const SearchHymn = ({flashMessage}: searchProps) => {

    const [form] = Form.useForm();
    
    // FORM DATA -------------------------------------------
    const [programHymn, setProgramHymn] = useState<Partial<HymnType>>({
        id:0,
        hymnal_number:1,
        first_line:'',
        title:'',
        author:'',
        meter:'',
        language:'',
        pub_date:'',
        copyright:'',
        tune_name:'',
        arranger:'',
        key:'',
        source:'',
        audio_rec:'',
        service_date:'',
        })

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>):void => {
        setProgramHymn({...programHymn, [e.target.name]: e.target.value})
        console.log(e.target.name)
        console.log(e.target.value)
    }

    const dateChange = (date,dateString) => {
        programHymn.service_date = dateString
        console.log(programHymn.service_date)
        console.log(programHymn)
    }

    const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
        // e.preventDefault();
        const token = localStorage.getItem('token')
        const response = await createHymnById(token!, programHymn.hymnal_number!)
        const program_response = await programHymnToService(token!, programHymn.hymnal_number!, programHymn.service_date!)
        console.log(response)
        console.log('------------')
        console.log(program_response)
        if (response.error){
            flashMessage(response.error, 'error')
        } else{
            flashMessage('Hymn added to your program!','success')
        }
    }

return(<>
        
        <Form 
            form={form}
            name="register"
            onFinish={handleFormSubmit}
            layout="vertical">
            
        <Row gutter={16}>
            <Col span={16}>
                <Form.Item
                name="title"
                label="Title"
                >
                <Input 
                    name="title"
                    placeholder="Please enter the hymn title"
                    onChange={handleInputChange} 
                    value={programHymn.title} 
                />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name="number"
                    label="Number"
                    rules={[{ required: true, message: 'Please enter the hymn number' }]}
                    >
                <Input 
                    name="number"
                    placeholder="Hymn number"
                    onChange={handleInputChange} 
                    value={programHymn.hymnal_number} 
                />
                </Form.Item>
            </Col>

            <Col span={4}>
            <Form.Item label="DatePicker">
                    <DatePicker 
                    onChange={(date, dateString) => dateChange(date,dateString)} 
                />
                </Form.Item>
            </Col>
        </Row>

        <Space>
		    <Button type="primary" htmlType="submit">
		        Add Hymn
		    </Button>

            <DisplayHymn></DisplayHymn>
        </Space>
        
        </Form>
        </>);
}

export default SearchHymn;