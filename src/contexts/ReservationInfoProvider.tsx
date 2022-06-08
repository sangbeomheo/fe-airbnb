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

interface UseReservationInfo {
  reservationInfo: ReservationInfo;
  setReservationInfo: SetStateAction<object>;
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
  setReservationInfo: () => null
});

function ReservationInfoProvider({ children }: { children: React.ReactNode }) {
  const [reservationInfo, setReservationInfo] = useState(initialReservationInfo);

  const reservationState = useMemo(
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
    <ReservationInfoContext.Provider value={reservationState}>
      {children}
    </ReservationInfoContext.Provider>
  );
}

export { ReservationInfoContext, ReservationInfoProvider };
