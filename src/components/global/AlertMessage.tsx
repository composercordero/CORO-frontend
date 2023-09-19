import { Alert, Space } from 'antd';
import {CategoryType} from '../../types';

type alertProps = {
    category: CategoryType,
    message: string|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const AlertMessage = ({ message, category}: alertProps) => {
  return (<>
    <Space direction="vertical" style={{ width: '100%' }}>
        <Alert type={category} message={message} banner closable style={{borderBottomLeftRadius:25}}/>
    </Space>
    </>);
}

export default AlertMessage