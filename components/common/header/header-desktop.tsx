import { useAuth } from '@/hooks/use-auth';
import { DownOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, MenuProps, Row, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { Auth } from '../auth';
export interface HeaderDesktopProps { }
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
export default function HeaderDesktop(props: HeaderDesktopProps) {
  const [current, setCurrent] = useState('');
  const router = useRouter();
  const { profile, logout } = useAuth();

  React.useEffect(() => {
    console.log(router.pathname.split('/'));
    if (router.pathname.split('/')[1] === '') {
      setCurrent('');
    } else {
      setCurrent(router.pathname.split('/')[1]);
    }

  }, [])


  const handleOnClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    setCurrent(e.key);
    router.push(`/${e.key}`);
  };
  const handleClickLogout = async () => {
    await logout();
  }
  const actionUser = (<Menu items={[
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleClickLogout}>
          Logout
        </a>
      ),
    },
  ]}></Menu>)
  return (
    <Auth component="header-desktop">
      <Header className='header-dt'>
        <div className='container'>
          <Row className='justify-content-end'>
            <Col>

              <Menu
                onClick={handleOnClick}
                className='justify-content-end'
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
              >
              </Menu>


            </Col>
            <Col >
              <Dropdown overlay={actionUser}>
                <a onClick={e => e.preventDefault()}>
                  <Space>
                    {profile?.username}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </div>
      </Header>
    </Auth>
  );
}
