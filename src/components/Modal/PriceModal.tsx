import React, { useEffect, useRef, useContext, useState } from 'react';
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

    const devicePixelRatio = window.devicePixelRatio ?? 1;
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
    canvas.width = CANVAS_WIDTH * devicePixelRatio;
    canvas.height = CANVAS_HEIGHT * devicePixelRatio;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.scale(devicePixelRatio, devicePixelRatio);
    context.fillStyle = COLOR.BLACK;

    const initialValue = { x: 0, width: CANVAS_WIDTH / STICK_LENGTH - GAP_BETWEEN_STICK };
    const heightOfSticks = calcHeightOfSticks();
    heightOfSticks.reduce(({ x, width }, height) => {
      context.fillRect(x, CANVAS_HEIGHT - height, width, height);
      return { x: x + width + GAP_BETWEEN_STICK, width };
    }, initialValue);
  };

  useEffect(() => {
    drawStickChartAboutPrice();
  }, []);

  const calcAveragePrice = () => {
    const avergePrice = Math.round(
      reservationInfo.price.averages.reduce((acc, cur) => acc + cur, 0) /
        reservationInfo.price.averages.length
    );

    return addCommasToNumber(avergePrice) || 0;
  };

  const changePirceRange = (target: EventTarget, rangeName: string) => {
    const newReservationPrice: Record<string, number | number[] | { min: number; max: number }> = {
      ...reservationInfo.price
    };
    newReservationPrice[rangeName] = Number(target.value);
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
            max={reservationInfo.price.range.max / 2}
            step="100"
            value={reservationInfo.price.min}
            width={50}
            onChange={({ target }) => changePirceRange(target, 'min')}
          />
          <RangeButtonRight
            type="range"
            min={reservationInfo.price.range.max / 2}
            max={reservationInfo.price.range.max}
            step="100"
            value={reservationInfo.price.max}
            width={50}
            onChange={({ target }) => changePirceRange(target, 'max')}
          />
        </RangeButtonWrap>
      </PriceGraphWrap>
    </Portal>
  );
}

export default PriceModal;
