import React, { useState } from 'react';
import COLOR from '@constants/color';
import Portal from '@components/Modal';
import styled from 'styled-components';

import Calendar from '@components/Calendar';

function PeriodModal() {
  const today = new Date();

  const [pivotDate, setPivotDate] = useState(today);

  const goPrev = () => {
    const todayYear = pivotDate.getFullYear();
    const todayMonth = pivotDate.getMonth();
    setPivotDate(new Date(todayYear, todayMonth - 1));
  };

  const goNext = () => {
    const todayYear = pivotDate.getFullYear();
    const todayMonth = pivotDate.getMonth();
    setPivotDate(new Date(todayYear, todayMonth + 1));
  };

  return (
    <Portal>
      <button type="button" onClick={goPrev}>
        {'<'}
      </button>
      <button type="button" onClick={goNext}>
        {'>'}
      </button>
      <Container>
        <Calendar date={pivotDate} />
        <Calendar date={new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)} />
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
