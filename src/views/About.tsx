import { Col, Row, Typography } from 'antd';
import planningImage from '../assets/business-discussion.svg'

type aboutProps = {
}

const About = ({}: aboutProps) => {
  return (<>
    <Row style={{ background:'#d980a2', borderRadius:25, padding: 25, marginBottom:50}}>
      <Col span={10} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>We Know You Care</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', textAlign: 'justify', lineHeight: 1.8}}>
          <p>I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>

          <p>I want people to see that the cosmic perspective is simultaneously honest about the universe we live in and uplifting, when we realize how far we have come and how wonderful is this world of ours.</p>

          </Typography.Paragraph>

      </Col>
        
      <Col span={14}>
        <img src={planningImage} alt="" />
        
      </Col>
    </Row>

    <Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>
      <Col span={10}>
        <img src={planningImage} alt="" />  
      </Col>
      
      <Col span={14} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{margin:0, color:'#fff0f4'}}>We Want to Help</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', textAlign: 'justify', lineHeight: 1.8}}>
          <p>I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>

          <p>I want people to see that the cosmic perspective is simultaneously honest about the universe we live in and uplifting, when we realize how far we have come and how wonderful is this world of ours.</p>

          </Typography.Paragraph>

      </Col>
        

    </Row>



    </>)
}

export default About