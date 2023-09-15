import {
    HeartOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    BookOutlined,
    GithubOutlined,
    LinkedinOutlined,
    UserOutlined

} from '@ant-design/icons';
import { Affix, Layout, Menu, Space, Typography, theme } from 'antd';

type navigationProps ={
    nav: (key:string)=>void,
    collapsed: boolean,
    isLoggedIn: boolean,
}

export default function Navigation({nav, collapsed, isLoggedIn}:navigationProps) {

    const {Sider} = Layout;

    return(<>
            <Affix offsetTop={0}>
            <Sider 
                style={{ overflow: 'auto', position: 'sticky', height: '100vh', background: 'none' }}
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
            <Space style={{flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
            <Space direction="vertical" style={{width: '100%', justifyContent: 'center'}}>
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
            <Typography.Title level={1} style={{ margin: 10, color:'#fff0f4' }}>
                CORO
            </Typography.Title>
            </ Space>

                { isLoggedIn ? 
                (<>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                    { key: '/dashboard', icon: <HomeOutlined />, label: 'Dashboard', },
                    { key: '/programming', icon: <InfoCircleOutlined />, label: 'Programming', },
                    { key: '/database', icon: <BookOutlined />, label: 'My Library', },
                    { key: '/info', icon: <UserOutlined />, label: 'My Info', },
                    { key: '/contact', icon: <HeartOutlined />, label: 'Contact', },
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
                        { key: '/contact', icon: <HeartOutlined />, label: 'Contact', },
                        

                    
                    ]}
                    onClick = {({key}) => {nav(key)}}
                />
                </>)
            }
            </Space>

            <Space style={{justifyContent:'end', color:'#fff0f4'}}>
                <Typography.Paragraph style={{ margin: 10, color:'#fff0f4' }} >Created by Carlos</Typography.Paragraph>
                <GithubOutlined />
                <LinkedinOutlined />

            </Space>
            </Space>
            </Sider>
            </Affix>


    </>)
}