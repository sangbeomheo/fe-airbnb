import React, { useEffect, useRef, useContext, useState } from 'react';
import { Description } from '@components/Modal/index.style';
import { COLOR, MAX_PRICE_RANGE } from '@/constants';
import Portal from '@components/Modal';
import { Title, PriceGraph } from '@components/Modal/PriceModal.style';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { addCommasToNumber } from '@utils/util';

const STICK_LENGTH = 30;
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 100;

function PriceModal() {
  const [priceRange] = useState({ min: 0, max: 0, average: 0 });
  const { reservationInfo } = useContext(ReservationInfoContext);

  const calcPricePerStick = () => {
    const pricePerStick = Math.floor(
      (reservationInfo.price.max - reservationInfo.price.min) / STICK_LENGTH
    );

    return pricePerStick;
  };

  const getAccommodationLengthPerStick = () => {
    const pricePerStick = calcPricePerStick();
    const accommodationLengthPerStick = new Array(STICK_LENGTH).fill(0);
    reservationInfo.price.averages.forEach(average => {
      let stickIndex = Math.floor((average - priceRange.min) / pricePerStick);
      if (stickIndex >= STICK_LENGTH) stickIndex = STICK_LENGTH - 1;
      accommodationLengthPerStick[stickIndex] += 1;
    });

    return accommodationLengthPerStick;
  };

  const getHeightOfSticks = () => {
    const accommodationLengthPerStick = getAccommodationLengthPerStick();
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

    const initialValue = { x: 0, width: CANVAS_WIDTH / STICK_LENGTH - 1 };
    const heightOfSticks = getHeightOfSticks();
    heightOfSticks.reduce(({ x, width }, height) => {
      context.fillRect(x, 100 - height, width, height);
      return { x: x + width + 1, width };
    }, initialValue);
  };

  const calcAveragePrice = () => {
    const avergePrice =
      reservationInfo.price.averages.reduce((acc, cur) => acc + cur, 0) /
      reservationInfo.price.averages.length;

    return avergePrice;
  };

  useEffect(drawStickChartAboutPrice, []);

  return (
    <Portal>
      <Title>가격 범위</Title>
      <div>
        ₩ <span> {addCommasToNumber(priceRange.min)} </span> - ₩
        <span> {addCommasToNumber(priceRange.max)} </span>
        {priceRange.max > MAX_PRICE_RANGE ? '+' : ''}
      </div>
      <Description>
        평균 1박 요금은 <span>₩ {calcAveragePrice()}</span> 입니다.
      </Description>
      <PriceGraph ref={canvasRef} />
    </Portal>
  );
}

export default PriceModal;
