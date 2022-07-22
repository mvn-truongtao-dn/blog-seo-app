import { useAuth } from '@/hooks/use-auth';
import { AmazonOutlined, DownOutlined } from '@ant-design/icons';
import { Anchor, Breadcrumb, Button, Col, Drawer, Dropdown, Grid, Menu, MenuProps, Row, Space, Tag } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { Auth } from '../auth';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
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
const { useBreakpoint } = Grid;

export default function HeaderDesktop(props: HeaderDesktopProps) {
  const [current, setCurrent] = useState('');
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { xs } = useBreakpoint();

  const { profile, logout } = useAuth();
  console.log(router.locale);

  React.useEffect(() => {
    console.log(router.pathname.split('/'));
    if (router.pathname.split('/')[1] === '') {
      setCurrent('');
    } else {
      setCurrent(router.pathname.split('/')[1]);
    }
  }, [])


  // const handleOnClick: MenuProps['onClick'] = (e) => {
  //   console.log('click', e);
  //   setCurrent(e.key);
  //   router.push(`/${e.key}`);
  // };

  const handleClickLogout = async () => {
    await logout();
  }

  // const actionUser = (<Menu items={[
  //   {
  //     key: '1',
  //     label: (
  //       <a target="_blank" rel="noopener noreferrer" onClick={handleClickLogout}>
  //         Logout
  //       </a>
  //     ),
  //   },
  // ]}></Menu>);
  // const changeLang = (e: React.FormEvent, lang: string) => {
  //   e.preventDefault();
  //   router.push('/', '/', { locale: lang });
  // }
  const showDrawer = () => {
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
  }
  {/* <Menu
                onClick={handleOnClick}
                className='justify-content-end'
                selectedKeys={[current]}
                mode={xs ? "inline" : "horizontal"}
                // mode="inline"
                items={items}
              >
              </Menu> */}
  return (
    <Auth component="header-desktop">
      <Header className='header-dt'>
        <div className="container">

          <nav className="menu-bar">
            <div className="logo">
              <Link href=""><AmazonOutlined /></Link>
            </div>
            <div className="menu-content">
              <div className="left-menu">
                <LeftMenu />
              </div>
              <div className='flex align-items-center'>

                <div className="right-menu flex">
                  <RightMenu />
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                  <span className="barsBtn"></span>
                </Button>
                <Drawer
                  title="Basic Drawer"
                  placement="right"
                  closable={false}
                  width={"300px"}
                  onClose={onClose}
                  visible={visible}
                >
                  <LeftMenu />
                </Drawer>
              </div>
            </div>
          </nav>
        </div>
      </Header>
    </Auth>
  );
}
