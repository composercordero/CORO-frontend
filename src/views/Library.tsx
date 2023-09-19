import { Col, Row, Typography, Layout } from 'antd';
import workingFromHome from '../assets/girl-working-from-home.svg'

type dashboardProps = {
}

const Dashboard = ({}: dashboardProps) => {
  return (<>
        <Row style={{ background:'#d980a2', borderRadius:25, padding: 25, marginBottom:50}}>
      <Col span={12}>
        <img src={workingFromHome} alt="" />
      </Col>
      
      <Col span={12} style={{ background:'#d980a2', borderRadius:25, padding: 25, textAlign:'right'}} >
        <Typography.Title style={{fontSize:'calc(3.5rem + 1vw)', margin:0, color:'#fff0f4'}}>Ay! We are still working here</Typography.Title>

          <Typography.Paragraph style={{ color:'#fff', lineHeight: 1.8, textAlign:'right'}}>
          <p>In the meantime, enjoy the amazing illustrators of all the images you see in CORO.</p>

          <div style={{backgroundColor: '#fff0f4', color:'black', padding:50, borderRadius:25}}>
          <a href="https://iconscout.com/illustrations/girl" target="_blank">Free Girl working from home Illustration</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">IconScout Store</a><br />

          <a href="https://iconscout.com/illustrations/man" target="_blank">Free Man working on laptop while seating on sofa Illustration</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">IconScout Store</a><br />

          <a href="https://iconscout.com/illustrations/business-discussion" target="_blank">Free Business discussion Illustration</a> by <a href="https://iconscout.com/contributors/wiliwonk">M Wildan maulana</a> on <a href="https://iconscout.com">IconScout</a><br />

          <a href="https://iconscout.com/illustrations/owner" target="_blank">Free Owner playing with pet dog Illustration</a> by <a href="https://iconscout.com/contributors/delesign" target="_blank">Delesign Graphics</a><br />

          <a href="https://iconscout.com/illustrations/success" target="_blank">Free Success Illustration</a> by <a href="https://iconscout.com/contributors/pixel-true-designs">Pixel True</a> on <a href="https://iconscout.com">IconScout</a><br />

          <a href="https://iconscout.com/illustrations/office" target="_blank">Free Office employee making checklist Illustration</a> by <a href="https://iconscout.com/contributors/iconscout">IconScout Store</a> on <a href="https://iconscout.com">IconScout</a><br />

          <a href="https://iconscout.com/illustrations/businessman" target="_blank">Free Businessman attending video conference Illustration</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">IconScout Store</a><br />

          <a href="https://iconscout.com/illustrations/web-maintenance" target="_blank">Free Web maintenance Illustration</a> by <a href="https://iconscout.com/contributors/wiliwonk">M Wildan maulana</a> on <a href="https://iconscout.com">IconScout</a><br />
          </div>
          </Typography.Paragraph>

      </Col>
    </Row>
    </>)
}

export default Dashboard