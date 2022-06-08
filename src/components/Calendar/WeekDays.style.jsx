import styled from 'styled-components';
import { FONT, COLOR } from '@/constants';

const WeekdayTd = styled.td`
  width: 48px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  color: ${COLOR.GREY[300]};
  font-size: ${FONT.SIZE.X_SMALL};
`;

export { WeekdayTd };
