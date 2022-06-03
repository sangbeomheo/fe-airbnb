import React, { useContext } from 'react';
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

  const getDateUnitState = date => {
    if (date < TODAY) return 'disabled';

    const stringFullDate = (date, getStringDate(date, '-'));
    if (stringFullDate === checkin) return 'checkin';
    if (stringFullDate === checkout) return 'checkout';
    if (stringFullDate > checkin && stringFullDate < checkout) return 'included';
    return 'basic';
  };

  const handleDateUnitClick = (date, state) => {
    console.log(reservationInfo);
    console.log(date, state);
    // TODO
    // * 체크인, 체크아웃 둘 다 있는 경우
    // 체크인 클릭 -> 체크인, 체크아웃 같은 날로 변경
    // 체크아웃 클릭 -> 그대로
    // 체크인 보다 뒷 날짜 클릭 -> 체크아웃 날짜가 클릭한 날짜로 변경
    // 체크인 보다 앞 날짜 클릭 -> 채크아웃 날짜 없어짐, 체크인 날짜가 클릭한 날짜로 변경
    // * 체크인만 있는 경우
    // 체크인 클릭 -> 체크인, 체크아웃 같은 날로 변경
  };

  const rows = getCalendarRows(date);

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
