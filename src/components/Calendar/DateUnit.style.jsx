import styled from 'styled-components';
import { COLOR, FONT } from '@constants';

const Td = styled.td`
  ${({ state }) => getTdStyle(state)}
`;

const Date = styled.div`
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 46px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
  border: 1px solid transparent;
  ${({ state }) => getDateStyle(state)};
`;

const getTdStyle = state => {
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
      return ``;
  }
};

const getDateStyle = state => {
  switch (state) {
    case 'disabled':
      return `
        color:${COLOR.GREY[400]};
        pointer-events: none;
      `;

    case 'basic':
    case 'included':
      return `
        border-radius: 48px;
        cursor: pointer;
        &:hover {
          border: 1px solid ${COLOR.GREY[100]};
        }
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
      return ``;
  }
};

export { Td, Date };
