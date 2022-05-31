import React, { useEffect, useRef } from 'react';
import { Description } from '@components/Modal/index.style';
import COLOR from '@constants/color';
import Portal from '@components/Modal';
import { accommodations } from '@mockData/accommodations';
import { Title, PriceGraph } from '@components/Modal/PriceModal.style';

const STICK_LENGTH = 30;
const MAX_PRICE_RANGE = 100000;
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 100;

const getMinMaxPrice = () => {
  const prices = accommodations.map(({ price }) => price);
  const minPrice = Math.min(...prices);
  let maxPrice = Math.max(...prices);
  if (maxPrice > MAX_PRICE_RANGE) maxPrice = MAX_PRICE_RANGE;

  return [minPrice, maxPrice];
};

const getPricePerStick = () => {
  const [minPrice, maxPrice] = getMinMaxPrice();
  const pricePerStick = parseInt(`${(maxPrice - minPrice) / STICK_LENGTH}`, 10);
  return pricePerStick;
};

const getAccommodationLengthPerStick = () => {
  const [minPrice] = getMinMaxPrice();
  const pricePerStick = getPricePerStick();
  const accommodationLengthPerStick = new Array(STICK_LENGTH).fill(0);
  accommodations.forEach(({ price }) => {
    let stickIndex = parseInt(`${(price - minPrice) / pricePerStick}`, 10);
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

function PriceModal() {
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

  useEffect(drawStickChartAboutPrice, []);

  return (
    <Portal>
      <Title>가격 범위</Title>
      <div>
        ₩<span>100,000</span> - ₩<span>1,000,000</span>+
      </div>
      <Description>
        평균 1박 요금은 <span>₩</span>입니다.
      </Description>
      <PriceGraph ref={canvasRef} />
    </Portal>
  );
}

export default PriceModal;
