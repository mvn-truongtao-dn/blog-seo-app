import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Col, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import * as React from 'react';
import { useState } from 'react';
export interface HeaderMobileProps {}
const items: MenuProps['items'] = [
  {
    label: 'Works',
    key: 'works',
  },
  {
    label: 'Blog',
    key: 'blog',
  },
  {
    label: 'Contact',
    key: 'contact',
  },
];
export default function HeaderMobile(props: HeaderMobileProps) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Header className='d-none'>
      <div className='container'>
        <Row className='justify-content-end'>
          <Button
            type='primary'
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Col span={24} className='flex justify-content-end'>
            <Menu
              defaultOpenKeys={['works']}
              mode='inline'
              inlineCollapsed={collapsed}
              items={items}
            />
          </Col>
        </Row>
      </div>
    </Header>
  );
}
