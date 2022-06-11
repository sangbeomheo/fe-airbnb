import React from 'react';
import { Container, GNBItem } from '@components/Header/GNB.style';

const GNB_ITEMS = ['숙소', '요금', '인원'];

function GNB() {
  return (
    <Container>
      {GNB_ITEMS.map((item, idx) => (
        <GNBItem key={idx} to="/">
          {item}
        </GNBItem>
      ))}
    </Container>
  );
}

export default GNB;
