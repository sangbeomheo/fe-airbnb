/* eslint-disable consistent-return */
import React, { useState } from 'react';
import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

function DateUnit({ date, state, handleClick }) {
  return (
    <DateTdOuter state={state}>
      <DateTdInner state={state} onClick={handleClick}>
        {date}
      </DateTdInner>
    </DateTdOuter>
  );
}

const DateTdOuter = styled.td`
  ${({ state }) => {
    if (state === 'basic' || state === 'disabled') return;

    if (state === 'included') {
      return `
        background:${COLOR.GREY[600]};
      `;
    }
    if (state === 'checkin') {
      return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[600]};
        border-radius: 48px 0 0 48px;
      `;
    }
    if (state === 'checkout') {
      return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[600]};
        border-radius: 0 48px 48px 0;
      `;
    }
  }};
`;

const DateTdInner = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 46px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  border: 1px solid transparent;
  ${({ state }) => {
    if (state === 'included') {
      return `
        cursor: pointer;
      `;
    }
    if (state === 'basic') {
      return `
        border-radius: 48px;
        cursor: pointer;
        &:hover {
          border: 1px solid ${COLOR.GREY[100]};
        }
    `;
    }
    if (state === 'disabled') {
      return `
        color:${COLOR.GREY[400]};
        pointer-events: none;
      `;
    }
    if (state === 'checkin' || state === 'checkout') {
      return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[100]};
        border-radius: 48px;
        cursor: pointer;
      `;
    }
  }};
`;

export default DateUnit;
