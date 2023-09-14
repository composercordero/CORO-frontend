import {
    HeartOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Affix, Layout, Menu, Space, Typography, theme } from 'antd';

type navigationProps ={
    nav: (key:string)=>void,
    collapsed: boolean,
    isLoggedIn: boolean,
}

export default function Navigation({nav, collapsed, isLoggedIn}:navigationProps) {

    const {token: { colorBgContainer},} = theme.useToken();
    const {Sider} = Layout;

    return(<>
            <Affix offsetTop={0}>
            <Sider 
                style={{ overflow: 'auto', position: 'sticky', height: '100vh', background: 'none' }}
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>

            <Typography.Title level={1} style={{ margin: 10, color:'#fff0f4' }}>
                CORO
            </Typography.Title>
            </Space>

                { isLoggedIn ? 
                (<>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                    { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard', },
                    { key: '/info', icon: <InfoCircleOutlined />, label: 'Programming', },
                    { key: '/database', icon: <HeartOutlined />, label: 'My Hymns', },
                    { key: '/search', icon: <DeleteOutlined />, label: 'Search Hymns', },
                    { key: '/logout', icon: <InfoCircleOutlined />, label: 'Logout', },
                    ]}
                    onClick = {({key}) => {nav(key)}}
                />
                </>)

            :   (<>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ backgroundColor: 'none' }}
                    items={[
                        { key: '/', icon: <HomeOutlined />, label: 'Register/login', },
                        { key: '/about', icon: <HeartOutlined />, label: 'About', },
                        { key: '/contact', icon: <InfoCircleOutlined />, label: 'Contact', },
                    
                    ]}
                    onClick = {({key}) => {nav(key)}}
                />
                </>)
            }
            </Sider>
            </Affix>
    </>)
}