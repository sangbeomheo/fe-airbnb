import React, { useState, useContext } from 'react';
import Portal from '@components/Modal';
import Calendar from '@components/Calendar';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { TODAY, THIS_YEAR, THIS_MONTH } from '@/constants/date';
import { Container, ButtonWrap } from '@/components/Modal/PeriodModal.style';
import IconButton from '../common/IconButton';

function PeriodModal() {
  const { reservationInfo } = useContext(ReservationInfoContext);

  const firstDate = 1;

  const initialPivotMonthDate = reservationInfo.checkin
    ? new Date(new Date(reservationInfo.checkin).setDate(firstDate))
    : new Date(THIS_YEAR, THIS_MONTH, firstDate);

  const [pivotMonthDate, setPivotMonthDate] = useState(initialPivotMonthDate);

  const [pivotYear, pivotMonth] = [pivotMonthDate.getFullYear(), pivotMonthDate.getMonth()];

  const nextMonthDate = new Date(pivotYear, pivotMonth + 1);

  const getMonthCounter = direction => {
    switch (direction) {
      case 'prev':
        return -1;

      case 'next':
        return 1;

      default:
        return 0;
    }
  };

  const flipCalendar = direction => {
    if (direction === 'prev' && TODAY >= pivotMonthDate) return;

    setPivotMonthDate(new Date(pivotYear, pivotMonth + getMonthCounter(direction)));
  };

  return (
    <Portal>
      <Container>
        <ButtonWrap>
          <IconButton icon="chevronLeft" handleClick={() => flipCalendar('prev')} />
          <IconButton icon="chevronRight" handleClick={() => flipCalendar('next')} />
        </ButtonWrap>
        <Calendar date={pivotMonthDate} />
        <Calendar date={nextMonthDate} />
      </Container>
    </Portal>
  );
}

export default PeriodModal;
