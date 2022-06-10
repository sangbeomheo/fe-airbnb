import React, { useContext } from 'react';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { SelectedModalNameContext } from '@contexts/SelectedModalNameProvider';
import { getStringDate } from '@/utils/util';
import { TODAY } from '@constants/date';
import WeekDays from '@components/Calendar/WeekDays';
import YearMonth from '@components/Calendar/YearMonth';
import DateUnit from '@components/Calendar/DateUnit';
import { TableContainer, BlankUnit } from '@components/Calendar/index.style';

function Calendar({ date }) {
  const { reservationInfo, setReservationInfoByPeriod } = useContext(ReservationInfoContext);
  const { selectedModalName, setSelectedModalName } = useContext(SelectedModalNameContext);

  const { checkin, checkout } = reservationInfo.period;

  const getDateUnitState = date => {
    const stringFullDate = getStringDate(date, '-');

    switch (true) {
      case date < TODAY:
        return 'disabled';

      case stringFullDate === checkin:
        return 'checkin';

      case stringFullDate === checkout:
        return 'checkout';

      case stringFullDate > checkin && stringFullDate < checkout:
        return 'included';

      default:
        return 'basic';
    }
  };

  const handleDateUnitClick = date => {
    const clickedDate = getStringDate(date, '-');

    let newCheckin;
    let newCheckout;
    let newModalName;

    switch (selectedModalName) {
      case 'checkin':
        if (!checkin && clickedDate < checkout) {
          [newCheckin, newCheckout, newModalName] = [clickedDate, checkout, 'checkin'];
          break;
        }
        [newCheckin, newCheckout, newModalName] = [clickedDate, null, 'checkout'];
        break;

      case 'checkout':
        if (!checkin || clickedDate === checkin) {
          [newCheckin, newCheckout, newModalName] = [null, clickedDate, 'checkin'];
          break;
        }
        if (clickedDate < checkin) {
          [newCheckin, newCheckout, newModalName] = [clickedDate, null, 'checkout'];
          break;
        }
        [newCheckin, newCheckout, newModalName] = [checkin, clickedDate, 'checkin'];
        break;

      default:
        [newCheckin, newCheckout, newModalName] = [checkin, checkout, null];
    }

    setReservationInfoByPeriod(newCheckin, newCheckout);
    setSelectedModalName(newModalName);
  };

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
        .map((_, i) => new Date(year, month, i + 1))
    ];

    const rows = Array(rowCount)
      .fill()
      .map((_, i) => [...allDates].splice(i * 7, 7));

    return rows;
  };

  return (
    <TableContainer>
      <YearMonth date={date} />
      <WeekDays />

      <tbody>
        {getCalendarRows(date).map((row, i) => (
          <tr key={i}>
            {row.map((date, index) => {
              if (date === 0) return <BlankUnit key={index} />;

              const unitState = getDateUnitState(date);

              return (
                <DateUnit
                  date={date.getDate()}
                  state={unitState}
                  handleClick={() => handleDateUnitClick(date)}
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

export default Calendar;
