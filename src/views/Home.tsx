import RegisterDrawer from '../components/RegisterDrawer'
import LoginDrawer from '../components/LoginDrawer'
// Import Globals
import { Col, Row, Space, Typography } from 'antd';
// Import Types
import { CategoryType, ConductorType } from "../types";
// Import apiWrapper Functions
import planningImage from '../assets/business-discussion.svg'

type homeProps = {
  isLoggedIn: boolean,
  loggedInUser: ConductorType|null,
  flashMessage: (message:string|null, category: CategoryType|null) => void,
  logUserIn:(user:ConductorType) => void
}

const Home = ({logUserIn, isLoggedIn, loggedInUser, flashMessage}: homeProps) => {

  return (<>
    <Row gutter={0} style={{ background:'#d980a2', borderRadius:25, padding: 25}}>
        <Col span={10} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >

          <Typography.Title level={1} style={{fontSize:'calc(3rem + 1vw)', margin:0, color:'#fff0f4'}}>Programming Like Never Before</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', textAlign: 'justify', lineHeight: 1.8}}>
          <p>I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>

          <p>I want people to see that the cosmic perspective is simultaneously honest about the universe we live in and uplifting, when we realize how far we have come and how wonderful is this world of ours.</p>

          </Typography.Paragraph>

          <Space >
          <RegisterDrawer logUserIn={logUserIn} flashMessage = {flashMessage} />

          <LoginDrawer logUserIn={logUserIn} isLoggedIn={isLoggedIn}  flashMessage = {flashMessage} />
          </Space>

        </Col>
        
      <Col span={14}>
        <img src={planningImage} alt="" />
        
      </Col>
    </Row>
    </>)
}

export default Home