/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import React from 'react';
import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

function DateUnit({ date, state, handleClick }) {
  return (
    <TdBackground state={state}>
      <Date state={state} onClick={handleClick}>
        {date}
      </Date>
    </TdBackground>
  );
}

const TdBackground = styled.td`
  ${({ state }) => {
    switch (state) {
      case 'included':
        return `
        background: ${COLOR.GREY[600]};
      `;
      case 'checkin':
        return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[600]};
        border-radius: 48px 0 0 48px;
      `;
      case 'checkout':
        return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[600]};
        border-radius: 0 48px 48px 0;
      `;
      default:
    }
  }}
`;

const Date = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 46px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  border: 1px solid transparent;
  ${({ state }) => {
    switch (state) {
      case 'basic':
        return `
        border-radius: 48px;
        cursor: pointer;
        &:hover {
          border: 1px solid ${COLOR.GREY[100]};
        }
      `;
      case 'disabled':
        return `
        color:${COLOR.GREY[400]};
        pointer-events: none;
      `;
      case 'included':
        return `
        cursor: pointer;
      `;
      case 'checkin':
      case 'checkout':
        return `
        color: ${COLOR.WHITE};
        background: ${COLOR.GREY[100]};
        border-radius: 48px;
        cursor: pointer;
        `;
      default:
    }
  }};
`;

export default DateUnit;
