import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  border-radius: 40px;
  padding: 0 8px 0 24px;
  &:hover {
    background: ${COLOR.GREY[600]};
  }
  box-shadow: ${({ focus }: { focus: boolean }) =>
    focus ? `0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);` : ``};
`;

const InputButton = styled.button`
  width: calc(100% - 40px);
  border-radius: 40px;
  text-align: left;
  min-width: 120px;
  padding: 16px 0;
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
