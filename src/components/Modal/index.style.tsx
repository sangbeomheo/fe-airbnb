import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

const Container = styled.div`
  position: absolute;
  top: 16px;
  right: 0;
  padding: 64px;
  background: ${COLOR.WHITE};
  border-radius: 40px;
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);
`;

const Label = styled.label`
  display: block;
  font-weight: ${FONT.WEIGHT.MEDIUM};
`;

const Description = styled.span`
  display: block;
  margin-top: 4px;
  font-size: ${FONT.SIZE.SMALL};
  color: ${COLOR.GREY[300]};
`;

export { Container, Label, Description };
