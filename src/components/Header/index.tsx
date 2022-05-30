import React from 'react';
import TopBar from '@components/Header/TopBar';
import { Contents } from '@components/Header/index.style';
import SearchBar from '@components/SearchBar';

function Header() {
  return (
    <Contents>
      <TopBar />
      <SearchBar />
    </Contents>
  );
}

export default Header;
