import React, { useEffect, useRef, useContext } from 'react';
import { Description } from '@components/Modal/index.style';
import { COLOR, MAX_PRICE_RANGE } from '@/constants';
import Portal from '@components/Modal';
import { Title, PriceGraph } from '@components/Modal/PriceModal.style';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { addCommasToNumber } from '@utils/util';

const STICK_LENGTH = 50;
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 200;
const GAP_BETWEEN_STICK = 1;

function PriceModal() {
  const { reservationInfo } = useContext(ReservationInfoContext);

  const calcPricePerStick = () => {
    const maxPrice =
      reservationInfo.price.max > MAX_PRICE_RANGE ? MAX_PRICE_RANGE : reservationInfo.price.max;
    const pricePerStick = Math.floor((maxPrice - reservationInfo.price.min) / STICK_LENGTH);

    return pricePerStick;
  };

  const calcAccommodationLengthPerStick = () => {
    const pricePerStick = calcPricePerStick();
    const accommodationLengthPerStick = new Array(STICK_LENGTH).fill(0);
    reservationInfo.price.averages.forEach(average => {
      let stickIndex = Math.floor((average - reservationInfo.price.min) / pricePerStick);
      if (stickIndex >= STICK_LENGTH) stickIndex = STICK_LENGTH - 1;
      accommodationLengthPerStick[stickIndex] += 1;
    });

    return accommodationLengthPerStick;
  };

  const calcHeightOfSticks = () => {
    const accommodationLengthPerStick = calcAccommodationLengthPerStick();
    const maxLength = Math.max(...accommodationLengthPerStick);
    const heightOfSticks = accommodationLengthPerStick.map(length =>
      Math.round((length / maxLength) * CANVAS_HEIGHT)
    );

    return heightOfSticks;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawStickChartAboutPrice = () => {
    const canvas = canvasRef.current;
    if (!canvas?.getContext) throw new Error('canvas를 지원하지 않습니다.');

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.strokeStyle = COLOR.BLACK;

    const initialValue = { x: 0, width: CANVAS_WIDTH / STICK_LENGTH - GAP_BETWEEN_STICK };
    const heightOfSticks = calcHeightOfSticks();
    heightOfSticks.reduce(({ x, width }, height) => {
      context.fillRect(x, CANVAS_HEIGHT - height, width, height);
      return { x: x + width + GAP_BETWEEN_STICK, width };
    }, initialValue);
  };

  const calcAveragePrice = () => {
    const avergePrice = Math.round(
      reservationInfo.price.averages.reduce((acc, cur) => acc + cur, 0) /
        reservationInfo.price.averages.length
    );

    return addCommasToNumber(avergePrice) || 0;
  };

  useEffect(drawStickChartAboutPrice, []);

  const changeMaxPriceWithinRange = (maxPrice: number) => {
    if (reservationInfo.price.max > MAX_PRICE_RANGE)
      return `${addCommasToNumber(MAX_PRICE_RANGE)}+`;
    return addCommasToNumber(maxPrice);
  };

  return (
    <Portal>
      <Title>가격 범위</Title>
      <div>
        ₩&nbsp;<span>{addCommasToNumber(reservationInfo.price.min)} </span>&nbsp; - &nbsp;₩&nbsp;
        <span>{changeMaxPriceWithinRange(reservationInfo.price.max)} </span>
      </div>
      <Description>
        평균 1박 요금은 <span>₩ {calcAveragePrice()}</span> 입니다.
      </Description>
      <PriceGraph ref={canvasRef} />
    </Portal>
  );
}

export default PriceModal;
