import React from 'react';
import { Menu, Grid, Dropdown, Space } from 'antd';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  const { profile, logout } = useAuth();
  const router = useRouter();
  const changeLang = (e: React.FormEvent, lang: string) => {
    e.preventDefault();
    router.push('/', '/', { locale: lang });
  }
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
  ]}></Menu>);
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),

          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  );
  const actionTrans = (<Menu items={[
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={(e) => changeLang(e, 'ja')}>
          🇯🇵
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={(e) => changeLang(e, 'en')}>
          🇺🇸
        </a>
      ),
    },
  ]}></Menu>);

  return (
    <>

      <Dropdown overlay={actionUser}>
        <a onClick={e => e.preventDefault()} className="btn-profile mr-10">
          <span className="info-user mr-5">
            {profile?.username}
          </span>
          <DownOutlined />
        </a>
      </Dropdown>
      <Dropdown overlay={actionTrans}>
        <a onClick={e => e.preventDefault()} >
          <span className="dropdown-translate">
            <GlobalOutlined />
          </span>
        </a>
      </Dropdown>
      {/* {
        router.locale === "en" || router.locale === "" ? (<span className='btn-translate' onClick={(e) => changeLang(e, 'ja')}>🇯🇵</span>) : (<span className='btn-translate' onClick={(e) => changeLang(e, 'en')}>🇺🇸</span>)
      } */}
    </>
  );
}

export default RightMenu;