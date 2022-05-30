import styled from 'styled-components';
import { COLOR } from '@/constants';

const Container = styled.div`
  margin: 40px auto 0;
  padding: 16px 40px;
  display: flex;
  gap: 24px;
  align-items: center;
  background: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GREY[400]};
  border-radius: 40px;
  max-width: 960px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background: ${COLOR.GREY[400]};
`;

const SearchBtnWrap = styled.div`
  padding: 8px;
  border-radius: 40px;
  height: 40px;
  background-color: ${COLOR.PRIMARY};
  svg {
    padding: 0;
  }
`;
export { Container, VerticalLine, SearchBtnWrap };
