import React, { useState } from 'react';
import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

function DateButton({ date }) {
  const today = new Date();

  return <DateTd />; // : <DateTd key={i}>{date}</DateTd>
}

const DateTd = styled.td`
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
`;

export default DateButton;
