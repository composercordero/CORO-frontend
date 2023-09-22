import { Col, Row, Typography, Table, Tooltip } from 'antd';
import { SearchOutlined, DeleteOutlined  } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import SearchHymn from '../components/SearchHymn';
// import DisplayHymn from '../components/DisplayHymn';
import {CategoryType, HymnType} from '../types';
import { ConductorType } from '../types';
import { getUserPrograms, editProgramHymn } from '../lib/apiWrapper';
import HymnDataType from '../types/HymnData';
import moment from 'moment';

interface DataType {
key: React.Key;
service: string;
hymnalnum:number,
title:string,
tune:string,
key_mus:string,
topics:string,
}

type programmingProps = {
    loggedInUser: ConductorType|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

type DataIndex = keyof DataType;

const Programming = ({flashMessage, loggedInUser}: programmingProps) => {

    // SET STATES ----------------------------------------------------

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [updateTable, setUpdateTable] = useState(false)
    const [data, setData] = useState<HymnDataType[]>([])


    // USE EFFECT: UPDATE TABLE ----------------------------------------------------

    useEffect(() => {
        async function fetchData(){
           const response = await getUserPrograms(localStorage.getItem('token')!)
            console.log(response);
            if (response.data){
                setData(response.data!)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData(){
           const response = await getUserPrograms(localStorage.getItem('token')!)
            console.log(response);
            if (response.data){
                setData(response.data!)
            }
        }
        fetchData();
    }, [updateTable])

    // TABLE SEARCH ----------------------------------------------------

    const handleSearch = ( selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex, ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        };

        const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
        };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }} > Search </Button>
                <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }} > Reset </Button>
                <Button type="link" size="small" onClick={() => { confirm({ closeDropdown: false }); setSearchText((selectedKeys as string[])[0]); setSearchedColumn(dataIndex); }} > Filter </Button>
                <Button type="link" size="small" onClick={() => { close(); }} > close </Button>
            </Space>
        </div>),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
        }
    },
    render: (text) =>
        searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
        />
        ) : (
        text
        ),
    });

    // TABLE COLUMNS ----------------------------------------------------


    const columns: ColumnsType<DataType> = [
    {
        title: 'Date',
        dataIndex: 'service',
        key: 'service',
        // width: '10%',
        ...getColumnSearchProps('service'),
        sorter: (a, b) => moment(a.service).unix() - moment(b.service).unix()
    },
    {
        title: 'Number',
        dataIndex: 'hymnalnum',
        key: 'hymnalnum',
        // width: '10%',
        ...getColumnSearchProps('hymnalnum'),
        sorter: (a, b) => a.hymnalnum - b.hymnalnum
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        // width: '30%',
        ...getColumnSearchProps('title'),
    },
    {
        title: 'Tune',
        dataIndex: 'tune',
        key: 'tune',
        width: '15%',
        ...getColumnSearchProps('tune'),
    },
    {
        title: 'Key',
        dataIndex: 'key_mus',
        key: 'key_mus',
        // width: '7%',
        ...getColumnSearchProps('key_mus'),
    },
    // {
    //     title: 'Topics',
    //     dataIndex: 'topics',
    //     key: 'topics',
    //     ...getColumnSearchProps('topics'),
    //     width: '20%',
    // ellipsis: {
    //     showTitle: false,
    //     },
    //     render: (topics) => (
    //     <Tooltip placement="topLeft" title={topics}>
    //         {topics}
    //     </Tooltip>
    //     ),
    // },
    {
        key: 'action',
        title: 'Action',
        render: (currentRow) => <Button type='primary' onClick={()=> Delete(currentRow)}><DeleteOutlined /></Button>,
    },
    ];

    // DELETE FUNCTION ----------------------------------------------------


    const Delete = async ({hymnalnum, service}:{ hymnalnum: string; service: string }):Promise<void> => {
        const token = localStorage.getItem('token')
        const response = await editProgramHymn(token!, hymnalnum!, service!)
        // console.log(response)
        if (response.error){
            flashMessage(response.error, 'error')
        } else{
            flashMessage('Hymn deleted from your program!','success')
            setUpdateTable(!updateTable)
        }
        }; 

return (<>
<Row style={{ marginBottom:50 }}>
    
    <Col className="gutter-row" span={24} style={{ background:'#d980a2', borderRadius:25, padding: 50}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>Search Hymns</Typography.Title>
        <SearchHymn setUpdateTable = {setUpdateTable} updateTable = {updateTable} flashMessage={flashMessage}></SearchHymn>
    </Col>

</Row>

<Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>
    <Col span={24} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
    <Table columns={columns} dataSource={data}/>
    </Col>
</Row>
</>)
}

export default Programming