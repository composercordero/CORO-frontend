import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

type headerProps = {
    handleCollapsed: ()=>void,
    collapsed: boolean,
}

const Header = ({handleCollapsed, collapsed}: headerProps) => {

  const { Header } = Layout;
  
  return (
    <Header style={{ padding: 0, background: '#272829'}}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleCollapsed}
        style={{
            fontSize: '16px',
            width: 64,
            height: 64,
        }}
      />
    </Header>
  )
}

export default Header