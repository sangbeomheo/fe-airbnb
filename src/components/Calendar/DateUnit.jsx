import React from 'react';
import { Td, Date } from '@/components/Calendar/DateUnit.style';

function DateUnit({ date, state, handleClick }) {
  return (
    <Td state={state}>
      <Date state={state} onClick={handleClick}>
        {date}
      </Date>
    </Td>
  );
}

export default DateUnit;
