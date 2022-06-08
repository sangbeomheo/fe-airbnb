import React, { useState, createContext, useMemo, useEffect } from 'react';
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
  setReservationInfo: () => null
});

function ReservationInfoProvider({ children }: { children: React.ReactNode }) {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo>(initialReservationInfo);

  const useReservationInfo = useMemo(
    () => ({ reservationInfo, setReservationInfo }),
    [reservationInfo]
  );

  const setPriceRange = async () => {
    const urlForPeriodData = `/reservation?checkin=${reservationInfo.period.checkin}&checkout=${reservationInfo.period.checkout}`;

    const priceRange = await pipeAwait(
      fetchData,
      calcAveragePrices,
      calcPriceRange
    )(urlForPeriodData);

    setReservationInfo({ ...reservationInfo, price: priceRange });
  };

  useEffect(() => {
    if (reservationInfo.period.checkin && reservationInfo.period.checkout) setPriceRange();
  }, [reservationInfo.period]);

  return (
    <ReservationInfoContext.Provider value={useReservationInfo}>
      {children}
    </ReservationInfoContext.Provider>
  );
}

export { ReservationInfoContext, ReservationInfoProvider };
