import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { getStringDate } from '@/utils/util';
import { TODAY } from '@/constants/date';
import WeekDays from './WeekDays';
import YearMonth from './YearMonth';
import DateUnit from './DateUnit';

function Calendar({ date }) {
  const { reservationInfo } = useContext(ReservationInfoContext);
  const { checkin, checkout } = reservationInfo;

  const rows = getCalendarRows(date);

  const getDateUnitState = date => {
    const stringFullDate = (date, getStringDate(date, '-'));
    if (date < TODAY) return 'disabled';
    if (stringFullDate === checkin) return 'checkin';
    if (stringFullDate === checkout) return 'checkout';
    if (stringFullDate > checkin && stringFullDate < checkout) return 'included';
    return 'basic';
  };

  const handleDateUnitClick = (date, state) => {
    console.log(reservationInfo);
    console.log(date, state);
  };

  return (
    <TableContainer>
      <YearMonth date={date} />
      <WeekDays />

      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((date, index) => {
              if (date === 0) return <BlankUnit key={index} />;

              const unitState = getDateUnitState(date);

              return (
                <DateUnit
                  date={date.getDate()}
                  state={unitState}
                  handleClick={() => handleDateUnitClick(date, unitState)}
                  key={index}
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
}

const getCalendarRows = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startBlankCount = date.getDay();
  const endBlankCount = 7 - ((startBlankCount + lastDate) % 7);
  const rowCount = (lastDate + startBlankCount + endBlankCount) / 7;

  const allDates = [
    ...Array(startBlankCount).fill(0),
    ...Array(lastDate)
      .fill()
      .map((_, i) => new Date(year, month, i + 1)),
    ...Array(endBlankCount).fill(0)
  ];

  const rows = Array(rowCount)
    .fill()
    .map((_, i) => [...allDates].splice(i * 7, 7));

  return rows;
};

const TableContainer = styled.table`
  border-collapse: separate;
  border-spacing: 0 4px;
`;

const BlankUnit = styled.td`
  width: 48px;
  height: 48px;
`;

export default Calendar;
