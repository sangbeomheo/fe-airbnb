import styled from 'styled-components';
import { Label } from '@components/Modal/index.style';
import { FONT } from '@/constants';

const Title = styled(Label)`
  margin: -12px 0 10px;
`;

const PriceGraphWrap = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: fit-content;
  margin: 46px auto 0;
`;

const PriceRangeText = styled.div`
  margin-top: 46px;
  font-size: ${FONT.SIZE.LARGE};
  text-align: center;
  letter-spacing: 0;
`;

const PriceGraph = styled.canvas`
  display: block;
  margin: 0 auto;
`;

const RangeButtonWrap = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  width: 100%;
  display: flex;
`;

const RangeButton = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  appearance: none;
  background: transparent;
  pointer-events: none;
  &::-webkit-slider-thumb {
    pointer-events: all;
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

export {
  Title,
  PriceRangeText,
  PriceGraphWrap,
  PriceGraph,
  RangeButtonWrap,
  RangeButtonLeft,
  RangeButtonRight
};
