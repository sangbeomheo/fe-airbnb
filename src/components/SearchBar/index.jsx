import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@components/common/IconButton';
import SearchInputButton from '@components/SearchBar/SearchInputButton';
import { COLOR } from '@/constants';

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
    </Container>
  );
}

const Container = styled.div`
  margin: 40px auto 0;
  padding: 16px 40px;
  display: flex;
  gap: 24px;
  align-items: center;
  background: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GREY[400]};
  border-radius: 40px;
  max-width: 960px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background: ${COLOR.GREY[400]};
`;

const SearchBtnWrap = styled.div`
  padding: 8px;
  border-radius: 40px;
  height: 40px;
  background-color: ${COLOR.PRIMARY};
  svg {
    padding: 0;
  }
`;
export default SearchBar;
