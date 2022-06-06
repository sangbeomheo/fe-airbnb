import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 16px;
  padding-left: ${({ hasBorderLeft }: { hasBorderLeft: boolean }) =>
    hasBorderLeft ? '24px' : '0'};
  border-left: ${({ hasBorderLeft }: { hasBorderLeft: boolean }) =>
    hasBorderLeft ? `1px solid ${COLOR.GREY[500]}` : '0'};
  &:first-child {
    max-width: 145px;
  }
`;

const InputButton = styled.button`
  border-radius: 40px;
  text-align: left;
  min-width: 120px;
`;

const Label = styled.span`
  margin: 0 0 8px;
  font-size: ${FONT.SIZE.X_SMALL};
  font-weight: ${({ focus }: { focus: boolean }) =>
    focus ? `${FONT.WEIGHT.BOLD}` : `${FONT.WEIGHT.MEDIUM}`};
  color: ${({ focus }: { focus: boolean }) => (focus ? `${COLOR.PRIMARY}` : `${COLOR.BLACK}`)};
`;

const PlaceHolder = styled.span`
  color: ${COLOR.GREY[300]};
`;

export { Container, InputButton, Label, PlaceHolder };
