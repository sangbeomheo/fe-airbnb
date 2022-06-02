import React, { useState } from 'react';
import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';
import WeekDays from './WeekDays';
import YearMonth from './YearMonth';

function Calendar({ date }) {
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

  return (
    <table>
      <YearMonth date={date} />
      <WeekDays />

      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((date, i) =>
              date === 0 ? <BlankTd key={i} /> : <DateTd key={i}>{date.getDate()}</DateTd>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DateTest({ date }) {
  const today = new Date();

  return <DateTd>1</DateTd>;
}

const BlankTd = styled.td`
  width: 48px;
  height: 48px;
`;

const DateTd = styled.td`
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  color: ${({ available }) => (available ? COLOR.BLACK : COLOR.GREY[400])};
`;

export default Calendar;
