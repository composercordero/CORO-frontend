import { Col, Row, Typography } from 'antd';
import workingFromHome from '../assets/girl-working-from-home.svg'
import successImage from '../assets/success.svg'

type aboutProps = {
}

const About = ({}: aboutProps) => {
  return (<>
        <Row style={{ background:'#d980a2', borderRadius:25, padding: 25, marginBottom:50}}>
      <Col span={12}>
        <img src={workingFromHome} alt="" />
      </Col>
      
      <Col span={12} style={{ background:'#d980a2', borderRadius:25, padding: 25, textAlign:'right'}} >
        <Typography.Title style={{fontSize:'calc(3rem + 1vw)', margin:0, color:'#fff0f4'}}>We Want to Help</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', lineHeight: 1.8, textAlign:'right'}}>
          <p>I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>

          <p>I want people to see that the cosmic perspective is simultaneously honest about the universe we live in and uplifting, when we realize how far we have come and how wonderful is this world of ours.</p>

          </Typography.Paragraph>

      </Col>
        

    </Row>

    <Row style={{ background:'#d980a2', borderRadius:25, padding: 25}}>
      <Col span={14} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        <Typography.Title style={{fontSize:'calc(3rem + 1vw)', margin:0, color:'#fff0f4'}}>We Know You Care</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', textAlign: 'justify', lineHeight: 1.8}}>
          <p>I can't tell you how many people say they were turned off from science because of a science teacher that completely sucked out all the inspiration and enthusiasm they had for the course.</p>

          <p>I want people to see that the cosmic perspective is simultaneously honest about the universe we live in and uplifting, when we realize how far we have come and how wonderful is this world of ours.</p>

          </Typography.Paragraph>

      </Col>
        
      <Col span={10}>
        <img src={successImage} alt="" style={{width:'70vh'}}/>  
        
      </Col>
    </Row>


    </>)
}

export default About