import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Col, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import * as React from 'react';
import { useState } from 'react';
import { Auth } from '../auth';
export interface HeaderMobileProps { }
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
    <Auth component='header-mobile'>
      <Header className='header-mb'>
        <div className='container header-mb-content'>
          <Row className=''>
            <Button
              type='primary'
              onClick={toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Col span={24} className={`flex justify-content-end ${collapsed ? ("menu-hidden") : ("menu-show")}`}>
              <Menu
                defaultOpenKeys={['works']}
                mode='inline'
                // inlineCollapsed={collapsed}
                onClick={toggleCollapsed}
                items={items}
              />
            </Col>
          </Row>
        </div>
      </Header>
    </Auth>
  );
}
