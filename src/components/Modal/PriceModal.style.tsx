import styled from 'styled-components';
import { Label } from '@components/Modal/index.style';

const Title = styled(Label)`
  margin: -12px 0 16px;
`;

const PriceGraph = styled.canvas`
  display: block;
  margin: 46px auto 0;
`;

export { Title, PriceGraph };
