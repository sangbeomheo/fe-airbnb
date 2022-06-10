import React, { useState, createContext, useMemo } from 'react';
import { MAX_PRICE_RANGE } from '@/constants';
import { fetchData, pipeAwait } from '@utils/util';

interface PriceData {
  price: number[];
}

const calcAveragePrices = async (dataForPeriod: PriceData[]) => {
  const averages = dataForPeriod.map(({ price }: PriceData) => {
    const sumPrices = price.reduce((acc, cur) => acc + cur);
    const average = Math.floor(sumPrices / price.length / 100) * 100;

    return average;
  });

  return averages;
};

const calcPriceRange = async (averages: number[]) => {
  const min = Math.min(...averages);
  const max = Math.max(...averages);
  const range = { min, max: max > MAX_PRICE_RANGE ? MAX_PRICE_RANGE : max };

  return { min, max, averages, range };
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

interface ReservationInfo {
  period: {
    checkin: string | null;
    checkout: string | null;
  };
  price: {
    min: number;
    max: number;
    averages: number[];
    range: { min: number; max: number };
  };
  persons: {
    adult: number;
    child: number;
    infant: number;
  };
}

interface UseReservationInfo {
  reservationInfo: ReservationInfo;
  setReservationInfo: React.Dispatch<React.SetStateAction<ReservationInfo>>;
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
    averages: [],
    range: { min: 0, max: 0 }
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
