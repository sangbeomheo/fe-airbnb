import React, { useContext, useEffect, useRef } from 'react';
import { Description } from '@components/Modal/index.style';
import { COLOR } from '@/constants';
import Portal from '@components/Modal';
import {
  Title,
  PriceGraphWrap,
  PriceGraph,
  RangeButtonWrap,
  RangeButtonLeft,
  RangeButtonRight
} from '@components/Modal/PriceModal.style';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { addCommasToNumber } from '@utils/util';

const STICK_LENGTH = 50;
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 200;
const GAP_BETWEEN_STICK = 1;

interface SizeOfSticks {
  x: number;
  y: number;
  width: number;
  height: number;
}

function PriceModal() {
  const { reservationInfo, setReservationInfo } = useContext(ReservationInfoContext);

  const calcPricePerStick = () => {
    const pricePerStick = Math.floor(
      (reservationInfo.price.range.max - reservationInfo.price.range.min) / STICK_LENGTH
    );

    return pricePerStick;
  };

  const calcAccommodationLengthPerStick = () => {
    const pricePerStick = calcPricePerStick();
    const accommodationLengthPerStick = new Array(STICK_LENGTH).fill(0);
    reservationInfo.price.averages.forEach(average => {
      let stickIndex = Math.floor((average - reservationInfo.price.range.min) / pricePerStick);
      if (stickIndex >= STICK_LENGTH) stickIndex = STICK_LENGTH - 1;
      accommodationLengthPerStick[stickIndex] += 1;
    });

    return accommodationLengthPerStick;
  };

  const calcSizeOfSticks = () => {
    const accommodationLengthPerStick = calcAccommodationLengthPerStick();
    const maxLength = Math.max(...accommodationLengthPerStick);
    const widthOfStick = CANVAS_WIDTH / STICK_LENGTH - GAP_BETWEEN_STICK;
    let coordinateXOfStick = 0;
    const sizeOfSticks = accommodationLengthPerStick.map(length => {
      const sizeOfStick = {
        x: coordinateXOfStick,
        y: CANVAS_HEIGHT - Math.round((length / maxLength) * CANVAS_HEIGHT),
        width: widthOfStick,
        height: Math.round((length / maxLength) * CANVAS_HEIGHT)
      };
      coordinateXOfStick += widthOfStick + GAP_BETWEEN_STICK;
      return sizeOfStick;
    });

    return sizeOfSticks;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const createChartCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas?.getContext) throw new Error('canvas를 지원하지 않습니다.');

    const devicePixelRatio = window.devicePixelRatio ?? 1;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    const context = canvas.getContext('2d');
    if (!context) return null;
    context.scale(devicePixelRatio, devicePixelRatio);

    return context;
  };

  const chartAnimationInfo: { animation: number | null; maxHeight: number; speed: number } = {
    animation: null,
    maxHeight: 0,
    speed: 0.5
  };

  const drawStickChartAboutPrice = () => {
    const context = createChartCanvas();
    if (!context) return;

    const sizeOfSticks = calcSizeOfSticks();
    const animationSizeOfSticks = sizeOfSticks.map((size, idx) => {
      return {
        x: size.x,
        y: CANVAS_HEIGHT - Math.min(sizeOfSticks[idx].height, chartAnimationInfo.maxHeight),
        width: size.width,
        height: Math.min(sizeOfSticks[idx].height, chartAnimationInfo.maxHeight)
      };
    });

    animationSizeOfSticks.forEach(({ x, y, width, height }: SizeOfSticks) => {
      context.fillStyle = COLOR.BLACK;
      context.fillRect(x, y, width, height);
    });

    if (CANVAS_HEIGHT <= chartAnimationInfo.maxHeight) return;
    chartAnimationInfo.maxHeight += chartAnimationInfo.speed;
    chartAnimationInfo.speed *= 1.05;
    chartAnimationInfo.animation = window.requestAnimationFrame(drawStickChartAboutPrice);
  };

  useEffect(drawStickChartAboutPrice, []);

  const changeChartStickColorForPriceRange = () => {
    const context = createChartCanvas();
    if (!context) return;

    const pricePerStick = calcPricePerStick();
    const sizeOfSticks = calcSizeOfSticks();
    sizeOfSticks.forEach(({ x, y, width, height }: SizeOfSticks, idx: number) => {
      if (
        pricePerStick * idx + reservationInfo.price.range.min < reservationInfo.price.min ||
        pricePerStick * idx + reservationInfo.price.range.min > reservationInfo.price.max
      )
        context.fillStyle = `${COLOR.GREY[400]}`;
      else context.fillStyle = COLOR.BLACK;
      context.fillRect(x, y, width, height);
    });
  };

  useEffect(changeChartStickColorForPriceRange, [reservationInfo.price]);

  const calcAveragePrice = () => {
    const avergePrice = Math.round(
      reservationInfo.price.averages.reduce((acc, cur) => acc + cur, 0) /
        reservationInfo.price.averages.length
    );

    return addCommasToNumber(avergePrice) || 0;
  };

  const changePirceRange = (value: string, rangeName: string) => {
    const newReservationPrice: Record<string, number | number[] | { min: number; max: number }> = {
      ...reservationInfo.price
    };
    newReservationPrice[rangeName] = Number(value);
    setReservationInfo({ ...reservationInfo, price: newReservationPrice });
  };

  return (
    <Portal>
      <Title>가격 범위</Title>
      <div>
        ₩&nbsp;<span>{addCommasToNumber(reservationInfo.price.min)} </span>&nbsp; - &nbsp;₩&nbsp;
        <span>
          {addCommasToNumber(reservationInfo.price.max) +
            (reservationInfo.price.max === reservationInfo.price.range.max ? '+' : '')}{' '}
        </span>
      </div>
      <Description>
        평균 1박 요금은 <span>₩ {calcAveragePrice()}</span> 입니다.
      </Description>
      <PriceGraphWrap>
        <PriceGraph ref={canvasRef} />
        <RangeButtonWrap>
          <RangeButtonLeft
            type="range"
            min={reservationInfo.price.range.min}
            max={reservationInfo.price.range.max}
            step="100"
            value={reservationInfo.price.min}
            onChange={({ target }) => changePirceRange(target.value, 'min')}
          />
          <RangeButtonRight
            type="range"
            min={reservationInfo.price.range.min}
            max={reservationInfo.price.range.max}
            step="100"
            value={reservationInfo.price.max}
            onChange={({ target }) => changePirceRange(target.value, 'max')}
          />
        </RangeButtonWrap>
      </PriceGraphWrap>
    </Portal>
  );
}

export default PriceModal;
