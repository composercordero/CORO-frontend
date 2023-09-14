import { useState } from 'react';
import { Avatar, Button, Drawer, List, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import React from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

type displayHymnProps = {

}

const DisplayHymn = ({}: displayHymnProps) => {
const [open, setOpen] = useState(false);
const [size, setSize] = useState<DrawerProps['size']>();

const showDefaultDrawer = () => {
setSize('large');
setOpen(true);
};

const onClose = () => {
setOpen(false);
};

// TO EDIT: CONNECT TO BACK END (CREATE GET CURRENT HYMN), CREATE APIWRAPPER FUNC, SETSTATE
const items: DescriptionsProps['items'] = [
    { key: '1', label: 'Number', children: '725', },
    { key: '2', label: 'Tune', children: 'NYLAND', },
    { key: '4', label: 'Key', children: 'Eb Major', },
    { key: '5', label: 'Last Programmed', span: 2, children: '2019-04-24', },
    { key: '6', label: 'Status', span: 3, children: <Badge status="error" text="New" />, },
    { key: '7', label: 'Author', children: 'John Ernest Bode', },
    { key: '8', label: 'Meter', children: '7.6.7.6.D', },
    { key: '9', label: 'Language', children: 'English', },
    { key: '10', label: 'Copyright', children: 'Adapt. and Harm.© 1927 Oxford University Press' },
  ];


return (
<>
    <Space>
    <Button type="primary" onClick={showDefaultDrawer}>
        Display Hymn info
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
        <Button type="primary" onClick={onClose}>
            OK
        </Button>
        </Space>
}
>

<Descriptions title="O Jesus, I Have Promised" layout="vertical" bordered items={items} />
</Drawer>
</>
);
};

export default DisplayHymn;