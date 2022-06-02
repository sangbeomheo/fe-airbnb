import React, { FunctionComponent } from 'react';
import { ReactComponent as Menu } from '@assets/images/icon_menu.svg';
import { ReactComponent as Search } from '@assets/images/icon_search.svg';
import { ReactComponent as Xcircle } from '@assets/images/icon_xCircle.svg';
import { ReactComponent as ChevronLeft } from '@assets/images/icon_chevronLeft.svg';
import { ReactComponent as ChevronRight } from '@assets/images/icon_chevronRight.svg';

import { Button } from '@components/common/IconButton.style';

interface Props {
  icon: string;
  handleClick?: FunctionComponent;
}

const icons: { [key: string]: FunctionComponent } = {
  menu: Menu,
  search: Search,
  xCircle: Xcircle,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight
};

export default function IconButton({ icon, handleClick }: Props) {
  const Icon = icons[icon];

  return (
    <Button onClick={handleClick}>
      <Icon />
    </Button>
  );
}
