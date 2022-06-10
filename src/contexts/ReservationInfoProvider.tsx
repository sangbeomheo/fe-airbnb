import React, { useState, createContext, useMemo, SetStateAction, useEffect } from 'react';
import { MAX_PRICE_RANGE } from '@constants/reservation';
import { ReservationInfo } from '@constants/type';
import { fetchData, pipeAwait } from '@utils/util';

const calcAveragePrices = async dataForPeriod => {
  const averages = dataForPeriod.map(({ price }: { price: number[] }) => {
    const sumPrices = price.reduce((acc, cur) => acc + cur);
    const average = Math.floor(sumPrices / price.length / 100) * 100;

    return average;
  });

  return averages;
};

const calcPriceRange = async averages => {
  const min = Math.min(...averages);
  let max = Math.max(...averages);
  if (max > MAX_PRICE_RANGE) max = MAX_PRICE_RANGE;

  return { min, max, averages };
};

const getPriceRange = async (checkin: string | null, checkout: string | null) => {
  const urlForPeriodData = `/reservation?checkin=${checkin}&checkout=${checkout}`;
  const priceRange = await pipeAwait(
    fetchData,
    calcAveragePrices,
    calcPriceRange
  )(urlForPeriodData);

  return priceRange;
};

interface UseReservationInfo {
  reservationInfo: ReservationInfo;
  setReservationInfo: React.Dispatch<SetStateAction<object>>;
  setReservationInfoByPeriod: (checkin: string | null, checkout: string | null) => null;
}

const initialReservationInfo = {
  period: {
    checkin: null,
    checkout: null
  },
  price: {
    min: 0,
    max: 0,
    averages: []
  },
  persons: {
    adult: 2,
    child: 0,
    infant: 0
  }
};

const ReservationInfoContext = createContext<UseReservationInfo>({
  reservationInfo: initialReservationInfo,
  setReservationInfo: () => null,
  setReservationInfoByPeriod: () => null
});

function ReservationInfoProvider({ children }: { children: React.ReactNode }) {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>(initialReservationInfo);

  const setReservationInfoByPeriod = async (checkin: string | null, checkout: string | null) => {
    const priceRange =
      checkin && checkout ? await getPriceRange(checkin, checkout) : initialReservationInfo.price;

    setReservationInfo({
      ...reservationInfo,
      period: { checkin, checkout },
      price: priceRange
    });
  };

  const useReservationInfo = useMemo(
    () => ({ reservationInfo, setReservationInfo, setReservationInfoByPeriod }),
    [reservationInfo]
  );

  return (
    <ReservationInfoContext.Provider value={useReservationInfo}>
      {children}
    </ReservationInfoContext.Provider>
  );
}

export { ReservationInfoContext, ReservationInfoProvider };
