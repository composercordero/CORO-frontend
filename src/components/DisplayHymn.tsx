import { useState } from 'react';
import type { DrawerProps } from 'antd/es/drawer';
import { Button, Drawer, Descriptions, Space } from 'antd';
import { HymnType } from '../types';
import { createHymnById, displayHymn } from '../lib/apiWrapper';
import {CategoryType} from '../types';

type displayHymnProps = {
    programHymn:Partial<HymnType>,
    flashMessage: (message:string|null, category:CategoryType|null)=> void,
}

const DisplayHymn = ({programHymn, flashMessage}: displayHymnProps) => {
const [open, setOpen] = useState(false);
const [size, setSize] = useState<DrawerProps['size']>();
const [currentHymn, setCurrentHymn] = useState<HymnType|null>(null)
const [items, setItems] = useState([])

const HandleCurrentHymn = async ():Promise<void> => {
    const token = localStorage.getItem('token')
    const response = await createHymnById(token!, programHymn.hymnal_number!)
    const display = await displayHymn(token!, programHymn.hymnal_number!)
    if (response.error){
        flashMessage(response.error, 'error')
    } else{
        setCurrentHymn(response.data!)
        setItems(display.data!)
        // console.log(currentHymn)
        setSize('large');
        setOpen(true);
    }
};

const onClose = () => {
setOpen(false);
};

return (<>
    <Space>
    <Button type="primary" onClick={HandleCurrentHymn} >
        Display Hymn information
    </Button>
    </Space>

    <Drawer
    title={`Hymn Info`}
    placement="right"
    size={size}
    onClose={onClose}
    open={open}
    extra={
        <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={onClose}> OK </Button>
        </Space>
}
>

<Descriptions  layout="vertical" bordered items={items} />
</Drawer>
</>
);
};

export default DisplayHymn;