import React, { FunctionComponent } from 'react';
import { ReactComponent as Menu } from '@assets/images/icon_menu.svg';
import { ReactComponent as Search } from '@assets/images/icon_search.svg';
import { ReactComponent as Xcircle } from '@assets/images/icon_xCircle.svg';
import { Button } from '@components/common/IconButton.style';

interface Props {
  children?: React.ReactNode | string | number;
  icon: string;
  disabled?: boolean;
}

const icons: { [key: string]: FunctionComponent } = {
  menu: Menu,
  search: Search,
  xCircle: Xcircle
};

export default function IconButton({ children, icon, disabled }: Props) {
  const Icon = icons[icon];

  return (
    <Button disabled={disabled}>
      <Icon />
      {children}
    </Button>
  );
}
