import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 16px;
  border-radius: 40px;
  svg {
    padding: 0;
  }
`;

const InputButton = styled.button`
  border-radius: 40px;
  text-align: left;
  min-width: 120px;
`;

const Label = styled.p`
  margin: 0 0 8px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${FONT.WEIGHT.MEDIUM};
`;

const PlaceHolder = styled.p`
  color: ${COLOR.GREY[300]};
`;

export { Container, InputButton, Label, PlaceHolder };
