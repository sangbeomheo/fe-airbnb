import React, { useEffect, useRef, useContext, useState } from 'react';
import { Description } from '@components/Modal/index.style';
import COLOR from '@constants/color';
import Portal from '@components/Modal';
import { Title, PriceGraph } from '@components/Modal/PriceModal.style';
import { ReservationInfoContext } from '@contexts/ReservationInfoProvider';
import { AccommodationData } from '@constants/type';
import { addCommasToNumber } from '@utils/util';

const STICK_LENGTH = 30;
const MAX_PRICE_RANGE = 130000;
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 100;

function PriceModal() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0, averge: 0 });
  const { reservationInfo } = useContext(ReservationInfoContext);

  const fetchDataForPeriod = async () => {
    const response = await fetch(
      `/reservation?checkin=${reservationInfo.checkin}&checkout=${reservationInfo.checkout}`
    );
    const dataForPeriod = await response.json();

    return dataForPeriod;
  };

  const calcAvergePricesPerAccommodation = (data: AccommodationData) => {
    const avergePricesPerAccommodation = data.map(({ price }) => {
      const sumPrices = price.reduce((acc, cur) => acc + cur);
      const avergePrice = Math.floor(sumPrices / price.length / 100) * 100;

      return avergePrice;
    });

    return avergePricesPerAccommodation;
  };

  const calcPriceRange = (avergePricesPerAccommodation: number[]) => {
    const min = Math.min(...avergePricesPerAccommodation);
    let max = Math.max(...avergePricesPerAccommodation);
    if (max > MAX_PRICE_RANGE) max = MAX_PRICE_RANGE;
    const averge =
      avergePricesPerAccommodation.reduce((acc, cur) => acc + cur) /
      avergePricesPerAccommodation.length;
    setPriceRange({ min, max, averge });

    return [min, max];
  };

  const calcPricePerStick = (minPrice: number, maxPrice: number) => {
    const pricePerStick = Math.floor((maxPrice - minPrice) / STICK_LENGTH);
    return pricePerStick;
  };

  const getAccommodationLengthPerStick = async () => {
    const dataForPeriod = await fetchDataForPeriod();
    const avergePricesPerAccommodation = calcAvergePricesPerAccommodation(dataForPeriod);
    const [minPrice, maxPrice] = calcPriceRange(avergePricesPerAccommodation);
    const pricePerStick = calcPricePerStick(minPrice, maxPrice);
    const accommodationLengthPerStick = new Array(STICK_LENGTH).fill(0);
    avergePricesPerAccommodation.forEach(avergePrice => {
      let stickIndex = Math.floor((avergePrice - minPrice) / pricePerStick);
      if (stickIndex >= STICK_LENGTH) stickIndex = STICK_LENGTH - 1;
      accommodationLengthPerStick[stickIndex] += 1;
    });

    return accommodationLengthPerStick;
  };

  const getHeightOfSticks = async () => {
    const accommodationLengthPerStick = await getAccommodationLengthPerStick();
    const maxLength = Math.max(...accommodationLengthPerStick);
    const heightOfSticks = accommodationLengthPerStick.map(length =>
      Math.round((length / maxLength) * CANVAS_HEIGHT)
    );

    return heightOfSticks;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawStickChartAboutPrice = async () => {
    const canvas = canvasRef.current;
    if (!canvas?.getContext) throw new Error('canvas를 지원하지 않습니다.');

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.strokeStyle = COLOR.BLACK;

    const initialValue = { x: 0, width: CANVAS_WIDTH / STICK_LENGTH - 1 };
    const heightOfSticks = await getHeightOfSticks();
    heightOfSticks.reduce(({ x, width }, height) => {
      context.fillRect(x, 100 - height, width, height);
      return { x: x + width + 1, width };
    }, initialValue);
  };

  useEffect(() => {
    const setChart = async () => {
      await drawStickChartAboutPrice();
    };
    setChart();
  }, []);

  return (
    <Portal>
      <Title>가격 범위</Title>
      <div>
        ₩ <span> {addCommasToNumber(priceRange.min)} </span> - ₩
        <span> {addCommasToNumber(priceRange.max)} </span>
        {priceRange.max > MAX_PRICE_RANGE ? '+' : ''}
      </div>
      <Description>
        평균 1박 요금은 <span>₩ {addCommasToNumber(priceRange.averge)}</span> 입니다.
      </Description>
      <PriceGraph ref={canvasRef} />
    </Portal>
  );
}

export default PriceModal;
