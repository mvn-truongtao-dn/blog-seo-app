import React from 'react';
import { Menu, Grid } from 'antd';
import Link from 'next/link';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = () => {
  const { md } = useBreakpoint()
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="works">
        <Link href="/works">Works</Link>
      </Menu.Item>
      <Menu.Item key="blog">
        <Link href="/blog">Blog</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link href="">Contact Us</Link>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;