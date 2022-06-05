import styled from 'styled-components';
import { COLOR } from '@/constants';

const Container = styled.div`
  margin: 40px auto 0;
  padding: 16px 16px 16px 40px;
  display: flex;
  gap: 24px;
  align-items: center;
  background: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GREY[400]};
  border-radius: 40px;
  max-width: 960px;
`;

const SearchButtonWrap = styled.div`
  padding: 8px;
  border-radius: 40px;
  height: 40px;
  color: ${COLOR.WHITE};
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? `${COLOR.GREY[400]}` : `${COLOR.PRIMARY}`};
  button {
    padding: 0;
  }
`;

const SearchText = styled.span`
  margin: 0 8px;
  line-height: 24px;
`;
export { Container, SearchButtonWrap, SearchText };
