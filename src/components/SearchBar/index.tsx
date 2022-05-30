import React, { useState } from 'react';
import { Container, VerticalLine, SearchBtnWrap } from '@components/SearchBar/index.style';
import IconButton from '@components/common/IconButton';
import SearchInputButton from '@/components/SearchBar/SearchInputButton';
import PriceModal from '../Modal/PriceModal';

function SearchBar() {
  const [period, setPeriod] = useState(null); // [date1, date2]
  const [price, setPrice] = useState(null); // [price1, price2]
  const [personnel, setPersonnel] = useState(null); // [adult, child, infant]

  return (
    <Container>
      <SearchInputButton name="체크인" label="체크인" placeholder="날짜 입력" hasCloseBtn={false} />
      <SearchInputButton name="체크아웃" label="체크아웃" placeholder="날짜 입력" />
      <VerticalLine />
      <SearchInputButton name="요금" label="요금" placeholder="금액대 설정" />
      <VerticalLine />
      <SearchInputButton name="인원" label="인원" placeholder="게스트 추가" />
      <SearchBtnWrap>
        <IconButton icon="search" />
      </SearchBtnWrap>
      <PriceModal />
    </Container>
  );
}

export default SearchBar;
