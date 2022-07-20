import { Col, Layout, LayoutProps, Menu, Row } from 'antd';
import type { MenuProps } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import HeaderCustom from '../common/header/index';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWork } from 'store/workSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
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
export function MainLayout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  React.useEffect(() => {
    // setData(worksList);
    // axios.get(`https://6274e2bf345e1821b230ebee.mockapi.io/works`).then((res) => {
    //   console.log(res.data);
    //   dispatch(getAllWork(res.data));
    // });
    console.log("Mainnnnnnnnnnnnn");

  }, [router]);
  return (
    <Layout>
      <HeaderCustom></HeaderCustom>
      <Content>
        <div>{children}</div>
      </Content>
      <Footer>
        <div className='container'>
          <div className="page-footer">
            <ul className='group-social'>
              <li className="item-social"><FacebookOutlined /></li>
              <li className="item-social"><InstagramOutlined /></li>
              <li className="item-social"><TwitterOutlined /></li>
              <li className="item-social"><LinkedinOutlined /></li>
            </ul>
            <div>Copyright ©2020 All rights reserved</div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
