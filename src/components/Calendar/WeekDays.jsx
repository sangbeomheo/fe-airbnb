import React from 'react';
import styled from 'styled-components';
import { FONT, COLOR } from '@/constants';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

function WeekDays() {
  return (
    <thead>
      <tr>
        {weekdays.map((weekday, i) => (
          <WeekdayTd key={i}>{weekday}</WeekdayTd>
        ))}
      </tr>
    </thead>
  );
}

const WeekdayTd = styled.td`
  width: 48px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  color: ${COLOR.GREY[300]};
  font-size: ${FONT.SIZE.X_SMALL};
`;

export default WeekDays;
