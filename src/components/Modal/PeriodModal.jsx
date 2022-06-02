import React, { useState, useContext } from 'react';
import Portal from '@components/Modal';
import styled from 'styled-components';
import Calendar from '@components/Calendar';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { TODAY } from '@/constants/date';
import IconButton from '../common/IconButton';

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
      <Container>
        <ButtonWrap>
          <IconButton icon="chevronLeft" handleClick={() => flipCalendar('prev')} />
          <IconButton icon="chevronRight" handleClick={() => flipCalendar('next')} />
        </ButtonWrap>
        <Calendar date={currMonthDate} />
        <Calendar date={nextMonthDate} />
      </Container>
    </Portal>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
`;
const ButtonWrap = styled.div`
  position: absolute;
  width: 100%;
  max-width: 736px;
  display: flex;
  justify-content: space-between;
  button {
    height: 24px;
    svg {
      padding: 0;
    }
  }
`;

export default PeriodModal;
