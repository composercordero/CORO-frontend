import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button, Layout, Affix, Avatar, Space } from 'antd';

type headerProps = {
    handleCollapsed: ()=>void,
    collapsed: boolean,
}

const Header = ({handleCollapsed, collapsed}: headerProps) => {

  const { Header } = Layout;
  
  return (
    <Affix offsetTop={0}>
    <Header style={{ padding: 0, background: '#272829'}}>
        <Space direction="horizontal" style={{width: '100%', justifyContent: 'space-between', paddingRight:50}}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined style={{color:'#fff'}}/> : <MenuFoldOutlined style={{color:'#fff'}}/>}
          onClick={handleCollapsed}
          style={{
              fontSize: '16px',
              width: 64,
              height: 64,
          }}
        />
        <Avatar style={{ backgroundColor: '', verticalAlign: 'middle' }} size="large" gap={4}>
        C
      </Avatar>
      </Space>
    </Header>
    </ Affix>
  )
}

export default Header