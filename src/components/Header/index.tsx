import React from 'react';
import TopBar from '@components/Header/TopBar';
import { Container, Contents } from '@components/Header/index.style';
import SearchBar from '@components/SearchBar';

function Header() {
  return (
    <Container>
      <Contents>
        <TopBar />
        <SearchBar />
      </Contents>
    </Container>
  );
}

export default Header;
