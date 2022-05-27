import React from 'react';
import GNB from '@components/Header/GNB';
import { ReactComponent as User } from '@assets/images/icon_user.svg';
import { Container, Logo, Utility, UserIcon } from './TopBar.style';
import IconButton from '@components/common/IconButton';

function TopBar() {
  return (
    <Container>
      <Logo>LOGO</Logo>
      <GNB />
      <Utility>
        <IconButton icon="menu" />
        <UserIcon>
          <User />
        </UserIcon>
      </Utility>
    </Container>
  );
}

export default TopBar;
