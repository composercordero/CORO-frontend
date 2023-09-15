import CategoryType from "../types/CategoryType"
import { Row, Col  } from "antd"

type dashboardProps = {
  flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Dashboard = (flashMessage: dashboardProps) => {
  return (<>
    
    <Row style={{  borderRadius:25, padding: 25}}>
      <Col span={11} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >
        
      </Col>
      <Col span={2}></Col>
      <Col span={11} style={{ background:'#d980a2', borderRadius:25, padding: 25}} >

      </Col>
    </Row>

  </>)
}
export default Dashboard