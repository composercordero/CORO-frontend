// Import Views
import EditDrawer from '../components/EditDrawer';
import CreateOrgDrawer from '../components/CreateOrgDrawer';
// Import Globals
import { Col, Descriptions, DescriptionsProps, Row, Space, Typography } from 'antd';
import Team from '../assets/office-employee-making-checklist.svg'
// Import Types
import { ConductorType, CategoryType } from '../types';
// Import apiWrapper Functions

type contactProps = {
  loggedInUser: ConductorType|null,
  flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Info = ({loggedInUser, flashMessage}: contactProps) => {

  const items: DescriptionsProps['items'] = [
    {
      key: '2',
      label: 'First Name',
      children: loggedInUser!.firstName,
    },
    {
      key: '3',
      label: 'Last Name',
      children: loggedInUser!.lastName,
    },
    {
      key: '1',
      label: 'Username',
      children: loggedInUser!.username,
    },
    {
      key: '4',
      label: 'E-mail',
      children: loggedInUser!.email,
    },
  ];


  return (<>

    <Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>

      <Col span={12} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>Hola, {loggedInUser?.firstName!}!</Typography.Title>

        <Typography.Paragraph style={{marginTop:25, marginBottom:25, color:'#fff0f4'}}>If you would like to update your information, you can click the button below.</Typography.Paragraph>

        <Col span={18} style={{ background:'#fff7f9', borderRadius:25, marginBottom:50}} >
        <Descriptions bordered column={1} items={items} />
        </Col>
        <Space >
        <EditDrawer loggedInUser = {loggedInUser} flashMessage = {flashMessage} />
        <CreateOrgDrawer flashMessage = {flashMessage} />
        </Space>

      </Col>
      <Col span={12}>
        <img src={Team} alt="" />
      </Col>
    </Row>
    </>)
}

export default Info