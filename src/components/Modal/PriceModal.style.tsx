import styled from 'styled-components';
import { Label } from '@components/Modal/index.style';

const Title = styled(Label)`
  margin: -12px 0 16px;
`;

const PriceGraphWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: fit-content;
  margin: 46px auto 0;
`;

const PriceGraph = styled.canvas`
  display: block;
  margin: 0 auto;
`;

const RangeButtonWrap = styled.div`
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 100%;
  display: flex;
`;

const RangeButton = styled.input`
  width: ${({ width }: { width: number }) => `${width}%`};
  appearance: none;
  background: transparent;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: url('./assets/pause-circle.svg') no-repeat center / 100% auto;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const RangeButtonLeft = styled(RangeButton)`
  &::-webkit-slider-thumb {
    transform: translateX(-50%);
  }
`;

const RangeButtonRight = styled(RangeButton)`
  &::-webkit-slider-thumb {
    transform: translateX(50%);
  }
`;

export { Title, PriceGraphWrap, PriceGraph, RangeButtonWrap, RangeButtonLeft, RangeButtonRight };
