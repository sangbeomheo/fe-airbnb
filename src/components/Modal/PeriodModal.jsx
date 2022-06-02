import React, { useState, useContext } from 'react';
import COLOR from '@constants/color';
import Portal from '@components/Modal';
import styled from 'styled-components';
import Calendar from '@components/Calendar';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { TODAY } from '@/constants/date';

function PeriodModal() {
  const { reservationInfo } = useContext(ReservationInfoContext);
  const checkinDate = new Date(reservationInfo.checkin);

  const [currMonthDate, setCurrMonthDate] = useState(checkinDate);
  const [currYear, currMonth] = [currMonthDate.getFullYear(), currMonthDate.getMonth()];
  const nextMonthDate = new Date(currYear, currMonth + 1);

  const flipCalendar = direction => {
    if (direction === 'prev' && TODAY >= currMonthDate) return;

    const monthCounter = direction === 'prev' ? -1 : 1;
    setCurrMonthDate(new Date(currYear, currMonth + monthCounter));
  };

  return (
    <Portal>
      <button type="button" onClick={() => flipCalendar('prev')}>
        {'<'}
      </button>
      <button type="button" onClick={() => flipCalendar('next')}>
        {'>'}
      </button>
      <Container>
        <Calendar date={currMonthDate} />
        <Calendar date={nextMonthDate} />
      </Container>
    </Portal>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
`;
export default PeriodModal;
