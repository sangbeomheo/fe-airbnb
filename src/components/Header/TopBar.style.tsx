import styled from 'styled-components';
import { COLOR, FONT } from '@/constants';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: ${`${FONT.WEIGHT.BOLD}`};
  font-size: ${`${FONT.SIZE.TITLE_1}`};
  font-family: inherit;
  line-height: 1.44;
`;

const Utility = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 4px 1px 6px;
  background: #fff;
  border-radius: 30px;
`;

const UserIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: ${`${COLOR.GREY[300]}`};
  border-radius: 50%;
  color: ${`${COLOR.WHITE}`};
`;

export { Container, Logo, Utility, UserIcon };
