import React from 'react';
import { WeekdayTd } from '@/components/Calendar/WeekDays.style';

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

export default WeekDays;
