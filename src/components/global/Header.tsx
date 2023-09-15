import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GithubOutlined,
    LinkedinOutlined,
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
        <Space style={{width: '100%', justifyContent: 'space-around',}}>
          <a href='https://github.com/composercordero/CORO-frontend' target='_blank'>
          <GithubOutlined style={{ verticalAlign: 'middle', backgroundColor:'#d980a2', color:'#272829', padding:12, borderRadius:50, marginRight:10,}}/></a>
          <a href='https://www.linkedin.com/in/composercordero/' target='_blank'>
          <LinkedinOutlined style={{ verticalAlign: 'middle', backgroundColor:'#d980a2', color:'#272829', padding:12, borderRadius:50, marginRight:10,}}/></a>
          <Avatar style={{ backgroundColor: '', verticalAlign: 'middle' }} size="large">C</Avatar>
        </Space>
      </Space>
    </Header>
    </ Affix>
  )
}

export default Header