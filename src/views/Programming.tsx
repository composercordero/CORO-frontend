import { Col, Row, Typography, Table, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import SearchHymn from '../components/SearchHymn';

interface DataType {
key: React.Key;
service: string;
hymnalnum:number,
title:string,
tune:string,
key_mus:string,
topics:string,
}

type DataIndex = keyof DataType;

// useEffect(() => {
//     async function fetchData(){
//        // const response = await getAllPrograms(); or getAllServices()?
//         console.log(response);
//         if (response.data){
//             let programs = response.data
//         }
//     }
//     fetchData();
// }, [newPost.id])

const data: DataType[] = [
    { key: '1', service: '2023-10-11', hymnalnum: 726, title: 'Will You Come and Follow Me (The Summons)', tune: 'KELVINGROVE', key_mus:' F Major', topics: 'Commitment, Discipleship and Mission, Invitation, Ministry, Service'},
    ];

type programmingProps = {}

const Programming = ({}: programmingProps) => {

    // SET STATES

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
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

const columns: ColumnsType<DataType> = [
{
    title: 'Service Date',
    dataIndex: 'service',
    key: 'service',
    width: '10%',
    ...getColumnSearchProps('service'),
},
{
    title: 'Number',
    dataIndex: 'hymnalnum',
    key: 'hymnalnum',
    width: '10%',
    ...getColumnSearchProps('hymnalnum'),
    sorter: (a, b) => a.hymnalnum - b.hymnalnum
},
{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: '25%',
    ...getColumnSearchProps('title'),
},
{
    title: 'Tune Name',
    dataIndex: 'tune',
    key: 'tune',
    width: '10%',
    ...getColumnSearchProps('tune'),
},
{
    title: 'Key',
    dataIndex: 'key_mus',
    key: 'key_mus',
    width: '7%',
    ...getColumnSearchProps('key_mus'),
},
{
    title: 'Topics',
    dataIndex: 'topics',
    key: 'topics',
    ...getColumnSearchProps('topics'),
    width: '30%',
ellipsis: {
    showTitle: false,
    },
    render: (topics) => (
    <Tooltip placement="topLeft" title={topics}>
        {topics}
    </Tooltip>
    ),
},
{
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <Button type='primary' onClick={()=> console.log('delete function')}>Delete</Button>,
},
];

return (<>
<Row style={{ background:'#d980a2', borderRadius:25, padding: 25, marginBottom:50}}>
    <Col span={24} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>Search Hymns</Typography.Title>
    
    
    <SearchHymn ></SearchHymn>
    
    </Col>
</Row>

<Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>
    <Col span={24} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
    <Table columns={columns} dataSource={data} />
    </Col>
</Row>
</>)
}

export default Programming