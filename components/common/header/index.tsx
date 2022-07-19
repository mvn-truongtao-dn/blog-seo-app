import * as React from 'react';
import HeaderDesktop from './header-desktop';
import HeaderMobile from './header-mobile';
export interface HeaderProps {
}

export default function HeaderCustom(props: HeaderProps) {
  return (
    <>
      <HeaderDesktop></HeaderDesktop>
      <HeaderMobile></HeaderMobile>
    </>
  );
}
