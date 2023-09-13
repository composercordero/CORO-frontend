import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button, Layout, Affix } from 'antd';

type headerProps = {
    handleCollapsed: ()=>void,
    collapsed: boolean,
}

const Header = ({handleCollapsed, collapsed}: headerProps) => {

  const { Header } = Layout;
  
  return (
    <Affix offsetTop={0}>
    <Header style={{ padding: 0, background: '#272829'}}>
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
    </Header>
    </ Affix>
  )
}

export default Header