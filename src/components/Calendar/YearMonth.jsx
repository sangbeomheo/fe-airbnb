import React from 'react';
import styled from 'styled-components';
import { FONT } from '@/constants';

function YearMonth({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return (
    <Caption>
      {year}년 {month + 1}월
    </Caption>
  );
}

const Caption = styled.caption`
  margin: 0 0 24px;
  font-weight: ${FONT.WEIGHT.MEDIUM};
`;

export default YearMonth;
