import React from 'react';
import { Caption } from '@/components/Calendar/YearMonth.style';

function YearMonth({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return (
    <Caption>
      {year}년 {month + 1}월
    </Caption>
  );
}

export default YearMonth;
