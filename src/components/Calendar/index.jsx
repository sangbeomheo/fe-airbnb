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
  const { reservationInfo, setReservationInfo } = useContext(ReservationInfoContext);
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

    switch (selectedModalName) {
      case 'checkin':
        if (!checkin && clickedDate < checkout) {
          setReservationInfo({
            ...reservationInfo,
            period: {
              checkin: getStringDate(date, '-'),
              checkout
            }
          });
          setSelectedModalName('checkin');
          break;
        }
        setReservationInfo({
          ...reservationInfo,
          period: {
            checkin: getStringDate(date, '-'),
            checkout: null
          }
        });
        setSelectedModalName('checkout');
        break;

      case 'checkout':
        if (!checkin || clickedDate === checkin) {
          setReservationInfo({
            ...reservationInfo,
            period: {
              checkin: null,
              checkout: getStringDate(date, '-')
            }
          });
          setSelectedModalName('checkin');
          break;
        }
        if (clickedDate < checkin) {
          setReservationInfo({
            ...reservationInfo,
            period: {
              checkin: getStringDate(date, '-'),
              checkout: null
            }
          });
          setSelectedModalName('checkout');
          break;
        }
        setReservationInfo({
          ...reservationInfo,
          period: {
            checkin,
            checkout: getStringDate(date, '-')
          }
        });
        setSelectedModalName('checkin');
        break;

      default:
    }
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
        .map((_, i) => new Date(year, month, i + 1)),
      ...Array(endBlankCount).fill(0)
    ];

    const rows = Array(rowCount)
      .fill()
      .map((_, i) => [...allDates].splice(i * 7, 7));

    return rows;
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

export default Calendar;
