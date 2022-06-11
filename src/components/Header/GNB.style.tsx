import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR } from '@/constants';

const Container = styled.nav`
  display: flex;
  justify-content: center;
`;

const GNBItem = styled(Link)`
  padding: 10px 12px;
  text-align: center;
  &:hover {
    border-bottom: 1px solid ${COLOR.BLACK};
  }
`;

export { Container, GNBItem };
